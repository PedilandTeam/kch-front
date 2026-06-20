import Link from "next/link";
import { WrapContainer } from "../layout/WrapContainer";
import Image from "next/image";

export const SurveyBanner = () => {
  return (
    <WrapContainer>
      <Link href="https://tally.so/r/WOZXlP" target="_blank">
        <Image
          src="/images/advertise/bnr-survey-01.webp"
          alt="Survey Avdertise Banner"
          className="rounded-lg"
          priority
          width={400}
          height={209}
        />
      </Link>
    </WrapContainer>
  );
};
