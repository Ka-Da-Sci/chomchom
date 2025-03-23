import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { HeroUIProvider } from "./config/HeroUIProvider.tsx";
import "@/styles/globals.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ContextProvider from "./context/FileManagementContext.tsx";
import CommentsCOntextProvider from "./context/CommentsContext.tsx";

const MemoizedContextProvider = React.memo(ContextProvider);
const MemoizedCommentsCOntextProvider = React.memo(CommentsCOntextProvider);


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <MemoizedContextProvider>
        <MemoizedCommentsCOntextProvider>
          <BrowserRouter>
            <HeroUIProvider>
              <App />
            </HeroUIProvider>
          </BrowserRouter>
        </MemoizedCommentsCOntextProvider>
      </MemoizedContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
