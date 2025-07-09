import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACT_ADDRESS = "0xb5411db47f78f71ed4ab07dab5af70b22db16290";
const ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setWalletAddress(accounts[0]);
    } else {
      alert("Please install MetaMask.");
    }
  };

  const mintToken = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.mint();
      await tx.wait();
      alert("✅ Token minted successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error while minting token.");
    }
  };

  return (
    <div className="container">
      <h1>💎 Monad dApp - Mint Test Token</h1>
      <p>Simple frontend to mint a token on Monad testnet.</p>
      <button onClick={connectWallet} className="btn connect">
        {walletAddress ? "✅ Wallet Connected" : "🔌 Connect Wallet"}
      </button>
      <button onClick={mintToken} className="btn mint" disabled={!walletAddress}>
        🪙 Mint Token
      </button>
    </div>
  );
}

export default App;
