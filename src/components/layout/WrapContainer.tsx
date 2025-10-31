interface WrapContainerProps {
  children: React.ReactNode;
}

export const WrapContainer = ({ children }: WrapContainerProps) => {
  return <div className="px-3">{children}</div>;
};
