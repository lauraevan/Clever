import { useId, useState } from "react";
import { LockIcon, WarningIcon } from "../lib/icons";
import "./StudyHallGate.css";

interface Props {
  unlocked: boolean;
  /** Returns false when the code was wrong. */
  onUnlock: (code: string) => boolean;
  onOpen: () => void;
  onLock: () => void;
}

/** Study Hall's access code form. */
export function StudyHallGate({ unlocked, onUnlock, onOpen, onLock }: Props) {
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);
  const codeId = useId();
  const errorId = useId();

  if (unlocked) {
    return (
      <div className="study-hall study-hall--open">
        <p className="study-hall__open-title">Study Hall is open</p>
        <p className="study-hall__open-body">
          Your portal is showing the Study Hall collection instead of your class apps.
        </p>
        <div className="study-hall__open-actions">
          <button type="button" className="study-hall__submit" onClick={onOpen}>
            Go to Study Hall
          </button>
          <button type="button" className="button-reset study-hall__lock" onClick={onLock}>
            Close Study Hall
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="study-hall"
      onSubmit={(event) => {
        event.preventDefault();
        if (onUnlock(code)) {
          setWrong(false);
          setCode("");
          onOpen();
        } else {
          setWrong(true);
        }
      }}
    >
      <label className="study-hall__label" htmlFor={codeId}>
        Access code
      </label>
      <div className="study-hall__row">
        <div className={wrong ? "study-hall__field study-hall__field--error" : "study-hall__field"}>
          <LockIcon size="0.875rem" className="study-hall__field-icon" />
          <input
            id={codeId}
            type="password"
            inputMode="numeric"
            autoComplete="off"
            className="study-hall__input"
            placeholder="••••"
            aria-invalid={wrong}
            aria-describedby={wrong ? errorId : undefined}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setWrong(false);
            }}
          />
        </div>
        <button type="submit" className="study-hall__submit" disabled={code.trim().length === 0}>
          Enter
        </button>
      </div>

      {wrong ? (
        <p className="study-hall__error" id={errorId} role="alert">
          <WarningIcon size="0.875rem" />
          That code is not right. Ask Ms. Mangan.
        </p>
      ) : null}
    </form>
  );
}
