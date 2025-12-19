import EngineersGateLogo from "@/assets/EngineersGateLogo";
import LightDarkModeToggle from "@/components/LightDarkModeToggle";
import { Link, useMatches, useMatchRoute } from "@tanstack/react-router";

// Icon components matching EmptyState icons
const HomeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const TableIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const ChartIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const getIconForRoute = (pathname: string) => {
  if (pathname === "/") return HomeIcon;
  if (pathname.startsWith("/tableOverview")) return TableIcon;
  if (pathname.startsWith("/candleSticks")) return ChartIcon;
  return HomeIcon;
};

const getLabelForRoute = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/tableOverview")) return "Tables";
  if (pathname.startsWith("/candleSticks")) return "Charts";
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : "Home";
};

const CHILD_ROUTES = [
  { route: "/tableOverview", label: "Tables", icon: TableIcon },
  { route: "/candleSticks", label: "Charts", icon: ChartIcon },
];

export default function Header() {
  const matches = useMatches();
  const matchRoute = useMatchRoute();
  const isHome = matchRoute({ to: "/", fuzzy: false });

  // Build breadcrumbs from route matches
  const breadcrumbs = matches
    .map((match) => {
      const pathname = match.pathname || "/";
      const Icon = getIconForRoute(pathname);
      const label = getLabelForRoute(pathname);
      return {
        label,
        href: pathname,
        Icon,
      };
    })
    .filter(
      (crumb, index, self) =>
        // Remove duplicates
        index === 0 || crumb.href !== self[index - 1].href
    );

  const currentPath = breadcrumbs[breadcrumbs.length - 1]?.href;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0">
            <EngineersGateLogo className="fill-[#00458a] h-8 max-w-[150px] dark:fill-slate-100 hover:opacity-80 transition-opacity" />
          </Link>

          {/* Center: Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2">
            {breadcrumbs.map(({ label, href, Icon }, i) => {
              const isActive = href === currentPath;
              return (
                <div key={href} className="flex items-center space-x-2">
                  <Link
                    to={href}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline capitalize">{label}</span>
                  </Link>
                  {i + 1 < breadcrumbs.length && (
                    <span className="text-gray-400 dark:text-gray-600">/</span>
                  )}
                </div>
              );
            })}

            {/* Show child route navigation when on home */}
            {isHome && (
              <>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                {CHILD_ROUTES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.route}
                      to={item.route}
                      className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title={item.label}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* Right: Theme Toggle */}
          <div className="flex items-center flex-shrink-0">
            <LightDarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
