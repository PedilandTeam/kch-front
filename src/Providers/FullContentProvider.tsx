export const FullContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <main className="flex flex-col h-full">{children}</main>;
};
