import React, { useState, useEffect } from "react";

const ConnectToWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const connectWallet = async () => {
    console.log("Attempting to connect to Phantom Wallet");
    if ("solana" in window) {
      const provider = (window as any).solana;

      if (provider.isPhantom) {
        try {
          const response = await provider.connect();
          console.log("Connected to wallet:", response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());

          // Check if the user already exists
          await checkUserExists(response.publicKey.toString());
        } catch (err) {
          console.error("Failed to connect to wallet:", err);
          setMessage("Failed to connect to wallet. Please try again.");
        }
      } else {
        alert("Please install Phantom Wallet");
      }
    } else {
      alert("Phantom Wallet not found");
    }
  };

  const checkUserExists = async (publicKey: string) => {
    try {
      const response = await fetch(`http://localhost:5005/user/${publicKey}`, {
        method: "GET",
      });

      if (response.ok) {
        const userExists = await response.json();
        if (userExists) {
          console.log("User exists:", publicKey);
          setMessage("Welcome back!");
        } else {
          console.log("User does not exist. Creating account...");
          await createUserAccount(publicKey);
        }
      } else {
        console.error("Failed to check user existence");
        setMessage("Error checking user existence. Please try again.");
      }
    } catch (err) {
      console.error("Error checking user existence:", err);
      setMessage("Error checking user existence. Please try again.");
    }
  };

  const createUserAccount = async (publicKey: string) => {
    console.log("Sending public key to backend to create account:", publicKey);
    try {
      const response = await fetch("http://localhost:5005/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: publicKey }),
      });

      const text = await response.text();
      console.log("Raw response text:", text);

      if (response.ok) {
        console.log("Account creation response:", text);
        setMessage("Account successfully created!");
      } else {
        console.error("Error creating account:", text);
        setMessage("Error creating account. Please try again.");
      }
    } catch (err) {
      console.error("Error creating account:", err);
      setMessage("Error creating account. Please try again.");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      connectWallet();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
      {walletAddress && (
        <p className="mt-4 text-green-500">Wallet Address: {walletAddress}</p>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ConnectToWallet;
