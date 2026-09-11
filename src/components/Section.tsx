import type { ReactNode } from "react";
import "./Section.css";

interface Props {
  id: string;
  title: string;
  /** Shown to the right of the heading, e.g. a count. */
  meta?: ReactNode;
  /** A link-styled control at the far right of the heading row. */
  action?: { label: string; onClick: () => void };
  children: ReactNode;
}

/** A titled block of the portal. The heading doubles as the scroll anchor. */
export function Section({ id, title, meta, action, children }: Props) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section__header">
        <h2 className="section__title" id={`${id}-heading`}>
          {title}
        </h2>
        {meta ? <span className="section__meta">{meta}</span> : null}
        {action ? (
          <button type="button" className="button-reset section__action" onClick={action.onClick}>
            {action.label}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
