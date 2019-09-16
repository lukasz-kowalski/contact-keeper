import { Contact } from "../ts/contact/interface";
import { Alert } from "../ts/alert/interface";

export const GET_CONTACTS = "GET_CONTACTS";
export const CLEAR_CONTACTS = "CLEAR_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const CONTACT_ERROR = "CONTACT_ERROR";
export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const FILTER_CONTACTS = "FILTER_CONTACTS";
export const SET_LOADING = "SET_LOADING";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

interface GetContacts {
  type: typeof GET_CONTACTS;
  payload: Contact[];
}

interface AddContact {
  type: typeof ADD_CONTACT;
  payload: Contact;
}

interface DeleteContact {
  type: typeof DELETE_CONTACT;
  payload: string;
}

interface ContactError {
  type: typeof CONTACT_ERROR;
  payload: string;
}

interface SetCurrent {
  type: typeof SET_CURRENT;
  payload: Contact;
}

interface ClearCurrent {
  type: typeof CLEAR_CURRENT;
}

interface UpdateContact {
  type: typeof UPDATE_CONTACT;
  payload: Contact;
}

interface FilterContacts {
  type: typeof FILTER_CONTACTS;
  payload: string;
}

interface ClearFilter {
  type: typeof CLEAR_FILTER;
}

interface SetLoading {
  type: typeof SET_LOADING;
}

interface ClearContacts {
  type: typeof CLEAR_CONTACTS;
}

export type ContactsActions =
  | GetContacts
  | AddContact
  | DeleteContact
  | ContactError
  | SetCurrent
  | ClearCurrent
  | UpdateContact
  | FilterContacts
  | ClearFilter
  | ClearContacts
  | SetLoading;

type Token = string;

interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: { token: Token };
}

interface RegisterFail {
  type: typeof REGISTER_FAIL;
  payload: string;
}

interface LoginUser {
  type: typeof LOGIN_SUCCESS;
  payload: { token: Token };
}

interface LoginFail {
  type: typeof LOGIN_FAIL;
  payload: string;
}

interface LogoutUser {
  type: typeof LOGOUT;
  payload: null;
}

interface LoadUser {
  type: typeof USER_LOADED;
  payload: any;
}

interface AuthError {
  type: typeof AUTH_ERROR;
  payload: string;
}

interface ClearErrors {
  type: typeof CLEAR_ERRORS;
}

export type AuthActions =
  | RegisterSuccess
  | RegisterFail
  | LoginUser
  | LoginFail
  | LogoutUser
  | LoadUser
  | AuthError
  | ClearErrors;

interface SetAlert {
  type: typeof SET_ALERT;
  payload: Alert;
}

interface RemoveAlert {
  type: typeof REMOVE_ALERT;
  payload: string;
}

export type AlertActions = SetAlert | RemoveAlert;
