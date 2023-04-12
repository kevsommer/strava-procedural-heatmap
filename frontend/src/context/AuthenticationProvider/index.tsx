import { createContext, useContext } from "react";

interface AuthContextType {
  authToken: string;
  setAuthToken: (token: string) => void;
  expiresAt: string;
  setExpiresAt: (expiresAt: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authToken: "",
  setAuthToken: () => {},
  expiresAt: "",
  setExpiresAt: () => {},
} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
