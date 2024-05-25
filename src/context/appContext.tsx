"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { deposit } from "@/solana/action";

export interface IApp {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handlePay: Function;
}

export const AppContext = createContext<IApp>({
  loading: false,
  setLoading: () => {},
  handlePay: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();

  const [loading, setLoading] = useState<boolean>(false);

  const handlePay = async () => {
    await deposit(wallet, 1000000, setLoading);
  };

  return (
    <AppContext.Provider value={{ loading, setLoading, handlePay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
