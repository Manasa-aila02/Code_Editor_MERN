
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${BaseUrl}userRoutes/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data);
      } catch (error) {
        console.error("User fetch failed", error);
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

export default UserProvider;
