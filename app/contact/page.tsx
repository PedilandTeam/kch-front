import CardsGroup from "./cards-group";
import ContactForm from "./form";
import PageHead from "./page-head";

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
