import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home/Index";
import './styles/globals.css'
import _firebaseApp from "./lib/firebase.config";
import { getAnalytics } from "firebase/analytics";

const firebaseApp = _firebaseApp();
export const analytics = getAnalytics(firebaseApp);

const App =() => {
  return (
    <Routes>
      <Route element={<HomePage />} path={"/"}/>
    </Routes>
  );
}

export default App;
