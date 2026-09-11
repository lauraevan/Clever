import { NavItem } from "./NavItem";
import { navItems } from "../data/navigation";
import type { SectionId } from "../data/types";
import "./CleverSidebar.css";

interface Props {
  selected: SectionId | null;
  onSelect: (id: SectionId) => void;
  /** Controls the off-canvas state used below the tablet breakpoint. */
  open: boolean;
  onDismiss: () => void;
}

/**
 * The left navigation. Width, ground and text colour come from
 * src/LeftNav/LeftNav.less in clever-components: a 225px pane on Clever's
 * off-white, with links in `@primary_blue_shade_2`.
 */
export function CleverSidebar({ selected, onSelect, open, onDismiss }: Props) {
  return (
    <>
      <nav
        className={["clever-sidebar", open ? "clever-sidebar--open" : null]
          .filter(Boolean)
          .join(" ")}
        aria-label="Portal sections"
      >
        <ul className="list-reset clever-sidebar__list">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              selected={selected === item.id}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </ul>
      </nav>
      {open ? (
        <button
          type="button"
          className="button-reset clever-sidebar__scrim"
          aria-label="Close navigation"
          onClick={onDismiss}
        />
      ) : null}
    </>
  );
}
