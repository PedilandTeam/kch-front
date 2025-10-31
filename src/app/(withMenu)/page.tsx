import {
  HomeCountries,
  HomeSeo,
  HomeSlider,
  WrapContainer,
  WrapPageSimple,
} from "@components";

export const metadata = {
  title: "جامعه ایرانیان مهاجر",
};

export default function Page() {
  return (
    <WrapContainer>
      <WrapPageSimple className="_home-page">
        <HomeSlider />

        <HomeCountries />

        <HomeSeo />
      </WrapPageSimple>
    </WrapContainer>
  );
}
