interface ContainerProviderProps {
  children: React.ReactNode;
}

export const ContainerProvider = ({ children }: ContainerProviderProps) => {
  return <div className="mx-3">{children}</div>;
};
