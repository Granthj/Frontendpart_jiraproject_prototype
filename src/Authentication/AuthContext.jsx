import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    customerId: null
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const checkUser = async()=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-login`, {
                method: "GET",
                credentials: "include"
            });
            if(response.ok){
                const data = await response.json();
                setUser({
                    email: data.email,
                    customerId: data.customerId
                });
            }
        }
        catch(err){
            console.log("Error checking login status:", err);
        }
        finally{
            setLoading(false);
        }
      }
      checkUser();
  }, []);
  const logout = async () => {
    try {
      // Optional: call backend logout to clear cookie
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    // Clear local user state
    setUser({ email: null, customerId: null });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
