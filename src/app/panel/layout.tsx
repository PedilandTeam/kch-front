export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex min-h-full flex-col">{children}</main>;
}
