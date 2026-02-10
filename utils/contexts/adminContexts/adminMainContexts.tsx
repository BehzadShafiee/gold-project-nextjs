/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdminMainContextInterface } from '@/utils/interfaces/admin-interfaces/AdminMainContext.interface';

const AdminMainContext = createContext<AdminMainContextInterface | undefined>(undefined);

export const AdminMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // const [pageTitle , setPageTitle] = useState<string>('پنل مدیریت');

  const [theme , setTheme] = useState<AdminMainContextInterface['theme']>('dark');
  const [adminData , setAdminData] = useState<AdminMainContextInterface['adminData']>('. . .');
  const [openSideBar , setOpenSideBar] = useState<AdminMainContextInterface['openSideBar']>(false);
  const [simpleToastData , setSimpleToastData] = useState<AdminMainContextInterface['simpleToastData']>({show: false, message: '' , status: '' });

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
