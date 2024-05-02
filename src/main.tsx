import "@/assets/css/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  import.meta.env.PROD ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App></App>
  )
);
