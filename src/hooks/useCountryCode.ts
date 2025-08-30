import { useHeader } from "@/store/useHeader";
import { Country } from "@/schemas/country";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const useCountryCode = (countries: Country[]) => {
  const params = useParams();

  const { countryCode: contryCodeInStore, isNotFound } = useHeader();

  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug || !countries.find((c) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "" : countryOrSlug;
    setCountryCode(
      isMainPage ? "un" : countryCodeFromParams || contryCodeInStore || "un",
    );
  }, [params, countries, contryCodeInStore]);

  const isMainPage =
    !contryCodeInStore && (countryCode == "un" || !countryCode);

  return { countryCode, isMainPage };
};

export default useCountryCode;
