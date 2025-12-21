import EngineersGateLogo from "@/assets/EngineersGateLogo";
import { Nav } from "@/components/Header/Nav";
import LightDarkModeToggle from "@/components/LightDarkModeToggle";
import { Link } from "@tanstack/react-router";
import {
  FLEX_BETWEEN_CLASS,
  PADDING_X_LARGE_CLASS,
  BORDER_BOTTOM_CLASS,
  SHADOW_SMALL_CLASS,
} from "@/styles/designSystem";

const HEADER_CLASS = `sticky top-0 z-50 bg-white dark:bg-slate-800 ${BORDER_BOTTOM_CLASS} ${SHADOW_SMALL_CLASS}`;

const CONTAINER_CLASS = `container mx-auto ${PADDING_X_LARGE_CLASS} py-3`;

const CONTENT_CLASS = FLEX_BETWEEN_CLASS;

const LOGO_LINK_CLASS = "flex-shrink-0";

const LOGO_CLASS =
  "fill-brand h-8 max-w-[150px] dark:fill-slate-100 hover:opacity-80 transition-opacity";

const TOGGLE_CONTAINER_CLASS = "flex items-center flex-shrink-0";

export function Header() {
  return (
    <header className={HEADER_CLASS}>
      <div className={CONTAINER_CLASS}>
        <div className={CONTENT_CLASS}>
          <Link to="/" className={LOGO_LINK_CLASS}>
            <EngineersGateLogo className={LOGO_CLASS} />
          </Link>

          <Nav />

          <div className={TOGGLE_CONTAINER_CLASS}>
            <LightDarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
