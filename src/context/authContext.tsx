import { ReactNode, createContext, useEffect } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import bs58 from "bs58";
import { API_URL, SIGN_MESSAGE } from "@/config";
import { PATCH, POST } from "@/services/api";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  connectWallet: () => void;
  walletConnected: () => boolean;
};

type RegisterVm = {
  nonce: string;
}

type AuthorizationVm = {
  accessToken: string;
  refreshToken: string;
}

const initialValue: IAuthContext = {
  connectWallet: async () => { },
  walletConnected: () => false
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {

  const { publicKey: solanaAddress, signMessage, connected, disconnect } = useSolanaWallet();
  const { setVisible } = useWalletModal();
  const walletConnected = () => {
    return connected;
  }

  useEffect(() => {
    if (solanaAddress)
      authenticate();
  }, [solanaAddress])

  const connectWallet = async () => {
    setVisible(true);
  }

  const authenticate = async () => {
    const res = await POST<RegisterVm>(`user/register`, {
      walletAddress: solanaAddress,
    });

    if(!res.success) {
      disconnect();
      return;
    }

    if (res.status === 201) {
      const nonce = res.data?.nonce;
      const message = `${SIGN_MESSAGE} : ${nonce}`;
      const sign = await signMessage!(new TextEncoder().encode(message));
      const tokensResponse = await PATCH("user/login", {
        walletAddress: solanaAddress?.toBase58(),
        signature: bs58.encode(
          new Uint8Array(sign as unknown as ArrayBuffer)
        ),
      })

      if(!tokensResponse.success) {
        disconnect();
        return;
      }
    }

  };

  return (
    <AuthContext.Provider value={{ connectWallet, walletConnected }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };