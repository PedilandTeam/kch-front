import { AppMenuProvider } from "@/Providers/AppMenuProvider";

export default function CountryOrSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
