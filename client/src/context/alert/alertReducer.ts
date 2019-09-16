import { SET_ALERT, REMOVE_ALERT, AlertActions } from "../actionTypes";
import { AlertState } from "../../ts/alert/interface";

const alertReducer = (state: AlertState, action: AlertActions) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
