import React from "react";
import { Tag, TransactionType } from "../../types";

export const TransactionContext: React.Context<ContextValueType> =
  React.createContext<ContextValueType>({
    activeFilters: [],
    transactions: [],
    query: "",
    setQuery: () => {},
    setTransactions: () => {},
    setActiveFilters: () => {},
  });

function TransactionContextProvider({
  children,
  value,
}: TransactionContextProps) {
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

type ContextValueType = {
  activeFilters: Tag[];
  transactions: TransactionType[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Tag[]>>;
};

interface TransactionContextProps {
  children: React.ReactElement;
  value: ContextValueType;
}

export default TransactionContextProvider;
