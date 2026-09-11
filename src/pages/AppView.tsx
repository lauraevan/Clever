import { ExternalLinkIcon, LongArrowLeftIcon, WarningIcon } from "../lib/icons";
import type { Resource } from "../data/types";
import "./AppView.css";

interface Props {
  resource: Resource | undefined;
  onBack: () => void;
}

/**
 * Where an in-portal application lands. Clicking a tile in the real portal
 * hands the student off to the application through single sign-on; this replica
 * stops at a local screen instead, because it has no account to hand off.
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

          {unavailable ? (
            <p className="app-view__notice app-view__notice--warning">
              <WarningIcon size="0.875rem" />
              {resource.target.kind === "unavailable" ? resource.target.reason : null}
            </p>
          ) : (
            <>
              <p className="app-view__body">
                In the real portal, selecting {resource.title} signs you straight in through Clever
                single sign-on.
              </p>
              <p className="app-view__notice">
                <ExternalLinkIcon size="0.875rem" />
                This is a local demo, so there is no account to sign in to.
              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
