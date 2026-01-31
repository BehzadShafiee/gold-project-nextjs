/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminMainContextType {
  // pageTitle: string;
  // setPageTitle: (value: string) => void;
  adminData: string;
  setAdminData: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
  simpleToastData: SimpleToastData;
  setSimpleToastData: (value : SimpleToastData) => void;
}

interface SimpleToastData {
  show: boolean;
  message : string ,
  status : string 
}

const AdminMainContext = createContext<AdminMainContextType | undefined>(undefined);

export const AdminMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // const [pageTitle , setPageTitle] = useState<string>('پنل مدیریت');

  const [theme , setTheme] = useState<string>('dark');
  const [adminData , setAdminData] = useState<string>('. . .');
  const [openSideBar , setOpenSideBar] = useState<boolean>(false);
  const [simpleToastData , setSimpleToastData] = useState({show: false, message: '' , status: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem("goldSavedAdminTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const savedAdmin = localStorage.getItem("goldAdminName");
    if (savedAdmin) {
      setAdminData(savedAdmin);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goldSavedAdminTheme", theme);
    localStorage.setItem("goldAdminName", adminData);
  }, [theme , adminData]);

  return (
    <AdminMainContext.Provider 
        value={{
                // pageTitle,
                // setPageTitle 

                theme,
                setTheme,
                adminData,
                setAdminData,
                openSideBar,
                setOpenSideBar,
                simpleToastData,
                setSimpleToastData
              }}
    >
      {children}
    </AdminMainContext.Provider>
  );
};

export const useAdminMainContext = () => {
  const context = useContext(AdminMainContext);
  if (!context) {
    throw new Error('useAdminMainContext must be used within a AdminMainContextProvider');
  }
  return context;
};
