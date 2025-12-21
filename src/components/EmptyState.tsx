import { SvgIcon } from "@/components/SvgIcon/SvgIcon";
import {
  CHART_ICON_DEFINITION,
  TABLE_ICON_DEFINITION,
  PLUS_ICON_DEFINITION,
} from "@/components/SvgIcon/iconDefinitions";

interface EmptyStateProps {
  icon: "chart" | "table";
  title: string;
  description: string;
  showAddButton?: boolean;
}

export default function EmptyState({
  icon,
  title,
  description,
  showAddButton = true,
}: EmptyStateProps) {
  const iconDefinition =
    icon === "chart" ? CHART_ICON_DEFINITION : TABLE_ICON_DEFINITION;

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <SvgIcon
            className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
            definition={iconDefinition}
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        {showAddButton && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <span>Click the</span>
            <div className="relative inline-flex items-center">
              <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
              <div className="relative w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white animate-pulse">
                <SvgIcon
                  className="h-4 w-4"
                  definition={PLUS_ICON_DEFINITION}
                />
              </div>
            </div>
            <span>button in the right panel to begin</span>
          </div>
        )}
      </div>
    </div>
  );
}
