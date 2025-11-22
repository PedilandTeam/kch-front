import { cn } from "@/lib/utils";

interface WrapContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const WrapContainer = ({ children, className }: WrapContainerProps) => {
  return <div className={cn("px-4", className)}>{children}</div>;
};
