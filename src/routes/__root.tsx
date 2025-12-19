import EngineersGateLogo from "@/assets/EngineersGateLogo";
import BreadCrumb from "@/components/Breadcrumb";
import LightDarkModeToggle from "@/components/LightDarkModeToggle";
import ClaudeChatIntegration from "@/components/ClaudeChatIntegration";
import { NAVIGATION_CONFIG } from "@/nav/NavigationConfig";
import { useDarkMode } from "@/stores/DarkModeStore";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { StartupTasks } from "@/services/appLifeCycle/StartupTasks";
import { ShutdownTasks } from "@/services/appLifeCycle/ShutdownTasks";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useDarkMode();

  useEffect(() => {
    StartupTasks.run();
    return () => {
      ShutdownTasks.run();
    };
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <EngineersGateLogo className="fill-[#00458a] h-12 dark:fill-slate-100" />
              <nav className="hidden md:flex space-x-1">
                {NAVIGATION_CONFIG.map((item) => (
                  <Link
                    key={item.id}
                    to={item.route}
                    activeOptions={{ exact: item.route === "" }}
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                    activeProps={{
                      className:
                        "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <BreadCrumb />
              <LightDarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto md:pr-96">
        <Outlet />
      </main>

      {/* Claude Chat Widget */}
      <ClaudeChatIntegration />
    </div>
  );
}
