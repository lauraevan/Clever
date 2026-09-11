import { useCallback, useEffect, useState } from "react";

/**
 * Hash routes, rather than pulling in a routing library for a handful of
 * screens:
 *
 *   #/                    the portal
 *   #/teacher/:pageId     a Teacher Page
 *   #/page/:pageId        a page the portal hosts itself
 *   #/app/:resourceId     an app the school has not finished setting up
 *   #/library             the Clever Library
 *   #/notifications       every notification
 *   #/account             account settings
 *   #/login               the sign-in screen
 */
export type Route =
  | { name: "dashboard" }
  | { name: "teacher"; pageId: string }
  | { name: "page"; pageId: string }
  | { name: "app"; resourceId: string }
  | { name: "library" }
  | { name: "notifications" }
  | { name: "account" }
  | { name: "login" };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  const [head, param] = path.split("/");

  if (head === "teacher" && param) return { name: "teacher", pageId: param };
  if (head === "page" && param) return { name: "page", pageId: param };
  if (head === "app" && param) return { name: "app", resourceId: param };
  if (head === "library") return { name: "library" };
  if (head === "notifications") return { name: "notifications" };
  if (head === "account") return { name: "account" };
  if (head === "login") return { name: "login" };
  return { name: "dashboard" };
}

export function toHash(route: Route): string {
  switch (route.name) {
    case "teacher":
      return `#/teacher/${route.pageId}`;
    case "page":
      return `#/page/${route.pageId}`;
    case "app":
      return `#/app/${route.resourceId}`;
    case "library":
      return "#/library";
    case "notifications":
      return "#/notifications";
    case "account":
      return "#/account";
    case "login":
      return "#/login";
    default:
      return "#/";
  }
}

export function useRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    window.location.hash = toHash(next);
    window.scrollTo({ top: 0 });
  }, []);

  return [route, navigate];
}
