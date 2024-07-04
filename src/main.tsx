import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import { SolanaWalletProvider } from "./context/solanaContext";
import { AppProvider } from "./context/appContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer 
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
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
