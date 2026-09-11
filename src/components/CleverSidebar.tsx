import { NavItem } from "./NavItem";
import { navItems, type NavItemDefinition } from "../data/navigation";
import "./CleverSidebar.css";

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  /** Overrides the portal's own sections, as Study Hall does. */
  items?: NavItemDefinition[];
  /** Controls the off-canvas state used below the tablet breakpoint. */
  open: boolean;
  onDismiss: () => void;
}

/**
 * The left navigation. Width, ground and text colour come from
 * src/LeftNav/LeftNav.less in clever-components: a 225px pane on Clever's
 * off-white, with links in `@primary_blue_shade_2`.
 */
export function CleverSidebar({ selected, onSelect, open, onDismiss, items }: Props) {
  return (
    <>
      <nav
        className={["clever-sidebar", open ? "clever-sidebar--open" : null]
          .filter(Boolean)
          .join(" ")}
        aria-label="Portal sections"
      >
        <ul className="list-reset clever-sidebar__list">
          {(items ?? navItems).map((item) => (
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
