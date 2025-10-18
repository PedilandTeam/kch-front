import { AppMenuProvider } from "@/_providers/AppMenuProvider";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
