import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import { ReadingProvider } from "./context/ReadingContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ReadingProvider>
        <AppRouter />
      </ReadingProvider>
    </AuthProvider>
  </React.StrictMode>
);