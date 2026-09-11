import { CleverLogo } from "../components/CleverLogo";
import { BuildingIcon, CleverBadgeIcon, QuestionCircleIcon } from "../lib/icons";
import { student } from "../data/student";
import "./SignIn.css";

interface Props {
  onSignIn: () => void;
}

/**
 * The district sign-in screen.
 *
 * Clever's real login page is a set of single-sign-on choices rather than a
 * password box: a district picks Google, Clever Badges, Active Directory or
 * similar, and the student is handed off to that provider. This screen keeps
 * that shape and deliberately keeps it — there is no username or password field
 * anywhere in this project, and nothing here is wired to Clever or to Google.
 * Choosing a provider opens the portal locally.
 */
export function SignIn({ onSignIn }: Props) {
  return (
    <div className="sign-in">
      <main className="sign-in__card">
        <CleverLogo className="sign-in__logo" color="var(--primary-blue)" title="Clever" />

        <h1 className="sign-in__district">{student.district}</h1>
        <p className="sign-in__hint">Log in to your portal</p>

        <div className="sign-in__providers">
          <button type="button" className="sign-in__provider sign-in__provider--primary" onClick={onSignIn}>
            <span className="sign-in__provider-mark sign-in__provider-mark--badge" aria-hidden="true">
              <CleverBadgeIcon size="1.125rem" />
            </span>
            Log in with Clever Badges
          </button>

          <button type="button" className="sign-in__provider" onClick={onSignIn}>
            <img className="sign-in__provider-mark" src="/app-icons/google-drive.svg" alt="" />
            Log in with Google
          </button>

          <button type="button" className="sign-in__provider" onClick={onSignIn}>
            <span className="sign-in__provider-mark sign-in__provider-mark--district" aria-hidden="true">
              <BuildingIcon size="1rem" />
            </span>
            Log in with {student.district.replace(" School District", "")}
          </button>
        </div>

        <p className="sign-in__student-link">
          <button type="button" className="button-reset sign-in__link" onClick={onSignIn}>
            Not your district?
          </button>
        </p>

        <p className="sign-in__help">
          <QuestionCircleIcon size="0.875rem" />
          Having trouble? Ask your teacher or the front office.
        </p>
      </main>

      <p className="sign-in__notice">
        Interface reproduction. Not connected to Clever, and no credentials are
        requested or stored.
      </p>
    </div>
  );
}
