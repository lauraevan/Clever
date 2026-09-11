import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import "./Menu.css";

interface Props {
  /** Renders the control that opens the menu. */
  trigger: (props: {
    open: boolean;
    toggle: () => void;
    id: string;
    menuId: string;
  }) => ReactNode;
  children: (props: { close: () => void }) => ReactNode;
  /** Which edge of the trigger the dropdown hangs from. */
  placement?: "left" | "right";
  className?: string;
  label: string;
}

/**
 * Dropdown container. Border, radius, offset and shadow come from
 * src/Menu/Menu.less in clever-components: a 1px silver border, 3px radius,
 * 4px top margin and `0 2px 4px rgba(21, 19, 28, 0.1)`.
 */
export function Menu({ trigger, children, placement = "right", className, label }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      containerRef.current?.querySelector<HTMLElement>(`#${CSS.escape(triggerId)}`)?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, triggerId]);

  return (
    <div className="menu" ref={containerRef}>
      {trigger({ open, toggle: () => setOpen((value) => !value), id: triggerId, menuId })}
      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label={label}
          className={["menu__dropdown", `menu__dropdown--${placement}`, className]
            .filter(Boolean)
            .join(" ")}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      ) : null}
    </div>
  );
}
