import type { ReactNode } from "react";
import "./ResourceGrid.css";

interface Props {
  children: ReactNode;
  /** Rendered in place of the grid when a section has nothing in it. */
  empty?: ReactNode;
  isEmpty?: boolean;
}

/**
 * Tile rows. The tiles carry their own 8px right and bottom margins (Clever
 * puts the spacing on ResourceTile itself), so the grid only has to wrap them.
 */
export function ResourceGrid({ children, empty, isEmpty }: Props) {
  if (isEmpty) return <div className="resource-grid__empty">{empty}</div>;
  return <div className="resource-grid">{children}</div>;
}
