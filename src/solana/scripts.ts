import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { GLOBAL_STATE_SEED, VAULT_SEED, PROGRAM_ID } from "./constants";
import { GlobalState } from "./types";
import { IDL as GameIDL } from "./betting";

const solConnection = new anchor.web3.Connection(
  "https://devnet.helius-rpc.com/?api-key=03269516-f324-4b7f-93d6-d47901d2a522"
);

const programId = new anchor.web3.PublicKey(PROGRAM_ID);

const cloneWindow: any = window;
const provider = new anchor.AnchorProvider(
  solConnection,
  cloneWindow["solana"],
  anchor.AnchorProvider.defaultOptions()
);

const program = new anchor.Program(GameIDL as anchor.Idl, programId, provider);

export const depositSol = async (
  wallet: WalletContextState,
  amount: number
) => {
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  try {
    const [globalState] = PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_STATE_SEED)],
      program.programId
    );
    const [vault] = PublicKey.findProgramAddressSync(
      [Buffer.from(VAULT_SEED)],
      program.programId
    );

    const tx = new anchor.web3.Transaction();

    const txId = await program.methods
      .depositSol(new anchor.BN(amount))
      .accounts({
        owner: userAddress,
        globalState,
        vault,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    tx.add(txId);

    tx.feePayer = userAddress;
    tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;

    if (wallet.signTransaction) {
      const txData = await wallet.signTransaction(tx);
      return txData.serialize({ requireAllSignatures: false });
    }
  } catch (e) {
    console.error(e);
  }
};

export const withdrawSol = async (
  wallet: WalletContextState,
  amount: number
) => {
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  const [globalState] = PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_STATE_SEED)],
    program.programId
  );
  const [vault] = PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );

  const tx = new anchor.web3.Transaction();

  const txId = await program.methods
    .withdrawPool(new anchor.BN(amount))
    .accounts({
      owner: userAddress,
      to: userAddress,
      globalState,
      vault,
      systemProgram: SystemProgram.programId,
    })
    .transaction();

  tx.add(txId);

  tx.feePayer = userAddress;
  tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;

  if (wallet.signTransaction) {
    const txData = await wallet.signTransaction(tx);
    return txData.serialize({ requireAllSignatures: false });
  }
};

export const getGlobalState = async (): Promise<GlobalState | null> => {
  const [globalPool] = PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_STATE_SEED)],
    program.programId
  );
  try {
    let globalState = await program.account.globalPool.fetch(globalPool);
    return globalState as unknown as GlobalState;
  } catch {
    return null;
  }
};
