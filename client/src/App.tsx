import React from "react";
import Routes from "./routing/Routes";
import ContactProvider from "./context/contact/ContactProvider";
import AuthProvider from "./context/auth/AuthProvider";
import AlertProvider from "./context/alert/AlertProvider";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <AlertProvider>
          <Routes />
        </AlertProvider>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
