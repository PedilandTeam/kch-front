import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | فرصت‌های شغلی",
  description: "",
  alternates: {
    canonical: `/jobs`,
  },
};

const Jobs = () => {
  return (
    <div className="page-wrap static">
      {/* <PageHead />
      <JobsText /> */}
    </div>
  );
};

export default Jobs;
