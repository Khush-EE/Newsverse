import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ParamContext from "./contexts/ParamContext";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState(null);
  const [lang, setLang] = useState("en");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);

  return (
    <ParamContext.Provider value={{ category, setCategory, lang, setLang, search, setSearch , country, setCountry}}>
      <Navbar />
      <Outlet />
    </ParamContext.Provider>
  );
}

export default App;
