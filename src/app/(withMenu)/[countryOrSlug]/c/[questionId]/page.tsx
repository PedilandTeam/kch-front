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
  return (
    <>
      <p>hello</p>
      {/* <QuestionDetails params={{ questionId, countryOrSlug }} /> */}
    </>
  );
}
