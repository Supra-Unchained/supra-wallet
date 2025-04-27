import { useState } from "react";

export default function QuickBalances() {
  const [showSynuDetails, setShowSynuDetails] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "12px" }}>
      <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>Quick Balances</h3>
      <div
        style={{ marginBottom: "12px", cursor: "pointer", userSelect: "none", fontWeight: "500" }}
        onClick={() => setShowSynuDetails(!showSynuDetails)}
      >
        <span style={{ display: "inline-block", transform: showSynuDetails ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          ▶
        </span>{" "}
        SynU: {2750 + 1500 + 750}
        {showSynuDetails && (
          <div style={{ marginTop: "4px" }}>
            SynU (ETH): 2,750<br />
            SynU (SOL): 1,500<br />
            SynU (BTC): 750
          </div>
        )}
      </div>
      <div>
        ETH: 1.25<br />
        BTC: 0.5<br />
        SOL: 20
      </div>
    </div>
  );
}