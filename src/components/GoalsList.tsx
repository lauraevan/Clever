import { CheckIcon } from "../lib/icons";
import { goals } from "../data/goals";
import "./GoalsList.css";

/** Progress against this week's goals, one row per app. */
export function GoalsList() {
  return (
    <ul className="list-reset goals">
      {goals.map((goal) => {
        const met = goal.completed >= goal.target;
        const percent = Math.min(100, Math.round((goal.completed / goal.target) * 100));

        return (
          <li className="goals__item" key={goal.id}>
            <img className="goals__icon" src={goal.icon} alt="" role="presentation" />

            <div className="goals__detail">
              <div className="goals__row">
                <span className="goals__app">{goal.app}</span>
                <span className={met ? "goals__count goals__count--met" : "goals__count"}>
                  {met ? <CheckIcon size="0.75rem" /> : null}
                  {goal.completed} of {goal.target} {goal.unit}
                </span>
              </div>
              <div
                className="goals__track"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${goal.app} weekly goal`}
              >
                <div
                  className={met ? "goals__fill goals__fill--met" : "goals__fill"}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
