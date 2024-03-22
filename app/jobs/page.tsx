import PageHead from "./page-head";
import JobsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | فرصت‌های شغلی",
  description: "",
  alternates: {
    canonical: `/jobs`,
  },
};

const Jobs = () => {
  return (
    <div className="static page-wrap">
      <PageHead />
      <JobsText />
    </div>
  );
};

export default Jobs;
