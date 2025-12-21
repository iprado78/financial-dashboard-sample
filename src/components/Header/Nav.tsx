import { Link, useMatchRoute, type LinkProps } from "@tanstack/react-router";
import {
  findPageByPath,
  isSubroute,
  PAGE_ROUTES,
} from "@/nav/NavigationConfig";
import { SvgIcon } from "@/components/SvgIcon/SvgIcon";
import {
  HOME_ICON_DEFINITION,
  TABLE_ICON_DEFINITION,
  CHART_ICON_DEFINITION,
} from "@/components/SvgIcon/iconDefinitions";

import { ReactNode } from "react";

type NavIcon = ({ className }: { className?: string }) => ReactNode;

const HomeIcon: NavIcon = ({ className }) => {
  return <SvgIcon className={className} definition={HOME_ICON_DEFINITION} />;
};

const TableIcon: NavIcon = ({ className }) => {
  return <SvgIcon className={className} definition={TABLE_ICON_DEFINITION} />;
};

const ChartIcon: NavIcon = ({ className }) => {
  return <SvgIcon className={className} definition={CHART_ICON_DEFINITION} />;
};

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

const SELECTED_CLASS =
  "flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200";
const NOT_SELECTED_CLASS =
  "flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

const BreadCrumbSlash = () => (
  <span className="text-gray-400 dark:text-gray-600">/</span>
);

interface RouteLinkProps {
  to: LinkProps["to"];
  className?: string;
  name: string;
  icon: NavIcon;
}

const RouteLink = (props: RouteLinkProps) => {
  return (
    <>
      <Link to={props.to} className={props.className}>
        <props.icon className="h-4 w-4" />
        <span className="hidden sm:inline">{props.name}</span>
      </Link>
    </>
  );
};

export function Nav() {
  const matchRoute = useMatchRoute();

  // Determine current path
  const currentPath = (() => {
    if (matchRoute({ to: "/", fuzzy: false })) return "/";
    // Try to match each page route
    for (const page of PAGE_ROUTES) {
      if (matchRoute({ to: page.route, fuzzy: true })) {
        // Check if we're on a subroute (depth 3)
        const segments = window.location.pathname.split("/").filter(Boolean);
        if (segments.length >= 2) {
          return window.location.pathname;
        }
        return page.route;
      }
    }
    return "/";
  })();

  const isOnHomePage = currentPath === "/";
  const isOnSubroute = isSubroute(currentPath);
  const currentPage = findPageByPath(currentPath);

  return (
    <nav className="flex items-center space-x-2">
      {/* Level 1: HOME - Show Home + Page Routes */}
      {isOnHomePage && (
        <>
          <RouteLink
            className={SELECTED_CLASS}
            name={"Home"}
            icon={HomeIcon}
            to={"/"}
          />
          <BreadCrumbSlash />
          {PAGE_ROUTES.map((route) => {
            const Icon = getIconForRoute(route.route);
            return (
              <RouteLink
                key={route.id}
                to={route.route}
                name={route.name}
                className={NOT_SELECTED_CLASS}
                icon={Icon}
              />
            );
          })}
        </>
      )}

      {/* Level 2: PAGE - Show Home / Pages (selected highlighted) */}
      {!isOnHomePage && !isOnSubroute && currentPage && (
        <>
          <RouteLink
            to="/"
            className={NOT_SELECTED_CLASS}
            name="Home"
            icon={HomeIcon}
          />
          <BreadCrumbSlash />

          {PAGE_ROUTES.map((route) => {
            const Icon = getIconForRoute(route.route);
            const isActive =
              currentPath === route.route ||
              currentPath.startsWith(route.route + "/");
            return (
              <RouteLink
                key={route.id}
                to={route.route}
                name={route.name}
                className={isActive ? SELECTED_CLASS : NOT_SELECTED_CLASS}
                icon={Icon}
              />
            );
          })}
        </>
      )}

      {/* Level 3: SUBROUTE - Show Home / Parent / Subroute */}
      {!isOnHomePage && isOnSubroute && currentPage && (
        <>
          <RouteLink
            to="/"
            className={NOT_SELECTED_CLASS}
            name="Home"
            icon={HomeIcon}
          />
          <BreadCrumbSlash />
          <RouteLink
            to={currentPage.route}
            className={NOT_SELECTED_CLASS}
            name={currentPage.name}
            icon={getIconForRoute(currentPage.route)}
          />
          <BreadCrumbSlash />
          <span className={SELECTED_CLASS}>
            {getLabelForRoute(currentPath)}
          </span>
        </>
      )}
    </nav>
  );
}
