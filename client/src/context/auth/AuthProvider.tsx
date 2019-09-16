import React, { useReducer, useCallback } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  AuthActions
} from "../actionTypes";
import { AuthState, FormData } from "../../ts/auth/interface";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthActions>>(
    authReducer,
    initialState
  );

  const registerUser = async (formData: FormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      localStorage.removeItem("token");
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors[0].msg
      });
    }
  };

  const loginUser = async (formData: FormData) => {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.errors[0].msg });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT, payload: null });
  };

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors[0].msg });
    }
  }, []);

  const clearErrors = useCallback(() => dispatch({ type: CLEAR_ERRORS }), []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loginUser,
        logoutUser,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
