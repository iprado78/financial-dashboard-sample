import { ReactNode } from "react";

interface RouteLayoutWrapperProps {
  children: ReactNode;
}

export const RouteLayoutWrapper = ({ children }: RouteLayoutWrapperProps) => {
  return <div className="w-full">{children}</div>;
};
