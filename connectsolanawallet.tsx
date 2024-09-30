import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Connection, PublicKey } from "@solana/web3.js";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const SolanaGame = () => {
    const wallet = useWallet();
    const connection = new Connection("https://api.mainnet-beta.solana.com");

    const connectWallet = async () => {
        if (wallet.connected) {
            console.log("Wallet connected:", wallet.publicKey?.toBase58());
        } else {
            console.log("Wallet not connected.");
        }
    };

    return (
        <div>
            <WalletMultiButton />
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
    );
};

export default SolanaGame;
