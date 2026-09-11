import { useState } from "react";
import { CheckIcon, LongArrowLeftIcon } from "../lib/icons";
import { student } from "../data/student";
import { teacherPages } from "../data/teacherPages";
import type { Route } from "../lib/router";
import "./AccountSettings.css";

interface Props {
  onBack: () => void;
  onNavigate: (route: Route) => void;
  /** Tile size the portal is currently drawing. */
  tileSize: "small" | "medium" | "large";
  onTileSizeChange: (size: "small" | "medium" | "large") => void;
  favoriteCount: number;
}

const TILE_SIZES = [
  { value: "small", label: "Small", note: "80px icons" },
  { value: "medium", label: "Medium", note: "104px icons" },
  { value: "large", label: "Large", note: "128px icons" },
] as const;

/** Account settings: identity, how the portal is drawn, and where data lives. */
export function AccountSettings({
  onBack,
  onNavigate,
  tileSize,
  onTileSizeChange,
  favoriteCount,
}: Props) {
  const [cleared, setCleared] = useState(false);
  const homeroom = teacherPages[0];

  return (
    <main className="account" tabIndex={-1}>
      <button type="button" className="button-reset account__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      <header className="account__header">
        <span className="account__avatar" aria-hidden="true">
          {student.initials}
        </span>
        <span>
          <h1 className="account__title">{student.fullName}</h1>
          <p className="account__subtitle">
            {student.grade} · {student.school}
          </p>
        </span>
      </header>

      <section className="account__section" aria-labelledby="account-details">
        <h2 className="account__section-title" id="account-details">
          Your account
        </h2>
        <dl className="account__details">
          <div>
            <dt>Name</dt>
            <dd>{student.fullName}</dd>
          </div>
          <div>
            <dt>Grade</dt>
            <dd>{student.grade}</dd>
          </div>
          <div>
            <dt>Homeroom</dt>
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
        <p className="account__note">
          Your name, grade and class come from the district's student information
          system. Ask the front office to correct anything that looks wrong — it cannot be
          changed here.
        </p>
      </section>

      <section className="account__section" aria-labelledby="account-signin">
        <h2 className="account__section-title" id="account-signin">
          How you log in
        </h2>
        <p className="account__note">
          {student.grade} students at {student.school} log in with a Clever Badge. There is no
          password on your account to change.
        </p>
        <button
          type="button"
          className="account__button"
          onClick={() => onNavigate({ name: "page", pageId: "clever-badges" })}
        >
          View my Clever Badge
        </button>
      </section>

      <section className="account__section" aria-labelledby="account-display">
        <h2 className="account__section-title" id="account-display">
          Portal display
        </h2>
        <fieldset className="account__fieldset">
          <legend className="account__legend">App icon size</legend>
          <div className="account__choices">
            {TILE_SIZES.map((option) => (
              <label
                key={option.value}
                className={
                  tileSize === option.value
                    ? "account__choice account__choice--selected"
                    : "account__choice"
                }
              >
                <input
                  type="radio"
                  name="tile-size"
                  value={option.value}
                  checked={tileSize === option.value}
                  onChange={() => onTileSizeChange(option.value)}
                />
                <span className="account__choice-label">{option.label}</span>
                <span className="account__choice-note">{option.note}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="account__section" aria-labelledby="account-data">
        <h2 className="account__section-title" id="account-data">
          Saved on this device
        </h2>
        <p className="account__note">
          Your favourites and icon size are kept in this browser only. They are not sent
          anywhere and are not visible to {homeroom.teacher} or the district.
        </p>
        <p className="account__stat">
          {favoriteCount === 0
            ? "No favourites saved"
            : `${favoriteCount} favourite${favoriteCount === 1 ? "" : "s"} saved`}
        </p>
        {cleared ? (
          <p className="account__cleared" role="status">
            <CheckIcon size="0.875rem" /> Cleared from this browser
          </p>
        ) : (
          <button
            type="button"
            className="account__button account__button--quiet"
            onClick={() => {
              try {
                window.localStorage.clear();
              } catch {
                // Blocked site data is fine; there was nothing to clear.
              }
              setCleared(true);
            }}
          >
            Clear saved data
          </button>
        )}
      </section>
    </main>
  );
}
