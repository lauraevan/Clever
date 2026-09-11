import type { ElementType, MouseEvent, ReactNode } from "react";
import "./TopBarButton.css";

interface Props {
  children: ReactNode;
  className?: string;
  /** Draws the white underline Clever puts beneath the current section. */
  active?: boolean;
  /** 40px circular variant, used for the profile control. */
  round?: boolean;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  "aria-label"?: string;
  "aria-haspopup"?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  id?: string;
  title?: string;
}

/**
 * A control in the blue bar. Geometry follows src/TopBar/TopBarButton.less:
 * 52px tall (the 60px bar less 8px), 16px of horizontal padding, 3px radius,
 * and a 3px white indicator inset 12px from the sides when active.
 */
export function TopBarButton({
  children,
  className,
  active,
  round,
  href,
  onClick,
  ...rest
}: Props) {
  const Wrapper: ElementType = href ? "a" : "button";

  return (
    <div className="top-bar-button__container">
      <Wrapper
        {...rest}
        type={href ? undefined : "button"}
        href={href}
        className={[
          "button-reset",
          "top-bar-button",
          round ? "top-bar-button--round" : null,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-current={active ? "page" : undefined}
        onClick={(event: MouseEvent<HTMLElement>) => {
          // Clever blurs the control on activation so it doesn't read as still
          // selected afterwards.
          (event.currentTarget as HTMLElement).blur();
          onClick?.(event);
        }}
      >
        {children}
      </Wrapper>
      {active ? <div className="top-bar-button__active-indicator" /> : null}
    </div>
  );
}
