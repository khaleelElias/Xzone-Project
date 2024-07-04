"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from '@solana/web3.js';

export interface IApp {
  handlePay: Function;
}

export type PaymentResult = {
  success: boolean,
  signature: string,
  message: string
}

export const AppContext = createContext<IApp>({
  handlePay: (encodedTransaction: string): PaymentResult => { return {success: false, signature: '', message: 'no payment'}},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const handlePay = async (encodedTransaction: string): Promise<PaymentResult> => {

    if (!connection || !wallet.publicKey)
      return { success: false, signature: '', message: 'no wallet provided' };

    try {
      const transaction = web3.Transaction.from(Buffer.from(encodedTransaction, 'base64'))
      const signature = await wallet.sendTransaction(transaction, connection);
      return { success: true, signature, message: '' };
    }
    catch (error) {
      return { success: false, signature: '', message: 'failed to make transaction, please try again later' };
    }
  };

  return (
    <AppContext.Provider value={{ handlePay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
