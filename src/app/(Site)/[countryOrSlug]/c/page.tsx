import { Country } from "@/types/country";
import { notFound } from "next/navigation";
import QuestionCard from "./components/questionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommunityHeader from "./components/communityHeader";

export default async function Page(_props: any) {
  const props = _props?.then ? await _props : _props;
  const params = props.params?.then ? await props.params : props.params;

  const countryList: Country[] = await fetch(
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

  let result;
  try {
    const url = `${process.env.API_URL}/forum/questions?limit=30&page=1&countryCode=${country.code}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    result = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="_community-page flex flex-col gap-3 pt-3">
      <CommunityHeader country={country} countryOrSlug={country.code} />

      <div>
        <div className="container">
          <div className="flex items-center gap-2">
            <Input placeholder="جستجو..." />
            <div>
              <Button>سوال بپرس</Button>
            </div>
          </div>
        </div>
      </div>

      <QuestionCard
        data={result.items}
        countryOrSlug={params.countryOrSlug}
        country={country}
      />
    </div>
  );
}
