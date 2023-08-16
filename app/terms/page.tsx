import PageHead from "./page-head";
import TermsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | قوانین و مقررات استفاده از سایت",
};
const TermsPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
      <TermsText />
    </div>
  );
};

export default TermsPage;
