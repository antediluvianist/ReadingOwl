import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import { ReadingProvider } from "./context/ReadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReadingProvider>
      <AppRouter />
    </ReadingProvider>
  </React.StrictMode>
);