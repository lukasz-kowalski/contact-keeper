import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

const Home: React.FC = () => (
  <div className="grid-2">
    <div>
      <ContactForm />
    </div>
    <div>
      <ContactFilter />
      <Contacts />
    </div>
  </div>
);

export default Home;
