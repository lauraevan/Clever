import { useCallback, useState } from "react";
import { CleverHeader } from "./components/CleverHeader";
import { CleverSidebar } from "./components/CleverSidebar";
import { Toast } from "./components/Toast";
import { AppView } from "./pages/AppView";
import { Dashboard } from "./pages/Dashboard";
import { DemoLogin } from "./pages/DemoLogin";
import { TeacherPage } from "./pages/TeacherPage";
import { resourcesById } from "./data/apps";
import { teacherPagesById } from "./data/teacherPages";
import { useFavorites } from "./lib/useFavorites";
import { useRoute } from "./lib/router";
import type { SearchResult } from "./lib/search";
import type { Resource, ResourceTarget, SectionId, TeacherPageResource } from "./data/types";
import "./App.css";

export default function App() {
  const [route, rawNavigate] = useRoute();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedSection, setSelectedSection] = useState<SectionId | null>("teacher-pages");
  const [scrollTarget, setScrollTarget] = useState<SectionId | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Every route change also dismisses the off-canvas nav.
  const navigate = useCallback(
    (next: Parameters<typeof rawNavigate>[0]) => {
      setNavOpen(false);
      rawNavigate(next);
    },
    [rawNavigate],
  );

  const openTarget = useCallback(
    (target: ResourceTarget, id: string) => {
      if (target.kind === "external") {
        window.open(target.href, "_blank", "noopener,noreferrer");
        return;
      }
      navigate({ name: "app", resourceId: id });
    },
    [navigate],
  );

  const handleOpenResource = useCallback(
    (resource: Resource) => openTarget(resource.target, resource.id),
    [openTarget],
  );

  const handleOpenTeacherPageResource = useCallback(
    (resource: TeacherPageResource) => {
      if (resource.target.kind === "external") {
        window.open(resource.target.href, "_blank", "noopener,noreferrer");
        return;
      }
      setToast(`${resource.title} is a placeholder link on this demo Teacher Page.`);
    },
    [],
  );

  const handleSearchResult = useCallback(
    (result: SearchResult) => {
      if (result.target.kind === "teacher-page") {
        navigate({ name: "teacher", pageId: result.target.pageId });
        return;
      }
      if (result.target.kind === "external") {
        window.open(result.target.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (result.kind === "resource") {
        navigate({ name: "app", resourceId: result.id.replace(/^resource:/, "") });
        return;
      }
      setToast(`${result.title} is a placeholder link on this demo portal.`);
    },
    [navigate],
  );

  const handleSelectSection = useCallback(
    (id: SectionId) => {
      setSelectedSection(id);
      if (route.name !== "dashboard") {
        navigate({ name: "dashboard" });
        // Let the dashboard mount before asking it to scroll.
        window.setTimeout(() => setScrollTarget(id), 0);
      } else {
        setScrollTarget(id);
        setNavOpen(false);
      }
    },
    [navigate, route.name],
  );

  if (route.name === "login") {
    return <DemoLogin onEnter={() => navigate({ name: "dashboard" })} />;
  }

  return (
    <div className="app">
      <CleverHeader
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((open) => !open)}
        onGoHome={() => navigate({ name: "dashboard" })}
        onOpenResult={handleSearchResult}
        onLogOut={() => navigate({ name: "login" })}
        onOpenDemoNotice={(title) => setToast(`${title} isn't available in this UI demo.`)}
      />

      <div className="app__body">
        <CleverSidebar
          selected={route.name === "dashboard" ? selectedSection : null}
          onSelect={handleSelectSection}
          open={navOpen}
          onDismiss={() => setNavOpen(false)}
        />

        {route.name === "dashboard" ? (
          <Dashboard
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onOpenResource={handleOpenResource}
            onOpenTeacherPage={(pageId) => navigate({ name: "teacher", pageId })}
            scrollTarget={scrollTarget}
            onScrolled={() => setScrollTarget(null)}
            onVisibleSectionChange={setSelectedSection}
          />
        ) : null}

        {route.name === "teacher" ? (
          (() => {
            const page = teacherPagesById.get(route.pageId);
            if (!page) return <AppView resource={undefined} onBack={() => navigate({ name: "dashboard" })} />;
            return (
              <TeacherPage
                page={page}
                onBack={() => navigate({ name: "dashboard" })}
                onOpenResource={handleOpenTeacherPageResource}
              />
            );
          })()
        ) : null}

        {route.name === "app" ? (
          <AppView
            resource={resourcesById.get(route.resourceId)}
            onBack={() => navigate({ name: "dashboard" })}
          />
        ) : null}
      </div>

      {toast ? <Toast message={toast} onDismiss={() => setToast(null)} /> : null}
    </div>
  );
}
