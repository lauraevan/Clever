import { useEffect, useRef } from "react";
import { ResourceGrid } from "../components/ResourceGrid";
import { ResourceTile } from "../components/ResourceTile";
import { Section } from "../components/Section";
import { TeacherPageTile } from "../components/TeacherPageTile";
import { resources } from "../data/apps";
import { sectionTitles } from "../data/navigation";
import { teacherPages } from "../data/teacherPages";
import { student } from "../data/student";
import type { Resource, SectionId } from "../data/types";
import "./Dashboard.css";

interface Props {
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onOpenResource: (resource: Resource) => void;
  onOpenTeacherPage: (pageId: string) => void;
  /** Section the left nav last asked us to scroll to. */
  scrollTarget: SectionId | null;
  onScrolled: () => void;
  onVisibleSectionChange: (id: SectionId) => void;
}

/** Distance below the bar at which a section counts as the current one. */
const HEADER_OFFSET = 72;

const RESOURCE_SECTIONS = [
  "classroom-resources",
  "district-resources",
  "applications",
] as const;

export function Dashboard({
  isFavorite,
  onToggleFavorite,
  onOpenResource,
  onOpenTeacherPage,
  scrollTarget,
  onScrolled,
  onVisibleSectionChange,
}: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const favorites = resources.filter((resource) => isFavorite(resource.id));

  // Scroll the requested section into view when the left nav asks.
  useEffect(() => {
    if (!scrollTarget) return;
    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    onScrolled();
  }, [scrollTarget, onScrolled]);

  // Keep the left nav's selected item in step with what's on screen.
  useEffect(() => {
    const sections = Array.from(
      mainRef.current?.querySelectorAll<HTMLElement>("section[id]") ?? [],
    );
    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // The band starts just below the bar; a section counts as current once
      // its heading has reached it.
      const bandTop = HEADER_OFFSET;
      const bandBottom = window.innerHeight * 0.4;
      const visible = sections.filter((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top < bandBottom && bottom > bandTop;
      });
      if (visible.length === 0) return;

      // At the very bottom of the page the last sections can no longer reach
      // the top of the band, so the last one in view wins instead of the first.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atBottom ? visible[visible.length - 1] : visible[0];
      onVisibleSectionChange(current.id as SectionId);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onVisibleSectionChange, favorites.length]);

  const renderTile = (resource: Resource) => (
    <ResourceTile
      key={resource.id}
      title={resource.title}
      icon={resource.icon}
      notes={resource.notes}
      notify={resource.notify}
      target={resource.target}
      onActivate={() => onOpenResource(resource)}
      favorite={isFavorite(resource.id)}
      onToggleFavorite={() => onToggleFavorite(resource.id)}
    />
  );

  return (
    <main className="dashboard" ref={mainRef} tabIndex={-1}>
      <Section id="teacher-pages" title={sectionTitles["teacher-pages"]}>
        <ResourceGrid>
          {teacherPages.map((page) => (
            <TeacherPageTile
              key={page.id}
              page={page}
              onOpen={() => onOpenTeacherPage(page.id)}
            />
          ))}
        </ResourceGrid>
      </Section>

      <Section id="favorites" title={sectionTitles.favorites}>
        <ResourceGrid
          isEmpty={favorites.length === 0}
          empty="Select the heart on any app to keep it here."
        >
          {favorites.map(renderTile)}
        </ResourceGrid>
      </Section>

      {RESOURCE_SECTIONS.map((sectionId) => {
        const sectionResources = resources.filter((resource) => resource.section === sectionId);
        return (
          <Section key={sectionId} id={sectionId} title={sectionTitles[sectionId]}>
            <ResourceGrid>{sectionResources.map(renderTile)}</ResourceGrid>
          </Section>
        );
      })}

      <p className="dashboard__footnote">
        {student.district} · {student.school}
      </p>
    </main>
  );
}
