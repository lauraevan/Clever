import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Tokens and resets must load before any component stylesheet: several
// component rules (nav padding, top-bar padding) refine `.button-reset` at the
// same specificity and would otherwise lose to it.
import "./styles/tokens.css";
import "./styles/base.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
