import { AppMenuProvider } from "@/providers/AppMenuProvider";

export default function CountryOrSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
