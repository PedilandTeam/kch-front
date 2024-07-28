import { CountryNamespace } from "@/types/country";
import QuestionCard from "./questionCard";
import { notFound } from "next/navigation";
import { QuestionNamespace } from "@/types/questions";

export default async function Page({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  const countryList: CountryNamespace.GET[] = await fetch(
    `${process.env.API_URL}/countries?code=${params.countryOrSlug}`,
    {
      credentials: "include",
    }
  )
    .then(async (res) => {
      return await res.json();
    })
    .catch((e) => {
      console.error(`Error in Get country in community`);
      throw new Error("Internal server error");
    });

  if (countryList.length === 0) {
    notFound();
  }

  const country = countryList[0];
console.log("ccc",country);

  const serverQuestion: QuestionNamespace.GET[] = await fetch(
    `${process.env.API_URL}/forum/questions?limit=7&page=1`,
    { credentials: "include" }
  )
    .then(async (res) => {
      return await res.json();
    })
    .catch((e) => {
      console.error(`Error in Get question in community`);
      throw new Error("Internal server error");
    });
 

  //   try {
  //     const url = `https://api.koochaa.com/forum/questions?limit=30&page=1`;
  //     const response = await fetch(url, {
  //       credentials: "include",
  //     });
  //     const result = await response.json();
  //     setQuestion(result.items);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // // get Q
  // useEffect(() => {
  //   fetchQuestion();
  // }, []);
  // console.log("Q:", question);

  return (
    <div className="_community-mainPage h-auto flex flex-col items-center">
      <div className="flex w-full items-center flex-col mt-3 px-4 gap-4">
        <QuestionCard countryOrSlug={params.countryOrSlug} country={country} />
      </div>
    </div>
  );
}
