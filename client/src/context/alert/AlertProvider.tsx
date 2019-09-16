import React, { useReducer, useCallback } from "react";
import uuid from "uuid";
import AlertContext from "./AlertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT, AlertActions } from "../actionTypes";
import { AlertState } from "../../ts/alert/interface";

interface Props {
  children: React.ReactNode;
}

const AlertProvider: React.FC<Props> = ({ children }) => {
  const initialState: AlertState = [];

  const [state, dispatch] = useReducer<React.Reducer<AlertState, AlertActions>>(
    alertReducer,
    initialState
  );

  const setAlert = useCallback(
    (msg: string, type: string, timeout: number = 5000) => {
      const id = uuid.v4();
      dispatch({ type: SET_ALERT, payload: { msg, type, id } });

      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    },
    []
  );

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
