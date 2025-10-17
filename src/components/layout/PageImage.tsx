import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";

interface PageImageProps {
  className?: string;
  country: Country;
  children: React.ReactNode;
}

export const PageImage = ({ children, className, country }: PageImageProps) => {
  const imageUrl = `/images/slide/home/${country.code}-m.webp`;

  return (
    <div
      className={cn("_page-simple relative pb-8", className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full flex-1 flex-col gap-8 pt-5">
        {children}
      </div>
    </div>
  );
};
