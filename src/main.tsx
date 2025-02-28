import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "./config/provider.tsx";
import "@/styles/globals.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ContextProvider from "./context/FileManagementContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContextProvider>
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </ContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
