import type { Metadata } from "next";

export const baseSiteMetadata: Metadata = {
  title: "کوچا | جامعه ایرانیان مهاجر",
  description: "پلتفرم مجازی برای ایرانیان مهاجر در سراسر دنیا",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONT_URL ?? "https://koocha.com",
  ),
  alternates: {
    canonical: "/",
  },
};
