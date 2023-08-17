import PageHead from "./page-head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | درباره ما",
  description: ""
};

const AboutPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
    </div>
  );
};

export default AboutPage;
