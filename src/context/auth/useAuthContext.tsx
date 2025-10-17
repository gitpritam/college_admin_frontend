import { useContext } from "react";
import authContext from "./auth.context";

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
