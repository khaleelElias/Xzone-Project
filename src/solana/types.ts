import { PublicKey } from "@solana/web3.js";

export interface GlobalState {
  owner: PublicKey;
  vault: PublicKey;
}
