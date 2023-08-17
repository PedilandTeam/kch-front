import CardsGroup from "./cards-group";
import ContactForm from "./form";
import PageHead from "./page-head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | تماس با ما",
  description:
    "به کوچا، جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری تامین کنید. در این صفحه می توانید راه های ارتباطی و لینک صفحات رسمی کوچا در رسانه های اجتماعی را پیدا کنید.",
};

const ContactPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />

      <CardsGroup />

      <ContactForm />
    </div>
  );
};

export default ContactPage;
