import { useCallback, useEffect, useState } from "react";

/**
 * The replica has four screens, so it uses a hash route rather than pulling in
 * a routing library:
 *
 *   #/                    dashboard
 *   #/teacher/:pageId     a Teacher Page
 *   #/app/:resourceId     the mock "launching an app" screen
 *   #/login               the demo landing screen
 */
export type Route =
  | { name: "dashboard" }
  | { name: "teacher"; pageId: string }
  | { name: "app"; resourceId: string }
  | { name: "login" };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  const [head, param] = path.split("/");

  if (head === "teacher" && param) return { name: "teacher", pageId: param };
  if (head === "app" && param) return { name: "app", resourceId: param };
  if (head === "login") return { name: "login" };
  return { name: "dashboard" };
}

export function toHash(route: Route): string {
  switch (route.name) {
    case "teacher":
      return `#/teacher/${route.pageId}`;
    case "app":
      return `#/app/${route.resourceId}`;
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
