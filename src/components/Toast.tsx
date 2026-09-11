import { useEffect } from "react";
import { CloseIcon, InfoCircleIcon } from "../lib/icons";
import "./Toast.css";

interface Props {
  message: string;
  onDismiss: () => void;
}

/** Brief confirmation for actions that have no real destination in the demo. */
export function Toast({ message, onDismiss }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className="toast" role="status">
      <InfoCircleIcon size="1rem" className="toast__icon" />
      <span className="toast__message">{message}</span>
      <button
        type="button"
        className="button-reset toast__close"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        <CloseIcon size="0.75rem" />
      </button>
    </div>
  );
}
