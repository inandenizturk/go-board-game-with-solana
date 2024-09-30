import React, { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const PROGRAM_ID = new PublicKey("YourProgramIDHere");

const GoGame = () => {
  const wallet = useWallet();
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));
  
  const sendMove = async (row, col) => {
    if (!wallet.connected) return;

    // Prepare the transaction
    const instructionData = Buffer.from([row, col, 1]); // Example for player 1 move
    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: true }],
        programId: PROGRAM_ID,
        data: instructionData,
      })
    );
    
    // Send the transaction
    try {
      const signature = await wallet.sendTransaction(transaction, connection);
      console.log("Move sent with signature:", signature);
    } catch (error) {
      console.error("Error sending move:", error);
    }
  };

  return (
    <div>
      <WalletMultiButton />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)" }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => sendMove(rowIndex, colIndex)}
              style={{
                width: 50,
                height: 50,
                background: cell === 1 ? "black" : cell === 2 ? "white" : "gray",
              }}
            ></button>
          ))
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <WalletProvider>
      <WalletModalProvider>
        <GoGame />
      </WalletModalProvider>
    </WalletProvider>
  );
}
