import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log("Admin data:", result.data);
    } catch (error) {
      setAdminData(null);
      console.log("Error fetching admin:", error);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      console.log("AdminContext URL:", serverUrl);
      getAdmin();
    }
  }, [serverUrl]);

  const value = { adminData, setAdminData, getAdmin };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
