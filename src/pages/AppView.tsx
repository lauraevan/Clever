import { LongArrowLeftIcon, WarningIcon } from "../lib/icons";
import type { Resource } from "../data/types";
import "./AppView.css";

interface Props {
  resource: Resource | undefined;
  onBack: () => void;
}

/**
 * Shown when a tile cannot be opened: an app the district has not finished
 * setting up, or a link that does not match anything in the portal.
 */
export function AppView({ resource, onBack }: Props) {
  const unavailable = resource?.target.kind === "unavailable";

  return (
    <main className="app-view" tabIndex={-1}>
      <button type="button" className="button-reset app-view__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      {!resource ? (
        <div className="app-view__panel">
          <h1 className="app-view__title">That app isn&rsquo;t in your portal</h1>
          <p className="app-view__body">
            The link you followed doesn&rsquo;t match an application on this demo portal.
          </p>
        </div>
      ) : (
        <div className="app-view__panel">
          <img className="app-view__icon" src={resource.icon} alt="" role="presentation" />
          <h1 className="app-view__title">{resource.title}</h1>

          <p className="app-view__body">
            {unavailable && resource.target.kind === "unavailable"
              ? resource.target.reason
              : "This app is in your portal but could not be opened."}
          </p>
          <p className="app-view__notice app-view__notice--warning">
            <WarningIcon size="0.875rem" />
            Ask your teacher to check with the technology office, or open a help desk ticket.
          </p>
        </div>
      )}
    </main>
  );
}
