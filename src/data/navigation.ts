import type { ComponentType } from "react";
import {
  BookIcon,
  BuildingIcon,
  FolderOpenIcon,
  GridIcon,
  HeartIcon,
  UsersIcon,
} from "../lib/icons";
import type { IconProps } from "../lib/icons";
import type { SectionId } from "./types";

export interface NavItemDefinition {
  id: SectionId;
  label: string;
  icon: ComponentType<IconProps>;
}

/**
 * Left navigation entries, in portal order. Each one corresponds to a section
 * of the dashboard; selecting one scrolls that section into view.
 */
export const navItems: NavItemDefinition[] = [
  { id: "teacher-pages", label: "Teacher Pages", icon: UsersIcon },
  { id: "favorites", label: "Favorites", icon: HeartIcon },
  { id: "classroom-resources", label: "Classroom Resources", icon: BookIcon },
  { id: "school-resources", label: "School Resources", icon: FolderOpenIcon },
  { id: "district-resources", label: "District Resources", icon: BuildingIcon },
  { id: "clever-library", label: "Clever Library", icon: GridIcon },
];

export const sectionTitles: Record<SectionId, string> = {
  "teacher-pages": "Teacher Pages",
  favorites: "Favorites",
  "classroom-resources": "Classroom Resources",
  "school-resources": "School Resources",
  "district-resources": "District Resources",
  "clever-library": "Clever Library",
};
