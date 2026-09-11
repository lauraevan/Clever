import { useMemo } from "react";
import { CleverLogo } from "./CleverLogo";
import { student } from "../data/student";
import "./CleverBadgeCard.css";

const MODULES = 25;
const QUIET_ZONE = 2;

/** Deterministic 32-bit hash, so a given student always gets the same badge. */
function hash(seed: string): number {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

/** True where a module falls inside one of the three 7x7 finder patterns. */
function isFinder(row: number, column: number): boolean {
  const corners = [
    [0, 0],
    [0, MODULES - 7],
    [MODULES - 7, 0],
  ];
  return corners.some(([top, left]) => {
    const inside = row >= top && row < top + 7 && column >= left && column < left + 7;
    if (!inside) return false;
    const r = row - top;
    const c = column - left;
    const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3));
    // Filled outer ring and filled centre, hollow ring between them.
    return ring === 3 || ring <= 1;
  });
}

/** Finder patterns need one clear module of separation around them. */
function isFinderReserved(row: number, column: number): boolean {
  const corners = [
    [0, 0],
    [0, MODULES - 8],
    [MODULES - 8, 0],
  ];
  return corners.some(
    ([top, left]) => row >= top && row < top + 8 && column >= left && column < left + 8,
  );
}

/**
 * The student's Clever Badge.
 *
 * Clever Badges are QR codes a student holds up to a camera instead of typing a
 * password. The square below is drawn in the same idiom — three finder patterns,
 * timing rows, and a deterministic data field — but it does not encode a real
 * credential, because this portal has no account to authenticate against.
 */
export function CleverBadgeCard() {
  const modules = useMemo(() => {
    const seed = hash(`${student.fullName}:${student.school}`);
    const grid: boolean[][] = [];

    for (let row = 0; row < MODULES; row += 1) {
      grid[row] = [];
      for (let column = 0; column < MODULES; column += 1) {
        if (isFinder(row, column)) {
          grid[row][column] = true;
          continue;
        }
        if (isFinderReserved(row, column)) {
          grid[row][column] = false;
          continue;
        }
        // Timing patterns run between the finders on row and column 6.
        if (row === 6 || column === 6) {
          grid[row][column] = (row + column) % 2 === 0;
          continue;
        }
        // Data field: a cheap xorshift keyed off the seed and position.
        let value = seed ^ Math.imul(row + 1, 0x9e3779b1) ^ Math.imul(column + 1, 0x85ebca6b);
        value ^= value << 13;
        value ^= value >>> 17;
        value ^= value << 5;
        grid[row][column] = ((value >>> 0) & 0x3f) > 30;
      }
    }

    return grid;
  }, []);

  const span = MODULES + QUIET_ZONE * 2;

  return (
    <div className="badge-card">
      <div className="badge-card__header">
        <CleverLogo className="badge-card__logo" color="#fff" title="Clever" />
        <span className="badge-card__header-label">Badge</span>
      </div>

      <div className="badge-card__body">
        <svg
          className="badge-card__code"
          viewBox={`0 0 ${span} ${span}`}
          role="img"
          aria-label={`Clever Badge for ${student.fullName}`}
          shapeRendering="crispEdges"
        >
          <rect width={span} height={span} fill="#fff" />
          {modules.flatMap((row, rowIndex) =>
            row.map((filled, columnIndex) =>
              filled ? (
                <rect
                  key={`${rowIndex}-${columnIndex}`}
                  x={columnIndex + QUIET_ZONE}
                  y={rowIndex + QUIET_ZONE}
                  width={1}
                  height={1}
                  fill="#15131c"
                />
              ) : null,
            ),
          )}
        </svg>

        <dl className="badge-card__details">
          <div>
            <dt>Student</dt>
            <dd className="badge-card__name">{student.fullName}</dd>
          </div>
          <div>
            <dt>Class</dt>
            <dd>{student.homeroom}</dd>
          </div>
          <div>
            <dt>School</dt>
            <dd>{student.school}</dd>
          </div>
          <div>
            <dt>District</dt>
            <dd>{student.district}</dd>
          </div>
        </dl>
      </div>

      <p className="badge-card__footer">
        Keep this badge private. Anyone who has it can open your account.
      </p>
    </div>
  );
}
