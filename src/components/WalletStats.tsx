import React from "react";

interface WalletStatsProps {
  darkMode: boolean;
  walletActive: boolean;
}

const WalletStats: React.FC<WalletStatsProps> = ({ darkMode, walletActive }) => {
  const totalSynU = 2750 + 1500 + 750;

  const walletStyle = {
    padding: "6px 12px",
    border: `1px solid ${darkMode ? "#c084fc" : "#7c3aed"}`,
    borderRadius: "8px",
    fontSize: "13px",
    color: darkMode ? "#c084fc" : "#7c3aed",
  };

  const toggleStyle = {
    padding: "6px 12px",
    border: "1px solid #888",
    borderRadius: "8px",
    background: "transparent",
    fontSize: "14px",
    cursor: "pointer",
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0xABC...123");
    alert("Wallet address copied!");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {walletActive ? (
        <>
          <div style={{ textAlign: "right", lineHeight: "1.2" }}>
            <div style={{ fontSize: "14px" }}>Total SynU:</div>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>{totalSynU.toLocaleString()}</div>
            <div style={{ fontSize: "13px", color: darkMode ? "#c084fc" : "#7c3aed" }}>Staked: 2,000</div>
          </div>
          <div
            onClick={copyAddress}
            title="Click to copy"
            style={{ ...walletStyle, cursor: "pointer" }}
          >
            0xABC...123
          </div>
        </>
      ) : (
        <div style={{ fontSize: "14px", color: darkMode ? "#aaa" : "#555" }}>
          Wallet inactive
        </div>
      )}
      <button style={toggleStyle}>{darkMode ? "☀️" : "🌙"}</button>
    </div>
  );
};

export default WalletStats;