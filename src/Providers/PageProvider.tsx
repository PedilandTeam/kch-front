import { cn } from "@/lib/utils";

interface PageProviderProps {
  children: React.ReactNode;
  topBanner?: boolean;
}

export const PageProvider = ({ children, topBanner }: PageProviderProps) => {
  return (
    <main
      className={cn("flex h-full flex-col pt-3 pb-6", {
        "pt-0": topBanner,
      })}
    >
      {children}
    </main>
  );
};
