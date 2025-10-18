// src/app/(Site)/[countryOrSlug]/c/[questionId]/layout.tsx

import { FullContentProvider } from "@/_providers/index";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FullContentProvider>{children}</FullContentProvider>;
}
