import { useState } from "react";
import { Menu } from "./Menu";
import { TopBarButton } from "./TopBarButton";
import { BellIcon, CheckIcon } from "../lib/icons";
import { notifications as initialNotifications } from "../data/notifications";
import "./NotificationsMenu.css";

/**
 * The bell in the blue bar plus its dropdown. The dropdown reuses Clever's
 * Menu chrome and is sized to the bar rather than to a full-width modal.
 */
export function NotificationsMenu() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const markAllRead = () =>
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );

  return (
    <Menu
      label="Notifications"
      className="notifications"
      trigger={({ open, toggle, id, menuId }) => (
        <TopBarButton
          id={id}
          onClick={toggle}
          aria-haspopup
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
        >
          <span className="notifications__bell">
            <BellIcon size="1.125rem" />
            {unreadCount > 0 ? <span className="notifications__badge" aria-hidden="true" /> : null}
          </span>
        </TopBarButton>
      )}
    >
      {() => (
        <>
          <div className="notifications__header">
            <h2 className="notifications__title">Notifications</h2>
            {unreadCount > 0 ? (
              <button type="button" className="button-reset notifications__mark" onClick={markAllRead}>
                Mark all as read
              </button>
            ) : null}
          </div>

          {notifications.length === 0 ? (
            <p className="notifications__empty">You have no notifications right now.</p>
          ) : (
            <ul className="list-reset notifications__list">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <div
                    className={[
                      "notifications__item",
                      notification.unread ? "notifications__item--unread" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <p className="notifications__item-title">
                      {notification.title}
                      {notification.unread ? (
                        <span className="visually-hidden"> (unread)</span>
                      ) : null}
                    </p>
                    <p className="notifications__item-body">{notification.body}</p>
                    <p className="notifications__item-time">{notification.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {unreadCount === 0 && notifications.length > 0 ? (
            <p className="notifications__caught-up">
              <CheckIcon size="0.75rem" /> You&rsquo;re all caught up
            </p>
          ) : null}
        </>
      )}
    </Menu>
  );
}
