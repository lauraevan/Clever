import { CleverLogo } from "./CleverLogo";
import { NotificationsMenu } from "./NotificationsMenu";
import { ProfileMenu } from "./ProfileMenu";
import { SearchControl } from "./SearchControl";
import { TopBarButton } from "./TopBarButton";
import { BarsIcon, GridIcon } from "../lib/icons";
import { student } from "../data/student";
import type { Route } from "../lib/router";
import type { SearchResult } from "../lib/search";
import type { PortalNotification } from "../data/types";
import "./CleverHeader.css";

interface Props {
  onGoHome: () => void;
  onOpenResult: (result: SearchResult) => void;
  onNavigate: (route: Route) => void;
  onToggleNav: () => void;
  navOpen: boolean;
  notifications: PortalNotification[];
  onMarkAllRead: () => void;
  /** Underlines the Portal control while the portal itself is on screen. */
  portalActive: boolean;
}

/**
 * The blue bar. Geometry comes from src/TopBar/index.less in clever-components:
 * 60px tall, `#436cf2`, `0 1px 6px 2px rgba(33, 70, 189, 0.25)`, 4px of
 * horizontal padding, a 28px logo inside a 16px-padded link, and a 16px regular
 * white title beside it.
 */
export function CleverHeader({
  onGoHome,
  onOpenResult,
  onNavigate,
  onToggleNav,
  navOpen,
  notifications,
  onMarkAllRead,
  portalActive,
}: Props) {
  return (
    <header className="clever-header" role="banner">
      <TopBarButton
        className="clever-header__nav-toggle"
        onClick={onToggleNav}
        aria-label={navOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={navOpen}
      >
        <BarsIcon size="1.125rem" />
      </TopBarButton>

      <TopBarButton
        className="clever-header__logo-link"
        onClick={onGoHome}
        aria-label="Clever Home"
      >
        <CleverLogo className="clever-header__logo" />
      </TopBarButton>

      <h1 className="clever-header__title" title={student.school}>
        {student.school}
      </h1>

      <div className="clever-header__controls">
        <SearchControl onOpenResult={onOpenResult} />

        <TopBarButton active={portalActive} onClick={onGoHome} className="clever-header__portal">
          <span className="clever-header__portal-inner">
            <GridIcon size="1rem" />
            <span className="clever-header__portal-label">Portal</span>
          </span>
        </TopBarButton>

        <NotificationsMenu
          notifications={notifications}
          onMarkAllRead={onMarkAllRead}
          onViewAll={() => onNavigate({ name: "notifications" })}
        />
        <ProfileMenu onNavigate={onNavigate} />
      </div>
    </header>
  );
}
