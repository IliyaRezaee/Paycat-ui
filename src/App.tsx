import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TransactionComponent from "./components/Transaction";
import TransactionList from "./components/TransactionList/TransactionList";
import GlobalContextProvider from "./contexts/GlobalContext";
import { Theme } from "./types";

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(
    () => document.querySelector("html")?.setAttribute("data-bs-theme", theme),
    [theme]
  );

  return (
    <GlobalContextProvider value={{ theme, setTheme }}>
      <>
        <Navbar />
        <main className="container-fluid">
          <TransactionList />
        </main>
      </>
    </GlobalContextProvider>
  );
}

export default App;
