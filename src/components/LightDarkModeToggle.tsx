import {
  SystemTheme,
  useCurrentTheme,
  setCurrentTheme,
  setDarkMode,
} from "@/stores/DarkModeStore";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { ICON_SIZE_MEDIUM_CLASS } from "@/styles/designSystem";

const TOGGLE_CONTAINER_CLASS =
  "flex items-center space-x-3 border border-slate-300 dark:border-slate-600 px-3 py-2 rounded-[20px]";

const ICON_BUTTON_BASE_CLASS =
  "cursor-pointer transition-colors focus:outline-none";

const ICON_ACTIVE_CLASS = "text-primary";

const ICON_INACTIVE_CLASS =
  "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";

interface ThemeIconProps {
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
}

const ThemeIcon = ({
  icon: Icon,
  isActive,
  onClick,
  ariaLabel,
}: ThemeIconProps) => {
  const iconClass = isActive ? ICON_ACTIVE_CLASS : ICON_INACTIVE_CLASS;
  const combinedClass = `${ICON_SIZE_MEDIUM_CLASS} ${iconClass}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={ICON_BUTTON_BASE_CLASS}
      aria-label={ariaLabel}
    >
      <Icon className={combinedClass} />
    </button>
  );
};

export default function LightDarkModeToggle() {
  const currentTheme = useCurrentTheme();

  const handleOnClickSystem = () => {
    setCurrentTheme(SystemTheme.SYSTEM);
    setDarkMode(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const handleOnClickDark = () => {
    setCurrentTheme(SystemTheme.DARK);
    setDarkMode(true);
  };

  const handleOnClickLight = () => {
    setCurrentTheme(SystemTheme.LIGHT);
    setDarkMode(false);
  };

  return (
    <div className={TOGGLE_CONTAINER_CLASS}>
      <ThemeIcon
        icon={SunIcon}
        isActive={currentTheme === SystemTheme.LIGHT}
        onClick={handleOnClickLight}
        ariaLabel="Switch to light mode"
      />
      <ThemeIcon
        icon={MoonIcon}
        isActive={currentTheme === SystemTheme.DARK}
        onClick={handleOnClickDark}
        ariaLabel="Switch to dark mode"
      />
      <ThemeIcon
        icon={ComputerDesktopIcon}
        isActive={currentTheme === SystemTheme.SYSTEM}
        onClick={handleOnClickSystem}
        ariaLabel="Use system theme"
      />
    </div>
  );
}
