
import QuestionCard from "./questionCard";

export default async function Page({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  1;
  return (
    <div className="h-auto flex flex-col items-center">
      <div className="flex flex-col mt-[5rem] px-4 gap-4">
        <QuestionCard params={params} />
        <QuestionCard params={params} />
        <QuestionCard params={params} />
      </div>
    </div>
  );
}
