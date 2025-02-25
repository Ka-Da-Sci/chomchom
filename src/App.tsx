import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home/Index";
import "./styles/globals.css";
import { useEffect, useContext } from "react";
import { miscContext } from "./config/context";

/* eslint-disable no-console */
const App = () => {
  const context = useContext(miscContext);

  useEffect(() => {
    if (context) {
      const { readDatabaseItems, state } = context;
      readDatabaseItems().then(() => console.log(state.items));
    }
  }, []);

  return (
    <Routes>
      <Route element={<HomePage />} path={"/"} />
    </Routes>
  );
};

export default App;
