import { cn } from "@/lib/utils";

interface PageSimpleProps {
  className?: string;
  children: React.ReactNode;
}

export const PageSimple = ({ children, className }: PageSimpleProps) => {
  return (
    <div
      className={cn("_page-simple flex flex-col gap-4 pt-4 pb-8", className)}
    >
      {children}
    </div>
  );
};
