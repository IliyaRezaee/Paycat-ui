import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GlobalContextProvider from "./contexts/GlobalContext";
import { Theme } from "./types";

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => document.body.setAttribute("data-bs-theme", theme), [theme]);

  return (
    <GlobalContextProvider value={{ theme, setTheme }}>
      <>
        <Navbar />
        <main className="container-fluid">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
          tenetur.
        </main>
      </>
    </GlobalContextProvider>
  );
}

export default App;
