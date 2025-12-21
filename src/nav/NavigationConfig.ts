export const PAGE_ROUTES = [
  {
    id: "c3d4e5f6-7a8b-9c0d-1e2f-3g4h5i6j7k8l",
    name: "Tables",
    route: "/tableOverview",
  },
  {
    id: "b1c8f3d2-4c5e-4a6b-9f0e-7d8f9a0b1c2d",
    name: "Charts",
    route: "/candleSticks",
  },
] as const;

export type PageRoute = typeof PAGE_ROUTES[number];

export function findPageByPath(path: string): PageRoute | null {
  return PAGE_ROUTES.find((page) => path.startsWith(page.route)) || null;
}

export function isSubroute(path: string): boolean {
  const segments = path.split("/").filter(Boolean);
  return segments.length >= 2;
}
