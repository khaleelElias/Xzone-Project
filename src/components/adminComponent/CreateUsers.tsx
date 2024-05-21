import React, { useState } from "react";
import { GET } from "@/services/api"; // Adjust the import path as needed

const CreateUser: React.FC = () => {
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

          // Send the public key to your backend to create a new user account
          await createUserAccount(response.publicKey.toString());
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

  const createUserAccount = async (publicKey: string) => {
    console.log("Sending public key to backend to create account:", publicKey);
    try {
      const response = await fetch("http://localhost:5005/user/register", {
        // Adjust the URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: publicKey }),
      });

      const text = await response.text(); // Log the raw response text
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

export default CreateUser;
