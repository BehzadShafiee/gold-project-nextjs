/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserMainContextType {
  // pageTitle: string;
  // setPageTitle: (value: string) => void;
  userData: string;
  setUserData: (value: string) => void;
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

const UserMainContext = createContext<UserMainContextType | undefined>(undefined);

export const UserMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // const [pageTitle , setPageTitle] = useState<string>('پنل مدیریت');

  const [theme , setTheme] = useState<string>('dark');
  const [userData , setUserData] = useState<string>('. . .');
  const [openSideBar , setOpenSideBar] = useState<boolean>(false);
  const [simpleToastData , setSimpleToastData] = useState({show: false, message: '' , status: '' });

  useEffect(() => {
      const savedTheme = localStorage.getItem("goldSavedUserTheme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
      const savedUser = localStorage.getItem("goldUserName");
      if (savedUser) {
        setUserData(savedUser);
      }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("goldSavedUserTheme", theme);
    localStorage.setItem("goldUserName", userData);
  }, [theme , userData]);

  return (
    <UserMainContext.Provider 
        value={{
                // pageTitle,
                // setPageTitle 

                theme,
                setTheme,
                userData,
                setUserData,
                openSideBar,
                setOpenSideBar,
                simpleToastData,
                setSimpleToastData
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
