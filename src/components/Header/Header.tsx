import EngineersGateLogo from "@/assets/EngineersGateLogo";
import { Nav } from "@/components/Header/Nav/Nav";
import LightDarkModeToggle from "@/components/LightDarkModeToggle";
import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <EngineersGateLogo className="fill-[#00458a] h-8 max-w-[150px] dark:fill-slate-100 hover:opacity-80 transition-opacity" />
          </Link>

          <Nav />

          <div className="flex items-center flex-shrink-0">
            <LightDarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
