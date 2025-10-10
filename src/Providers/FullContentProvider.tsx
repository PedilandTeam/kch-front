interface FullContentProviderProps {
  children: React.ReactNode;
}

export const FullContentProvider = ({ children }: FullContentProviderProps) => {
  return <main className="flex h-full flex-col">{children}</main>;
};
