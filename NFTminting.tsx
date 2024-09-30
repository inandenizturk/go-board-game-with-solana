import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { createUmi, Umi } from "@metaplex-foundation/umi";
import { mintFromCandyMachine, CandyMachine } from "@metaplex-foundation/umi/candy-machine";
import { Connection, PublicKey } from "@solana/web3.js";

const CandyMachineMint = () => {
  const wallet = useWallet();
  const [umiInstance, setUmiInstance] = useState<Umi | null>(null);
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null);

  useEffect(() => {
    if (wallet.connected) {
      const connection = new Connection("https://api.devnet.solana.com");
      const umi = createUmi(connection, wallet); // Initialize UMI
      setUmiInstance(umi);

      const candyMachineId = new PublicKey("Your_CandyMachine_PublicKey");
      const loadCandyMachine = async () => {
        const candyMachine = await umi.candyMachine(candyMachineId);
        setCandyMachine(candyMachine);
      };
      loadCandyMachine();
    }
  }, [wallet]);

  const mintGoStone = async () => {
    if (!umiInstance || !candyMachine) return;
    try {
      const mintResult = await mintFromCandyMachine(umiInstance, candyMachine.publicKey);
      console.log("Mint successful:", mintResult);
    } catch (error) {
      console.error("Minting error:", error);
    }
  };

  return (
    <div>
      <WalletMultiButton />
      <button onClick={mintGoStone} disabled={!wallet.connected || !candyMachine}>
        Mint Go Stone
      </button>
    </div>
  );
};

export default CandyMachineMint;
