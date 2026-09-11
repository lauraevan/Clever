import { ResourceTile, type TileSize } from "./ResourceTile";
import type { TeacherPage } from "../data/types";
import "./TeacherPageTile.css";

interface Props {
  page: TeacherPage;
  onOpen: () => void;
  size?: TileSize;
}

/**
 * Teacher Pages share the tile grid's geometry so the two sections line up, but
 * they are not applications: instead of app artwork they carry a monogram plate
 * for the teacher, and they show the class beneath the page name.
 */
export function TeacherPageTile({ page, onOpen, size }: Props) {
  return (
    <ResourceTile
      title={page.title}
      // The teacher's name only earns a line when the page name doesn't carry it.
      notes={page.title.includes(page.teacher) ? undefined : page.teacher}
      size={size}
      target={{ kind: "page" }}
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
