import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import { SolanaWalletProvider } from "./context/solanaContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SolanaWalletProvider>
        <AuthProvider>
          <Header />
          <App />
        </AuthProvider>
      </SolanaWalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
