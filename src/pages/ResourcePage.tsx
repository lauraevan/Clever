import { CleverBadgeCard } from "../components/CleverBadgeCard";
import { GoalsList } from "../components/GoalsList";
import { StudyHallGate } from "../components/StudyHallGate";
import { TicketForm } from "../components/TicketForm";
import { ExternalLinkIcon, InfoCircleIcon, LinkIcon, LongArrowLeftIcon, WarningIcon } from "../lib/icons";
import type { PageBlock, ResourcePageContent } from "../data/types";
import "./ResourcePage.css";

export interface StudyHallControls {
  unlocked: boolean;
  onUnlock: (code: string) => boolean;
  onOpen: () => void;
  onLock: () => void;
}

interface Props {
  page: ResourcePageContent;
  onBack: () => void;
  /** Follows an in-portal link by resource id, when one resolves. */
  onOpenLink: (label: string) => void;
  studyHall: StudyHallControls;
}

function Block({
  block,
  onOpenLink,
  studyHall,
}: {
  block: PageBlock;
  onOpenLink: (label: string) => void;
  studyHall: StudyHallControls;
}) {
  switch (block.kind) {
    case "lead":
      return <p className="resource-page__lead">{block.text}</p>;

    case "heading":
      return <h2 className="resource-page__heading">{block.text}</h2>;

    case "paragraph":
      return <p className="resource-page__paragraph">{block.text}</p>;

    case "list":
      return (
        <ul className="resource-page__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "ordered":
      return (
        <ol className="resource-page__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="resource-page__table-wrap">
          <table className="resource-page__table">
            <thead>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={index} scope="col">
                    {cell || <span className="visually-hidden">Detail</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "definitions":
      return (
        <dl className="resource-page__definitions">
          {block.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      );

    case "links":
      return (
        <ul className="list-reset resource-page__links">
          {block.items.map((item) =>
            item.href ? (
              <li key={item.label}>
                <a
                  className="resource-page__link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon size="0.875rem" className="resource-page__link-icon" />
                  <span>
                    <span className="resource-page__link-label">{item.label}</span>
                    {item.note ? (
                      <span className="resource-page__link-note">{item.note}</span>
                    ) : null}
                  </span>
                </a>
              </li>
            ) : (
              <li key={item.label}>
                <button
                  type="button"
                  className="button-reset resource-page__link"
                  onClick={() => onOpenLink(item.label)}
                >
                  <LinkIcon size="0.875rem" className="resource-page__link-icon" />
                  <span>
                    <span className="resource-page__link-label">{item.label}</span>
                    {item.note ? (
                      <span className="resource-page__link-note">{item.note}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ),
          )}
        </ul>
      );

    case "callout":
      return (
        <p
          className={`resource-page__callout resource-page__callout--${block.tone}`}
          role={block.tone === "warning" ? "note" : undefined}
        >
          {block.tone === "warning" ? (
            <WarningIcon size="0.875rem" />
          ) : (
            <InfoCircleIcon size="0.875rem" />
          )}
          <span>{block.text}</span>
        </p>
      );

    case "badge":
      return <CleverBadgeCard />;

    case "goals":
      return <GoalsList />;

    case "ticket-form":
      return <TicketForm />;

    case "study-hall":
      return (
        <StudyHallGate
          unlocked={studyHall.unlocked}
          onUnlock={studyHall.onUnlock}
          onOpen={studyHall.onOpen}
          onLock={studyHall.onLock}
        />
      );
  }
}

/** A page the portal hosts itself, rendered from structured content. */
export function ResourcePage({ page, onBack, onOpenLink, studyHall }: Props) {
  return (
    <main className="resource-page" tabIndex={-1}>
      <button type="button" className="button-reset resource-page__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      <header className="resource-page__header">
        <p className="resource-page__owner">{page.owner}</p>
        <h1 className="resource-page__title">{page.title}</h1>
        {page.subtitle ? <p className="resource-page__subtitle">{page.subtitle}</p> : null}
      </header>

      <div className="resource-page__content">
        {page.blocks.map((block, index) => (
          <Block key={index} block={block} onOpenLink={onOpenLink} studyHall={studyHall} />
        ))}
      </div>
    </main>
  );
}
