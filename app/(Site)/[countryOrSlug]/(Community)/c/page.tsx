import { CountryNamespace } from "@/types/country";
import { notFound } from "next/navigation";
import QuestionCard from "./components/questionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  const countryList: CountryNamespace.GET[] = await fetch(
    `${process.env.API_URL}/countries?code=${params.countryOrSlug}`,
    {
      credentials: "include",
    },
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
    <div className="_community-mainPage flex flex-col gap-2 px-3">
      <div className="flex items-center gap-2">
        <Input placeholder="جستجو..." />
        <div>
          <Button>سوال بپرس</Button>
        </div>
      </div>

      <QuestionCard countryOrSlug={params.countryOrSlug} country={country} />
    </div>
  );
}
