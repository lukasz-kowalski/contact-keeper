import React, { useState, useContext, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import AlertContext from "../../../context/alert/AlertContext";
import AuthContext from "../../../context/auth/AuthContext";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);

  const { error, isAuthenticated, loginUser, clearErrors } = authContext;

  useEffect(() => {
    if (error === "Invalid credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
