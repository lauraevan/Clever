import { CheckIcon, LongArrowLeftIcon } from "../lib/icons";
import type { PortalNotification } from "../data/types";
import "./NotificationsPage.css";

interface Props {
  notifications: PortalNotification[];
  onBack: () => void;
  onMarkAllRead: () => void;
  onToggleRead: (id: string) => void;
}

/** Every notification, grouped the way the portal groups them. */
export function NotificationsPage({
  notifications,
  onBack,
  onMarkAllRead,
  onToggleRead,
}: Props) {
  const unread = notifications.filter((notification) => notification.unread);
  const earlier = notifications.filter((notification) => !notification.unread);

  const renderGroup = (title: string, items: PortalNotification[]) =>
    items.length === 0 ? null : (
      <section className="notifications-page__group" aria-label={title}>
        <h2 className="notifications-page__group-title">{title}</h2>
        <ul className="list-reset">
          {items.map((notification) => (
            <li key={notification.id}>
              <div
                className={
                  notification.unread
                    ? "notifications-page__item notifications-page__item--unread"
                    : "notifications-page__item"
                }
              >
                <div className="notifications-page__item-text">
                  <p className="notifications-page__item-title">{notification.title}</p>
                  <p className="notifications-page__item-body">{notification.body}</p>
                  <p className="notifications-page__item-time">{notification.timestamp}</p>
                </div>
                <button
                  type="button"
                  className="button-reset notifications-page__toggle"
                  onClick={() => onToggleRead(notification.id)}
                >
                  {notification.unread ? "Mark as read" : "Mark as unread"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );

  return (
    <main className="notifications-page" tabIndex={-1}>
      <button type="button" className="button-reset notifications-page__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      <header className="notifications-page__header">
        <div>
          <h1 className="notifications-page__title">Notifications</h1>
          <p className="notifications-page__subtitle">
            {unread.length === 0
              ? "Nothing new right now"
              : `${unread.length} unread`}
          </p>
        </div>
        {unread.length > 0 ? (
          <button type="button" className="notifications-page__mark" onClick={onMarkAllRead}>
            Mark all as read
          </button>
        ) : null}
      </header>

      {notifications.length === 0 ? (
        <p className="notifications-page__empty">
          <CheckIcon size="0.875rem" /> You have no notifications.
        </p>
      ) : (
        <>
          {renderGroup("Unread", unread)}
          {renderGroup("Earlier", earlier)}
        </>
      )}
    </main>
  );
}
