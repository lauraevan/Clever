import { ResourceTile } from "./ResourceTile";
import type { TeacherPage } from "../data/types";
import "./TeacherPageTile.css";

interface Props {
  page: TeacherPage;
  onOpen: () => void;
}

/**
 * Teacher Pages share the tile grid's geometry so the two sections line up, but
 * they are not applications: instead of app artwork they carry a monogram plate
 * for the teacher, and they show the class beneath the page name.
 */
export function TeacherPageTile({ page, onOpen }: Props) {
  return (
    <ResourceTile
      title={page.title}
      notes={page.teacher}
      target={{ kind: "demo" }}
      onActivate={onOpen}
      iconNode={
        <span className="teacher-page-tile__plate" style={{ backgroundColor: page.color }}>
          <span className="teacher-page-tile__initials" aria-hidden="true">
            {page.initials}
          </span>
        </span>
      }
    />
  );
}
