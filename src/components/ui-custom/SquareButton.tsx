import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { ElementType } from "react";
import Link from "next/link";

interface SquareButtonProps {
  children: React.ReactNode;
  link?: string;
  icon: string;
}

export const SquareButton = ({ children, icon, link }: SquareButtonProps) => {
  const iconsMap = Icons as unknown as Record<string, ElementType>;
  const IconComponent = iconsMap[icon] || iconsMap["FolderSimpleIcon"];

  return (
    <Button
      variant="outline"
      className={cn(
        "flex h-auto flex-col items-center justify-start gap-1.5 rounded-lg border-blue-100 bg-blue-50 p-3 text-blue-900 [&_svg]:size-7",
      )}
      asChild={link ? true : false}
    >
      {link ? (
        <Link href={link}>
          <IconComponent className="text-yellow-600/80" weight="duotone" />
          {children}
        </Link>
      ) : (
        <>
          <IconComponent className="text-yellow-600" weight="duotone" />
          {children}
        </>
      )}
    </Button>
  );
};
