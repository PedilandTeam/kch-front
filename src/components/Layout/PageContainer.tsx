import { cn } from "@/lib/utils";

interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const PageContainer = ({ className, children }: PageContainerProps) => {
  return (
    <div className={cn("flex flex-col gap-3 py-3", className)}>{children}</div>
  );
};
