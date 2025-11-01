import { cn } from "@/lib/utils";

interface WrapPageSimpleProps {
  className?: string;
  children: React.ReactNode;
}

export const WrapPageSimple = ({
  children,
  className,
}: WrapPageSimpleProps) => {
  return (
    <main
      className={cn("_page-simple flex flex-col gap-4 pt-4 pb-20", className)}
    >
      {children}
    </main>
  );
};
