import { useEffect, useState } from "react";
import authContext from "./auth.context";
import type { IFaculty } from "../../@types/interface/faculty.interface";
import api from "../../config/axios.config";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IFaculty | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //api call kore user er data ta ante pari
    const fetchMe = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/auth/me");
        console.log(response.data);
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = ({ token, user }: { token: string; user: IFaculty }) => {
    if (token) {
      setIsAuthenticated(true);
    }
    if (user) {
      setUser(user);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        onLogin: login,
        onLogout: logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
