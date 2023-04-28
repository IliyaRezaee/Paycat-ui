import { useState, useEffect } from "react";
import TransactionComponent from "../Transaction";
import { Tag, TransactionType } from "../../types";
import TransactionListSearchBar from "./TransactionListSearchBar";
import TransactionContextProvider from "./TransactionListContext";
import AddTransaction from "./AddTransaction";
import useLocalStorage from "../../hooks/useLocalStorage";

const { initialValue, setLocalStorage } = useLocalStorage();

function TransactionList() {
  const [activeFilters, setActiveFilters] = useState<Tag[]>([]);
  const [transactions, setTransactions] =
    useState<TransactionType[]>(initialValue);
  const [query, setQuery] = useState<string>("");

  // TODO: send unpredicted texts to the server

  useEffect(() => {
    setLocalStorage(transactions);
  }, [transactions]);

  const filteredTransactions =
    activeFilters.length > 0 || query.length > 0
      ? transactions
          .filter((t: TransactionType) =>
            activeFilters.length > 0 ? activeFilters.includes(t.tag) : true
          )
          .filter((t: TransactionType) =>
            t.text.length > 0 ? t.text.includes(query) : true
          )
      : transactions;

  const addTag = (tag: Tag) =>
    !activeFilters.includes(tag as Tag) &&
    setActiveFilters((current) => [...current, tag]);

  return (
    <TransactionContextProvider
      value={{
        activeFilters,
        setActiveFilters,
        transactions,
        setTransactions,
        query,
        setQuery,
      }}
    >
      <>
        <TransactionListSearchBar />
        <div className="d-flex flex-column gap-2 mt-5">
          {filteredTransactions.map((t: TransactionType, i: number) => (
            <TransactionComponent
              key={i}
              text={t.text}
              date={t.date}
              price={t.price}
              tag={t.tag}
              tagOnClick={() => addTag(t.tag)}
            />
          ))}
        </div>
        <AddTransaction />
      </>
    </TransactionContextProvider>
  );
}

export default TransactionList;
