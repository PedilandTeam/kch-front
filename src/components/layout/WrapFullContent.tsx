interface WrapFullContentProps {
  children: React.ReactNode;
}

export const WrapFullContent = ({ children }: WrapFullContentProps) => {
  return <main className="_full-content flex h-full flex-col">{children}</main>;
};
