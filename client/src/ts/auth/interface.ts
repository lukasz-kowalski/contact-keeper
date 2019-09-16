export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: null;
  loading: boolean;
  error: string | null;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
}
