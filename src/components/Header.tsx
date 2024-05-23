import React, { useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import ConnectToWallet from "./ConnectToWallet";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { POST } from "@/services/api";
import axios from "axios";
import bs58 from "bs58";
import { API_URL, SIGN_MESSAGE } from "@/config";
import { Link } from "react-router-dom";

interface RegisterReq {
  walletaddress: string;
}

const Header: React.FC = () => {
  const { publicKey: solanaAddress, signMessage } = useSolanaWallet();

  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleRegister = async (solanaAddress: string) => {
      const res = await axios.post(`${API_URL}/user/register`, {
        walletAddress: solanaAddress,
      });
      if (res.status === 201) {
        const nonce = res.data;
        const message = `${SIGN_MESSAGE} : ${nonce}`;
        const sign = await signMessage!(new TextEncoder().encode(message));
        const tokens = await axios
          .patch(`${API_URL}/user/login`, {
            walletAddress: solanaAddress,
            signature: bs58.encode(
              new Uint8Array(sign as unknown as ArrayBuffer)
            ),
          })
          .then((r) => r.data);
        console.log(tokens.accessToken);
        console.log(tokens.refreshToken);
      }
    };

    if (solanaAddress) handleRegister(solanaAddress.toBase58());
  }, [solanaAddress]);

  return (
    <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <img
            className="w-16 p-2 cursor-pointer"
            src="./images/logo.png"
            alt="Company logo"
          />
        </div>
        <div
          className={`nav-links duration-500 md:static absolute bg-white dark:bg-gray-800 text-gray-800 dark:text-white md:text-black focus:ring-4  md:min-h-fit min-h-[60vh] left-0 ${isOpen ? "top-[9%]" : "top-[-100%]"} md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link className="hover:text-gray-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/pixslip">
                Betting
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/">
                How it works
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/admin_panel">
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <WalletMultiButton />
          <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
            Sign in
          </button>
          {isOpen ? (
            <IoMdClose
              className="text-3xl cursor-pointer md:hidden text-white"
              onClick={onToggleMenu}
            />
          ) : (
            <IoMdMenu
              className="text-3xl cursor-pointer md:hidden text-white"
              onClick={onToggleMenu}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
