import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("access_token");

    if (token && !user) {
      axios
        .get("/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              navigate("/auth/login");
            } else {
              console.error("API Error:", error.response.data);
            }
          } else {
            console.error("Unexpected Error:", error.message);
          }
        });
    } else if (!token && user) {
      setUser(null);
    }
  }, [user, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
