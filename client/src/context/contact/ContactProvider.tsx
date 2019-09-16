import React, { useReducer, useCallback } from "react";
import axios from "axios";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_LOADING,
  ContactsActions
} from "../actionTypes";
import { ContactState, Contact } from "../../ts/contact/interface";

interface Props {
  children: React.ReactNode;
}

const ContactProvider: React.FC<Props> = ({ children }) => {
  const initialState: ContactState = {
    contacts: [],
    current: null,
    filtered: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer<
    React.Reducer<ContactState, ContactsActions>
  >(contactReducer, initialState);

  const getContacts = useCallback(async () => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get("/api/contacts");

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.errors[0].msg
      });
    }
  }, []);

  const addContact = async (contact: Contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const updateContact = async (contact: Contact) => {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const setCurrent = (contact: Contact) =>
    dispatch({ type: SET_CURRENT, payload: contact });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const filterContacts = (text: string) =>
    dispatch({ type: FILTER_CONTACTS, payload: text });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
