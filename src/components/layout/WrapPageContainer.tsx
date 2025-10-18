import { cn } from "@/lib/utils";

interface WrapPageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const WrapPageContainer = ({
  className,
  children,
}: WrapPageContainerProps) => {
  return (
    <main className={cn("_page-container flex flex-col gap-3 py-3", className)}>
      {children}
    </main>
  );
};
