'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminMainContextType {
  // pageTitle: string;
  // setPageTitle: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
}

const AdminMainContext = createContext<AdminMainContextType | undefined>(undefined);

export const AdminMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // const [pageTitle , setPageTitle] = useState<string>('پنل مدیریت');

  const [theme , setTheme] = useState<string>('dark');
  const [openSideBar , setOpenSideBar] = useState<boolean>(false);

  return (
    <AdminMainContext.Provider 
        value={{
                // pageTitle,
                // setPageTitle 

                theme,
                setTheme,
                openSideBar,
                setOpenSideBar
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
