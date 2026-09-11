import { useState } from "react";
import { hasBundledLogo, logoUrl } from "../lib/logoSource";
import "./AppIcon.css";
import { assetUrl } from "../lib/assetUrl";

interface Props {
  /** Resource id, used to decide whether the bundled tile is already real. */
  id: string;
  /** Bundled artwork under public/app-icons/, or a direct image URL. */
  src: string;
  /** Product host, when one is known, e.g. "ixl.com". */
  domain?: string;
  title: string;
  /** True when `src` is already remote, so no logo service is consulted. */
  remote?: boolean;
}

/** Clever's accent palette, so a stand-in plate still looks like the product. */
const PLATE_COLORS = [
  "#436cf2",
  "#2146bd",
  "#1da978",
  "#29c6c1",
  "#7e1dff",
  "#f03797",
  "#f59520",
  "#474c5e",
];

/** Stable colour per title, so a tile keeps the same plate between visits. */
function plateColor(title: string): string {
  let hash = 0;
  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 31 + title.charCodeAt(index)) >>> 0;
  }
  return PLATE_COLORS[hash % PLATE_COLORS.length];
}

/**
 * An application's icon, with a fallback chain.
 *
 * Apps whose bundled artwork is already the genuine mark render it directly.
 * For the rest the portal loads the logo the vendor publishes and falls back to
 * the bundled tile if that does not load — offline, blocked, or missing. If
 * nothing loads at all, a monogram plate stands in rather than a broken image.
 */
export function AppIcon({ id, src, domain, title, remote }: Props) {
  const service = remote || hasBundledLogo(id) ? null : logoUrl(domain);
  const local = assetUrl(src);
  const chain = service ? [service, local] : [local];

  // A new source resets the chain, so a tile doesn't inherit another's failure.
  // Adjusted during render rather than in an effect, per React's guidance.
  const key = chain.join("|");
  const [state, setState] = useState(() => ({ key, step: 0 }));
  const step = state.key === key ? state.step : 0;
  if (state.key !== key) setState({ key, step: 0 });

  const advance = () =>
    setState((current) => ({ key, step: (current.key === key ? current.step : 0) + 1 }));

  if (step >= chain.length) {
    return (
      <span
        className="app-icon app-icon--monogram"
        style={{ backgroundColor: plateColor(title) }}
        aria-hidden="true"
      >
        <span className="app-icon__monogram">{title.trim().charAt(0).toUpperCase()}</span>
      </span>
    );
  }

  const current = chain[step];
  const isService = service !== null && step === 0;

  const image = (
    <img
      className={isService ? "app-icon__mark" : "app-icon"}
      src={current}
      alt=""
      role="presentation"
      title={title}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={advance}
    />
  );

  // A published logo is usually a favicon, so it is centred on a plate at a
  // size it can fill cleanly rather than stretched to the tile and blurred.
  return isService ? <span className="app-icon app-icon--plate">{image}</span> : image;
}
