interface WrapContainerProps {
  children: React.ReactNode;
}

export const WrapContainer = ({ children }: WrapContainerProps) => {
  return <div className="mx-3">{children}</div>;
};
