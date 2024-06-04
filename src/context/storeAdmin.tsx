"use client"
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode, useEffect } from "react";

type Admin = {
  admintoken: string | undefined | any;
};

type Ip = {
  iptoken: string | undefined | any; // Corrected ip token type
};

interface AdminContextProps {
  admin: Admin | null;
  setAdmin: Dispatch<SetStateAction<Admin | null>>;
  ip: Ip | null; // Corrected ip type
  setIp: Dispatch<SetStateAction<Ip | null>>; // Corrected ip setter type
  mutate: () => Promise<void>;
  handleAdminSignOut: () => Promise<void>;
}

const AdminContext = createContext<AdminContextProps>({
  admin: null,
  setAdmin: () => null,
  ip: null,
  setIp: () => null,
  mutate: async () => {},
  handleAdminSignOut: async () => {}
});

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const [ip, setIp] = useState<Ip | null>(null);

  const [loading, setLoading] = useState(true);

  const mutate = async () => {
    try {
      const response = await fetch('/api/getIp');
      if (response.ok) {
        const data = await response.json();
        setAdmin({ admintoken: data.result });
        setIp({ iptoken: data.ip });
        localStorage.setItem("admin", JSON.stringify({ admintoken: data.result }));
        localStorage.setItem("ip", JSON.stringify({ iptoken: data.ip }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    try {
      setAdmin(null);
      localStorage.removeItem("admin");
      localStorage.removeItem("ip");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(false); // Assuming loading should be false after initial setup
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{ admin, setAdmin, ip, setIp, mutate, handleAdminSignOut }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
