import { ReactNode } from "react";

interface RouteLayoutWrapperProps {
  children: ReactNode;
}

export const RouteLayoutWrapper = ({ children }: RouteLayoutWrapperProps) => {
  return <div className="px-6 w-full">{children}</div>;
};
