import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter: React.FC = () => {
  const [value, setValue] = useState("");
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      setValue("");
    }
  }, [filtered]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    e.target.value ? filterContacts(e.target.value) : clearFilter();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Filter Contacs..."
        onChange={handleChange}
        value={value}
      />
    </form>
  );
};

export default ContactFilter;
