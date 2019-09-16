import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import { Contact } from "../../ts/contact/interface";

interface Props {
  contact: Contact;
}

const ContactItem: React.FC<Props> = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const upperCasedType = type[0].toUpperCase() + type.slice(1);

  const handleDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const handleEdit = () => setCurrent(contact);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {upperCasedType}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
