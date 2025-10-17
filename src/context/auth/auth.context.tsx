import { createContext } from "react";
import type { IFaculty } from "../../@types/interface/faculty.interface";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: IFaculty | null;
  isLoading: boolean;
  onLogin: ({ token, user }: { token: string; user: IFaculty }) => void;
  onLogout: () => void;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export default authContext;
