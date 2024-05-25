import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import { SolanaWalletProvider } from "./context/solanaContext";
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SolanaWalletProvider>
        <AuthProvider>
          <AppProvider>
            <Header />
            <App />
          </AppProvider>
        </AuthProvider>
      </SolanaWalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
