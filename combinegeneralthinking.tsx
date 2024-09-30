import React from "react";
import WalletConnectionProvider from "./WalletConnectionProvider";
import CandyMachineMint from "./CandyMachineMint";
import GoBoard from "./GoBoard";

const App: React.FC = () => {
  return (
    <WalletConnectionProvider>
      <div style={{ textAlign: "center" }}>
        <h1>Go Board Game on Solana</h1>
        <GoBoard />
        <CandyMachineMint />
      </div>
    </WalletConnectionProvider>
  );
};

export default App;
