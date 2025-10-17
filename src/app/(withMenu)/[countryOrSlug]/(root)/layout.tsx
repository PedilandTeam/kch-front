import { AppMenuProvider } from "@/providers/AppMenuProvider";

interface CountryOrSlugLayoutProps {
  children: React.ReactNode;
}

export default function CountryOrSlugLayout({
  children,
}: CountryOrSlugLayoutProps) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
