import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "../context/auth/AuthContext";
import Navbar from "../components/layout/Navbar";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Register from "../components/pages/auth/Register";
import Login from "../components/pages/auth/Login";
import Alerts from "../components/layout/Alerts";

const Routes: React.FC = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
