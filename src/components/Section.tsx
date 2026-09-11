import type { ReactNode } from "react";
import "./Section.css";

interface Props {
  id: string;
  title: string;
  /** Shown to the right of the heading, e.g. a count. */
  meta?: ReactNode;
  children: ReactNode;
}

/** A titled block of the dashboard. The heading doubles as the scroll anchor. */
export function Section({ id, title, meta, children }: Props) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section__header">
        <h2 className="section__title" id={`${id}-heading`}>
          {title}
        </h2>
        {meta ? <span className="section__meta">{meta}</span> : null}
      </div>
      {children}
    </section>
  );
}
