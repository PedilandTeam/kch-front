import { WrapAppMenu } from "@/components/layout/WrapAppMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: LayoutProps) {
  return <WrapAppMenu>{children}</WrapAppMenu>;
}
