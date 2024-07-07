
import QuestionCard from "./questionCard";

export default async function Page({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  1;
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center ">
      <div className="mt-[9rem]">
        <QuestionCard params={params} />
        <QuestionCard params={params} />
        <QuestionCard params={params} />
      </div>
    </div>
  );
}
