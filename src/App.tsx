import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home/Index";
import './styles/globals.css'
// import firebaseApp from "./lib/firebase.config";


const App =() => {
  return (
    <Routes>
      <Route element={<HomePage />} path={"/"}/>
    </Routes>
  );
}

export default App;
