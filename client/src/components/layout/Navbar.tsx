import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

interface Props {
  title?: string;
  icon?: string;
}

const Navbar: React.FC<Props> = ({
  title = "Contact Keeper",
  icon = "fas fa-id-card-alt"
}) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const handleLogout = (): void => {
    logoutUser();
    clearContacts();
  };

  const authLinks: React.ReactNode = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <button onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </button>
      </li>
    </>
  );

  const guestLinks: React.ReactNode = (
    <>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} />
          {title}
        </Link>
      </h1>
      <ul>
        {isAuthenticated && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

export default Navbar;
