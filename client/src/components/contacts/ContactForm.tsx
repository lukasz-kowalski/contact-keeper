import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const initialState = {
  name: "",
  email: "",
  phone: "",
  type: "personal"
};

const ContactForm: React.FC = () => {
  const [contact, setContact] = useState(initialState);

  const { name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, updateContact, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialState);
    }
  }, [current]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact(initialState);
  };

  const handleClear = () => clearCurrent();

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={handleChange}
      />{" "}
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={handleChange}
      />{" "}
      Professional
      <div>
        <button type="submit" className="btn btn-primary btn-block">
          {current ? "Update Contact" : "Add Contact"}
        </button>
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
