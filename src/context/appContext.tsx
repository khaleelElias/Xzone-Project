"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from '@solana/web3.js';

export interface IApp {
  handlePay: Function;
}

type PaymentResult = {
  success: boolean,
  signature: string,
  message: string
}

export const AppContext = createContext<IApp>({
  handlePay: (amount: number) => { },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const handlePay = async (amount: number): Promise<PaymentResult> => {

    if (!connection || !wallet.publicKey)
      return { success: false, signature: '', message: 'no wallet provided' };
    
    const transaction = new web3.Transaction();
    const instruction = web3.SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      lamports: amount * web3.LAMPORTS_PER_SOL,
      toPubkey: '',
    });

    transaction.add(instruction);

    try {
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
