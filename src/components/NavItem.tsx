import type { ComponentType } from "react";
import type { IconProps } from "../lib/icons";
import "./NavItem.css";

interface Props {
  label: string;
  icon: ComponentType<IconProps>;
  selected?: boolean;
  onClick: () => void;
}

/**
 * A left-nav row. Geometry from src/LeftNav/NavLink.less: 16px of vertical
 * padding around a 24px line, 16px of left padding, a 24px icon with 12px to
 * its right, and a 3px inset rule that is blue when selected and a lighter blue
 * on hover.
 */
export function NavItem({ label, icon: Icon, selected, onClick }: Props) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={selected ? "true" : undefined}
        className={["button-reset", "nav-item", selected ? "nav-item--selected" : null]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="nav-item__contents">
          <span className="nav-item__icon-container">
            <Icon size="1rem" className="nav-item__icon" />
          </span>
          <span className="nav-item__label-container">
            <span className="nav-item__label">{label}</span>
          </span>
        </span>
      </button>
    </li>
  );
}
