'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserMainContextType {
  // pageTitle: string;
  // setPageTitle: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
}

const UserMainContext = createContext<UserMainContextType | undefined>(undefined);

export const UserMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // const [pageTitle , setPageTitle] = useState<string>('پنل مدیریت');

  const [theme , setTheme] = useState<string>('dark');
  const [openSideBar , setOpenSideBar] = useState<boolean>(false);

  return (
    <UserMainContext.Provider 
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
    </UserMainContext.Provider>
  );
};

export const useUserMainContext = () => {
  const context = useContext(UserMainContext);
  if (!context) {
    throw new Error('useUserMainContext must be used within a UserMainContextProvider');
  }
  return context;
};
