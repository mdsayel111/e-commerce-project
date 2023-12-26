"use client"

import { createContext } from "react";

export const GlobalContext = createContext();
const GlobalContextProvider = ({ children }) => {
  const value = {};
  return (
    <div>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
