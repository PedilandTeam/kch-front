import CardsGroup from "./cards-group";
import ContactForm from "./form";
import PageHead from "./page-head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | تماس با ما",
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
