import { CleverLogo } from "../components/CleverLogo";
import { student } from "../data/student";
import "./DemoLogin.css";

interface Props {
  onEnter: () => void;
}

/**
 * The landing screen "Log out" returns to.
 *
 * This is deliberately not a login form. The replica never asks for, stores, or
 * transmits credentials, and it is not connected to Clever in any way, so the
 * screen offers a single control that re-enters the local demo.
 */
export function DemoLogin({ onEnter }: Props) {
  return (
    <div className="demo-login">
      <div className="demo-login__card">
        <CleverLogo className="demo-login__logo" color="var(--primary-blue)" title="Clever" />

        <p className="demo-login__eyebrow">Local UI demo</p>
        <h1 className="demo-login__title">You&rsquo;ve been logged out of the demo</h1>
        <p className="demo-login__body">
          This is a self-contained recreation of the Clever student portal interface. It has no
          connection to Clever, no account behind it, and it never asks for a username or password.
        </p>

        <button type="button" className="demo-login__button" onClick={onEnter}>
          Continue to demo
        </button>

        <p className="demo-login__meta">
          Signing back in as {student.fullName} · {student.school}
        </p>
      </div>
    </div>
  );
}
