import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/ContactContext";
import { Contact } from "../../ts/contact/interface";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts: React.FC = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, loading, getContacts } = contactContext;

  const contactsToRender = filtered ? filtered : contacts;

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  if (!loading && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <>
      {contacts.length > 0 && !loading ? (
        <TransitionGroup>
          {contactsToRender.map((contact: Contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Contacts;
