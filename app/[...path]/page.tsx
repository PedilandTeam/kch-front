import { usePathSeparator } from "@/hooks/usePathSeparator";
import Country from "./country";
import PagesList from "./list/list";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import PageItem from "./item/item";
import {notFound} from "next/navigation"

export default async function CenterPage({ params }: { params: { path: string[] } }) {

  const countries: CountryNamespace.GET[] = await (await API_ROUTES.COUNTRIES.GET_ALL("default", 20)).json()
  const paths = usePathSeparator(params.path);
  
  
  
  const isCountryExist = countries.find(country => country.code == paths.countryOrSlug)
  if (isCountryExist && !paths.unit) {
    //show country
    return <Country />;
  } else if (isCountryExist && paths.unit) {
    // show list of pages
    return <PagesList/>
  }

  //show single page
  try{
    const pageData = await (await API_ROUTES.PAGES.GET_ALL(1, 1, paths.countryOrSlug, "default", 5)).json()
    if(!pageData?.items){
      notFound()
    }
    return <PageItem pageData={pageData.items} />;
  }catch(e){
    notFound()
  }
}
