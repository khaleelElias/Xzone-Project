import { WalletContextState } from "@solana/wallet-adapter-react";
import { depositSol } from "./scripts";

export const deposit = async (
  wallet: WalletContextState,
  amount: number,
  setLoading: (data: boolean) => void
) => {
  if (!wallet.publicKey) return;
  setLoading(true);

  const tx = await depositSol(wallet, amount);
  console.log(tx);
  const depositTransaction = tx!.toString("base64");
  setLoading(false);
  return depositTransaction;
};
