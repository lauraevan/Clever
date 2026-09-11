import { Menu } from "./Menu";
import { TopBarButton } from "./TopBarButton";
import { BellIcon, ChevronDownIcon, CleverBadgeIcon, GridIcon, SignOutIcon, UserIcon } from "../lib/icons";
import { student } from "../data/student";
import type { Route } from "../lib/router";
import "./ProfileMenu.css";

interface Props {
  onNavigate: (route: Route) => void;
}

/**
 * The student control at the right end of the blue bar. It sits in the bar as a
 * TopBarButton rather than as a separate pill, matching Clever's TopBar
 * composition.
 */
export function ProfileMenu({ onNavigate }: Props) {
  return (
    <Menu
      label={`Account menu for ${student.fullName}`}
      className="profile-menu"
      trigger={({ open, toggle, id, menuId }) => (
        <TopBarButton
          id={id}
          onClick={toggle}
          aria-haspopup
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Account menu for ${student.fullName}`}
          className="profile-menu__trigger"
        >
          <span className="profile-menu__trigger-inner">
            <span className="profile-menu__avatar" aria-hidden="true">
              {student.initials}
            </span>
            <span className="profile-menu__name">{student.firstName}</span>
            <ChevronDownIcon size="0.625rem" className="profile-menu__caret" />
          </span>
        </TopBarButton>
      )}
    >
      {({ close }) => (
        <>
          <div className="profile-menu__identity">
            <span className="profile-menu__avatar profile-menu__avatar--large" aria-hidden="true">
              {student.initials}
            </span>
            <span className="profile-menu__identity-text">
              <span className="profile-menu__identity-name">{student.fullName}</span>
              <span className="profile-menu__identity-meta">
                {student.grade} · {student.school}
              </span>
            </span>
          </div>

          <hr className="menu__divider" />

          <ul className="list-reset">
            <li>
              <button
                type="button"
                className="button-reset menu__item"
                onClick={() => {
                  close();
                  onNavigate({ name: "account" });
                }}
              >
                <span className="menu__item-inner">
                  <UserIcon size="1rem" className="menu__item-icon" />
                  Account settings
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="button-reset menu__item"
                onClick={() => {
                  close();
                  onNavigate({ name: "page", pageId: "clever-badges" });
                }}
              >
                <span className="menu__item-inner">
                  <CleverBadgeIcon size="1rem" className="menu__item-icon" />
                  My Clever Badge
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="button-reset menu__item"
                onClick={() => {
                  close();
                  onNavigate({ name: "page", pageId: "clever-goals" });
                }}
              >
                <span className="menu__item-inner">
                  <GridIcon size="1rem" className="menu__item-icon" />
                  My goals
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="button-reset menu__item"
                onClick={() => {
                  close();
                  onNavigate({ name: "notifications" });
                }}
              >
                <span className="menu__item-inner">
                  <BellIcon size="1rem" className="menu__item-icon" />
                  Notifications
                </span>
              </button>
            </li>
          </ul>

          <hr className="menu__divider" />

          <button
            type="button"
            className="button-reset menu__item"
            onClick={() => {
              close();
              onNavigate({ name: "login" });
            }}
          >
            <span className="menu__item-inner">
              <SignOutIcon size="1rem" className="menu__item-icon" />
              Log out
            </span>
          </button>
        </>
      )}
    </Menu>
  );
}
