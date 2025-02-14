"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        const data = await res.json();
        
        if (res.ok) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  // Function to manually update user state after login/logout
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
