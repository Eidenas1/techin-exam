import  { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./contexts";
const API_URL = import.meta.env.VITE_API_URL;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
      console.log("Fetched user:", response.data.user);
      setUser(response.data);
    } catch {
      setUser("1");
    }
  };
  fetchUser();
}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};