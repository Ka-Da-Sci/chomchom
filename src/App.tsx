import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/indexpage";
import './styles/globals.css'


function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={"/"}/>
    </Routes>
  );
}

export default App;
