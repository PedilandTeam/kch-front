import Link from "next/link";
import { WrapContainer } from "../layout/WrapContainer";
import Image from "next/image";

export const AdsClubBanner = () => {
  return (
    <WrapContainer>
      <Link href="/adsclub">
        <Image
          src="/images/advertise/bnr-adsclub-01.webp"
          alt="Ads Club Avdertise Banner"
          className="rounded-lg"
          width={400}
          height={209}
        />
      </Link>
    </WrapContainer>
  );
};
