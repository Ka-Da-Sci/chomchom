import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { HeroUIProvider } from "./config/HeroUIProvider.tsx";
import "@/styles/globals.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ContextProvider from "./context/FileManagementContext.tsx";

const MemoizedContextProvider = React.memo(ContextProvider);


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <MemoizedContextProvider>
        <BrowserRouter>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </BrowserRouter>
      </MemoizedContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
