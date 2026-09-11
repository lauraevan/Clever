import { useId, useState } from "react";
import { CheckIcon } from "../lib/icons";
import { student } from "../data/student";
import "./TicketForm.css";

const CATEGORIES = [
  "Chromebook won't turn on or charge",
  "Screen, keyboard, or trackpad damage",
  "Can't sign in to my portal",
  "An app won't open from my portal",
  "Sound or headphone problem",
  "Wi-Fi or network problem",
  "Something else",
];

/**
 * The help desk's ticket form. Submitting records the ticket in component state
 * and shows the reference the desk would quote back; nothing is sent anywhere.
 */
export function TicketForm() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [details, setDetails] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);
  const categoryId = useId();
  const detailsId = useId();

  if (ticket) {
    return (
      <div className="ticket-form__receipt" role="status">
        <p className="ticket-form__receipt-title">
          <CheckIcon size="0.875rem" /> Ticket {ticket} opened
        </p>
        <p className="ticket-form__receipt-body">
          The technology team will reply to {student.firstName}&rsquo;s school email, usually within
          one school day. Bring your Chromebook and charger if you are asked to come to the library.
        </p>
        <button
          type="button"
          className="button-reset ticket-form__again"
          onClick={() => {
            setTicket(null);
            setDetails("");
          }}
        >
          Open another ticket
        </button>
      </div>
    );
  }

  return (
    <form
      className="ticket-form"
      onSubmit={(event) => {
        event.preventDefault();
        const reference = `LUSD-${String(Math.floor(Math.random() * 9000) + 1000)}`;
        setTicket(reference);
      }}
    >
      <div className="ticket-form__field">
        <label className="ticket-form__label" htmlFor={categoryId}>
          What is happening?
        </label>
        <select
          id={categoryId}
          className="ticket-form__select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="ticket-form__field">
        <label className="ticket-form__label" htmlFor={detailsId}>
          Tell us a bit more
        </label>
        <textarea
          id={detailsId}
          className="ticket-form__textarea"
          rows={4}
          placeholder="When did it start? What have you already tried?"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          required
        />
      </div>

      <p className="ticket-form__meta">
        Submitted as {student.fullName} · {student.homeroom}
      </p>

      <button type="submit" className="ticket-form__submit">
        Open ticket
      </button>
    </form>
  );
}
