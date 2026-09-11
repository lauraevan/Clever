import { ResourceGrid } from "../components/ResourceGrid";
import { ResourceTile } from "../components/ResourceTile";
import { Section } from "../components/Section";
import { LinkIcon, LongArrowLeftIcon } from "../lib/icons";
import type { TileSize } from "../components/ResourceTile";
import type { TeacherPage as TeacherPageData, TeacherPageResource } from "../data/types";
import "./TeacherPage.css";

interface Props {
  page: TeacherPageData;
  onBack: () => void;
  onOpenResource: (resource: TeacherPageResource) => void;
  tileSize: TileSize;
}

/**
 * A single Teacher Page. It keeps the portal's bar and left nav; the page adds
 * a Back control, the teacher's identity, and the resource sections they
 * assembled.
 */
export function TeacherPage({ page, onBack, onOpenResource, tileSize }: Props) {
  return (
    <main className="teacher-page" tabIndex={-1}>
      <button type="button" className="button-reset teacher-page__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      <header className="teacher-page__identity">
        <span className="teacher-page__avatar" style={{ backgroundColor: page.color }}>
          <span aria-hidden="true">{page.initials}</span>
        </span>
        <span className="teacher-page__identity-text">
          <h1 className="teacher-page__title">{page.title}</h1>
          <p className="teacher-page__subtitle">{page.subtitle}</p>
        </span>
      </header>

      {page.sections.map((section) => (
        <Section key={section.id} id={`${page.id}-${section.id}`} title={section.title}>
          <ResourceGrid>
            {section.resources.map((resource) => (
              <ResourceTile
                key={resource.id}
                title={resource.title}
                icon={resource.icon}
                notes={resource.notes}
                size={tileSize}
                target={resource.target}
                onActivate={() => onOpenResource(resource)}
                iconNode={
                  resource.icon ? undefined : (
                    <span className="teacher-page__link-plate">
                      <LinkIcon size="2rem" />
                    </span>
                  )
                }
              />
            ))}
          </ResourceGrid>
        </Section>
      ))}
    </main>
  );
}
