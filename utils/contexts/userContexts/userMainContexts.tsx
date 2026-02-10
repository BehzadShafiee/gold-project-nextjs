/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CustomerMainContextInterface } from '@/utils/interfaces/customer-interfaces/CustomerMainContext.interface';

const UserMainContext = createContext<CustomerMainContextInterface | undefined>(undefined);

export const UserMainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [theme , setTheme] = useState<CustomerMainContextInterface['theme']>('dark');
  const [userData , setUserData] = useState<CustomerMainContextInterface['userData']>('. . .');
  const [openSideBar , setOpenSideBar] = useState<CustomerMainContextInterface['openSideBar']>(false);
  const [simpleToastData , setSimpleToastData] = useState<CustomerMainContextInterface['simpleToastData']>({show: false, message: '' , status: '' });

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
