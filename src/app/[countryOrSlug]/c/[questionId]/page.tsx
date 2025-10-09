import { QuestionDetails } from "@components/index";

type PageProps = {
  params: Promise<{
    countryOrSlug: string;
    questionId: string;
    topicId: string;
    limit: number;
    page: number;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { countryOrSlug, questionId } = await params;

  return <QuestionDetails params={{ questionId, countryOrSlug }} />;
}
