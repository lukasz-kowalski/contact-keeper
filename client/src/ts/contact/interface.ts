export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

export interface ContactState {
  contacts: Contact[];
  current: Contact | null;
  filtered: Contact[] | null;
  loading: boolean;
  error: string | null;
}
