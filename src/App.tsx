import { useCallback, useState } from "react";
import { CleverHeader } from "./components/CleverHeader";
import { CleverSidebar } from "./components/CleverSidebar";
import { AccountSettings } from "./pages/AccountSettings";
import { AppView } from "./pages/AppView";
import { Dashboard } from "./pages/Dashboard";
import { GamesPortal } from "./pages/GamesPortal";
import { LibraryPage } from "./pages/LibraryPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ResourcePage } from "./pages/ResourcePage";
import { SignIn } from "./pages/SignIn";
import { TeacherPage } from "./pages/TeacherPage";
import { resourcesById } from "./data/apps";
import { notifications as initialNotifications } from "./data/notifications";
import { resourcePagesById } from "./data/resourcePages";
import { teacherPagesById } from "./data/teacherPages";
import { GridIcon } from "./lib/icons";
import { useFavorites } from "./lib/useFavorites";
import { useGamesMode } from "./lib/useGamesMode";
import { useStoredValue } from "./lib/useStoredValue";
import { useRoute, type Route } from "./lib/router";
import type { SearchResult } from "./lib/search";
import type { TileSize } from "./components/ResourceTile";
import type { NavItemDefinition } from "./data/navigation";
import { sourceSectionId } from "./lib/games";
import type { Resource, SectionId, TeacherPageResource } from "./data/types";
import "./App.css";

const TILE_SIZES: TileSize[] = ["small", "medium", "large"];

export default function App() {
  const [route, rawNavigate] = useRoute();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const [tileSize, setTileSize] = useStoredValue<TileSize>(
    "clever.tile-size",
    "large",
    (value): value is TileSize => TILE_SIZES.includes(value as TileSize),
  );

  const { unlocked, unlock, lock } = useGamesMode();

  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedSection, setSelectedSection] = useState<string | null>("teacher-pages");
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  /** Study Hall's collections, once its catalog has loaded. */
  const [gameSources, setGameSources] = useState<string[]>([]);

  /** Every route change also dismisses the off-canvas nav. */
  const navigate = useCallback(
    (next: Route) => {
      setNavOpen(false);
      rawNavigate(next);
    },
    [rawNavigate],
  );

  const openExternal = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  const handleOpenResource = useCallback(
    (resource: Resource) => {
      if (resource.target.kind === "external") {
        openExternal(resource.target.href);
        return;
      }
      if (resource.target.kind === "page") {
        navigate({ name: "page", pageId: resource.id });
        return;
      }
      navigate({ name: "app", resourceId: resource.id });
    },
    [navigate],
  );

  const handleOpenTeacherPageResource = useCallback(
    (resource: TeacherPageResource) => {
      if (resource.target.kind === "external") {
        openExternal(resource.target.href);
        return;
      }
      navigate({ name: "page", pageId: resource.pageId ?? resource.id });
    },
    [navigate],
  );

  /** Follows an in-page link by its visible label, when one resolves. */
  const handleOpenLabel = useCallback(
    (label: string) => {
      for (const [id, page] of resourcePagesById) {
        if (page.title.toLowerCase() === label.toLowerCase()) {
          navigate({ name: "page", pageId: id });
          return;
        }
      }
      navigate({ name: "dashboard" });
    },
    [navigate],
  );

  const handleSearchResult = useCallback(
    (result: SearchResult) => {
      if (result.target.kind === "teacher-page") {
        navigate({ name: "teacher", pageId: result.target.pageId });
        return;
      }
      if (result.target.kind === "external") {
        openExternal(result.target.href);
        return;
      }
      const resourceId = result.id.replace(/^(resource|link):/, "").split(":").pop();
      if (result.target.kind === "unavailable" && resourceId) {
        navigate({ name: "app", resourceId });
        return;
      }
      if (resourceId) navigate({ name: "page", pageId: resourceId });
    },
    [navigate],
  );

  const handleSelectSection = useCallback(
    (id: string) => {
      setSelectedSection(id);
      if (route.name !== "dashboard") {
        navigate({ name: "dashboard" });
        // Let the portal mount before asking it to scroll.
        window.setTimeout(() => setScrollTarget(id), 0);
      } else {
        setScrollTarget(id);
        setNavOpen(false);
      }
    },
    [navigate, route.name],
  );

  /** Study Hall replaces the portal's own sections while it is open. */
  const gameNavItems: NavItemDefinition[] = gameSources.map((source) => ({
    id: sourceSectionId(source),
    label: source,
    icon: GridIcon,
  }));

  const studyHall = {
    unlocked,
    onUnlock: unlock,
    onOpen: () => navigate({ name: "dashboard" }),
    onLock: () => {
      lock();
      setSelectedSection("teacher-pages");
      navigate({ name: "dashboard" });
    },
  };

  const markAllRead = () =>
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));

  const toggleRead = (id: string) =>
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, unread: !item.unread } : item)),
    );

  if (route.name === "login") {
    return <SignIn onSignIn={() => navigate({ name: "dashboard" })} />;
  }

  const backToPortal = () => navigate({ name: "dashboard" });

  return (
    <div className="app">
      <CleverHeader
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((open) => !open)}
        onGoHome={backToPortal}
        onOpenResult={handleSearchResult}
        onNavigate={navigate}
        notifications={notifications}
        onMarkAllRead={markAllRead}
        portalActive={route.name === "dashboard"}
      />

      <div className="app__body">
        <CleverSidebar
          selected={route.name === "dashboard" ? selectedSection : null}
          onSelect={handleSelectSection}
          open={navOpen}
          onDismiss={() => setNavOpen(false)}
          items={unlocked && gameNavItems.length > 0 ? gameNavItems : undefined}
        />

        {route.name === "dashboard" && unlocked ? (
          <GamesPortal
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onLock={studyHall.onLock}
            tileSize={tileSize}
            scrollTarget={scrollTarget}
            onScrolled={() => setScrollTarget(null)}
            onVisibleSourceChange={setSelectedSection}
            onSourcesLoaded={setGameSources}
          />
        ) : null}

        {route.name === "dashboard" && !unlocked ? (
          <Dashboard
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onOpenResource={handleOpenResource}
            onOpenTeacherPage={(pageId) => navigate({ name: "teacher", pageId })}
            onOpenLibrary={() => navigate({ name: "library" })}
            scrollTarget={scrollTarget as SectionId | null}
            onScrolled={() => setScrollTarget(null)}
            onVisibleSectionChange={setSelectedSection}
            tileSize={tileSize}
          />
        ) : null}

        {route.name === "teacher"
          ? (() => {
              const page = teacherPagesById.get(route.pageId);
              if (!page) return <AppView resource={undefined} onBack={backToPortal} />;
              return (
                <TeacherPage
                  page={page}
                  onBack={backToPortal}
                  onOpenResource={handleOpenTeacherPageResource}
                  tileSize={tileSize}
                />
              );
            })()
          : null}

        {route.name === "page"
          ? (() => {
              const page = resourcePagesById.get(route.pageId);
              if (!page) return <AppView resource={undefined} onBack={backToPortal} />;
              return (
                <ResourcePage
                  page={page}
                  onBack={backToPortal}
                  onOpenLink={handleOpenLabel}
                  studyHall={studyHall}
                />
              );
            })()
          : null}

        {route.name === "library" ? (
          <LibraryPage
            onBack={backToPortal}
            onOpenResource={handleOpenResource}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            tileSize={tileSize}
          />
        ) : null}

        {route.name === "notifications" ? (
          <NotificationsPage
            notifications={notifications}
            onBack={backToPortal}
            onMarkAllRead={markAllRead}
            onToggleRead={toggleRead}
          />
        ) : null}

        {route.name === "account" ? (
          <AccountSettings
            onBack={backToPortal}
            onNavigate={navigate}
            tileSize={tileSize}
            onTileSizeChange={setTileSize}
            favoriteCount={favorites.length}
          />
        ) : null}

        {route.name === "app" ? (
          <AppView resource={resourcesById.get(route.resourceId)} onBack={backToPortal} />
        ) : null}
      </div>
    </div>
  );
}
