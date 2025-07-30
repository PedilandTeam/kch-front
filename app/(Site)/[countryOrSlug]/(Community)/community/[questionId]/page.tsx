import { notFound } from "next/navigation";
import AnswerCard from "./answerCard";
import QuestionCard from "./questionCard";
import { CountryNamespace } from "@/types/country";

async function Page({
  params,
}: {
  params: { countryOrSlug: string; questionId: string };
}) {

  const countryList: [CountryNamespace.GET] = await fetch(
    `${process.env.API_URL}/countries?code=${params.countryOrSlug}`,
    {next: {
      revalidate: 1000 * 60 * 60 * 24,
      tags: ['country']
    }}
  )
    .then(async (res) => {
      return await res.json();
    })
    .catch((e) => {
      console.error(`Error in Get country in community`);
      throw new Error("Internal server error");
    });

  if (!countryList.length) {
    notFound();
  }

  return (
    <div className="flex  flex-col items-center justify-center px-4 mt-2">
      <QuestionCard params={params} />
      <div className="flex w-full flex-col lg:items-center items-end justify-center">
        <AnswerCard params={params} />
      </div>
    </div>
  );
}

export default Page;
