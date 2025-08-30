"use client";

import { Toaster } from "react-hot-toast";
import { SwrProvider } from "./SwrProvider";

export default function SiteProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SwrProvider>
      {children}

      <Toaster />
    </SwrProvider>
  );
}
