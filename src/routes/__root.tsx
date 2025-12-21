import RightColumnLayout from "@/components/RightColumn/RightColumnLayout";
import { useDarkMode } from "@/stores/DarkModeStore";
import { createRootRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useEffect } from "react";
import { StartupTasks } from "@/services/appLifeCycle/StartupTasks";
import { ShutdownTasks } from "@/services/appLifeCycle/ShutdownTasks";
import { Header } from "@/components/Header/Header";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useDarkMode();
  const matches = useMatches();

  // Check if the current route has its own right column
  const currentRoute = matches[matches.length - 1]?.routeId;
  const hasCustomRightColumn =
    currentRoute === "/tableOverview" || currentRoute === "/candleSticks";

  useEffect(() => {
    StartupTasks.run();
    return () => {
      ShutdownTasks.run();
    };
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white">
      <Header />
      <main className="mt-8 px-8 md:pr-[calc(24rem+4rem)]">
        <Outlet />
      </main>
      {/* Default Right Column (only show if route doesn't have custom one) */}
      {!hasCustomRightColumn && <RightColumnLayout />}
    </div>
  );
}
