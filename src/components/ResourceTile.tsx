import type { MouseEvent } from "react";
import { HeartIcon, HeartOutlineIcon } from "../lib/icons";
import type { ResourceTarget } from "../data/types";
import "./ResourceTile.css";

/** Clever truncates tile titles past 30 characters and shows the rest on hover. */
const TITLE_MAX_LENGTH = 30;

export type TileSize = "small" | "medium" | "large";

interface Props {
  title: string;
  /** Square icon artwork, or a node for tiles with no artwork of their own. */
  icon?: string;
  iconNode?: React.ReactNode;
  size?: TileSize;
  notes?: string;
  notify?: boolean;
  target: ResourceTarget;
  onActivate: () => void;
  /** Omit both to render a tile with no favourite control. */
  favorite?: boolean;
  onToggleFavorite?: () => void;
}

export function ResourceTile({
  title,
  icon,
  iconNode,
  size = "large",
  notes,
  notify,
  target,
  onActivate,
  favorite,
  onToggleFavorite,
}: Props) {
  const truncated = title.length > TITLE_MAX_LENGTH;
  const label = truncated ? `${title.substring(0, TITLE_MAX_LENGTH)}…` : title;
  const unavailable = target.kind === "unavailable";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // External links keep their real href so middle-click and "open in new tab"
    // behave normally; everything else is handled in-app.
    if (target.kind === "external" && !event.defaultPrevented) return;
    event.preventDefault();
    onActivate();
  };

  return (
    <div
      className={[
        "resource-tile",
        `resource-tile--${size}`,
        unavailable ? "resource-tile--unavailable" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <a
        className="resource-tile__link"
        href={target.kind === "external" ? target.href : "#/"}
        target={target.kind === "external" ? "_blank" : undefined}
        rel={target.kind === "external" ? "noreferrer" : undefined}
        title={truncated || notes ? [title, notes].filter(Boolean).join(" — ") : undefined}
        onClick={handleClick}
      >
        <span className="resource-tile__icon-container">
          {iconNode ?? (
            <img className="resource-tile__icon" src={icon} alt="" role="presentation" />
          )}
        </span>

        <span className="resource-tile__title-container">
          <span className="resource-tile__title-and-notes">
            <span className="resource-tile__title">{label}</span>
          </span>
          {notes ? <span className="resource-tile__notes">{notes}</span> : null}
          {unavailable ? (
            <span className="resource-tile__unavailable-label">Not available</span>
          ) : null}
        </span>

        {notify ? (
          <span className="resource-tile__notification">
            <span className="visually-hidden">Has new activity</span>
          </span>
        ) : null}
      </a>

      {onToggleFavorite ? (
        <button
          type="button"
          className={[
            "button-reset",
            "resource-tile__favorite",
            favorite ? "resource-tile__favorite--on" : null,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={favorite}
          aria-label={favorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          onClick={onToggleFavorite}
        >
          {favorite ? <HeartIcon size="0.875rem" /> : <HeartOutlineIcon size="0.875rem" />}
        </button>
      ) : null}
    </div>
  );
}
