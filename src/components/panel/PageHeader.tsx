import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { ElementType } from "react";

type PhosphorIconName = keyof typeof Icons;

interface PageHeaderProps {
  icon: PhosphorIconName;
  title: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ icon, title, children }: PageHeaderProps) => {
  const iconsMap = Icons as unknown as Record<PhosphorIconName, ElementType>;
  const IconComponent = iconsMap[icon] || iconsMap["FolderSimpleIcon"];

  return (
    <header className="space-y-1">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-lg font-semibold text-blue-900">
          <IconComponent
            weight="duotone"
            className="text-yellow-600/80"
            size={28}
          />
          {title}
        </h1>
        <Link href="/panel/adsclub">
          <MoveLeftIcon />
        </Link>
      </div>
      {children && (
        <h2 className="text-muted-foreground text-sm">{children}</h2>
      )}
    </header>
  );
};
