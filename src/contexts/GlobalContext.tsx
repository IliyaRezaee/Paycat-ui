import React from "react";
import { Theme } from "../types";

export const GlobalContext: React.Context<ContextValueType> =
  React.createContext<ContextValueType>({
    theme: "light",
    setTheme: (theme: Theme) => {},
  });

function GlobalContextProvider({ children, value }: GlobalContextProps) {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

type ContextValueType = { theme: Theme; setTheme: (theme: Theme) => void };

interface GlobalContextProps {
  children: React.ReactElement;
  value: ContextValueType;
}

export default GlobalContextProvider;
