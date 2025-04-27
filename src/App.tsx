import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState("");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Neon cursor state and effect (main and trailing echos)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // First trailing echo
  const [echo1Pos, setEcho1Pos] = useState({ x: 0, y: 0 });
  // Second trailing echo
  const [echo2Pos, setEcho2Pos] = useState({ x: 0, y: 0 });
  // Third trailing echo
  const [echo3Pos, setEcho3Pos] = useState({ x: 0, y: 0 });
  // Dashboard button active state
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // Trailing echo animation: three echo dots follow each other
  useEffect(() => {
    let frame: number;

    const animate = () => {
      setEcho1Pos(prev => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.25,
        y: prev.y + (cursorPos.y - prev.y) * 0.25,
      }));
      setEcho2Pos(prev => ({
        x: prev.x + (echo1Pos.x - prev.x) * 0.25,
        y: prev.y + (echo1Pos.y - prev.y) * 0.25,
      }));
      setEcho3Pos(prev => ({
        x: prev.x + (echo2Pos.x - prev.x) * 0.25,
        y: prev.y + (echo2Pos.y - prev.y) * 0.25,
      }));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cursorPos, echo1Pos, echo2Pos]);
  return (
    <div className="font-futura" style={{ cursor: "none" }}>
        <div className="min-h-screen bg-white text-black font-sans px-4 py-6">
          <div className="relative">
            <img
              src="/refresh.png"
              alt="Refresh"
              className="hover:scale-110 transition-transform duration-150"
              onClick={() => window.location.reload()}
              style={{
                cursor: "none",
                width: "var(--refresh-size, 41px)",
                height: "var(--refresh-size, 41px)",
                position: "absolute",
                top: "var(--refresh-top, 1px)",
                left: "var(--refresh-left, 325px)",
              }}
            />
            <img
              src="/settings.png"
              alt="Settings"
              className="hover:scale-110 transition-transform duration-150"
              style={{
                cursor: "none",
                width: "var(--settings-size, 39px)",
                height: "var(--settings-size, 39px)",
                position: "absolute",
                top: "var(--settings-top, 1px)",
                left: "var(--settings-left, 875px)",
              }}
            />
          </div>
        {/* Top Row: Left Icons + Wallet Address */}
        <div className="flex justify-between items-start mb-4">
        </div>

        <div className="absolute top-[67px] right-[403px] text-right">
          <div className="text-[21px] text-[#84888b] font-light">WALLET</div>
          <div style={{ transform: "translateX(var(--wallet-address-offset, 18px))" }}>
            <div
              className="text-xs border border-[#84888b] text-[#84888b] rounded-full font-mono font-light transform transition-transform duration-200 hover:scale-110"
              style={{
                cursor: "none",
                padding: "var(--wallet-padding, 3px 6px)",
              }}
              onClick={() => {
                navigator.clipboard.writeText("0xAbc123456789abcdefABC123456789abcdef1234");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Click to copy"
            >
              0xAbc...1234
            </div>
            <div
              className="absolute text-right text-[21px]"
              style={{
                right: "calc(50% - var(--supa-balance-offset-x, -113px))",
                marginTop: "var(--supa-balance-offset-top, 491px)",
                transform: "translate(var(--supa-balance-manual-x, 170px), var(--supa-balance-manual-y, -18px))",
                fontWeight: 200,
                letterSpacing: "-0.5px",
            fontSize: "var(--supa-balance-font-size, 21px)"
              }}
            >
              5,000
            </div>
          </div>
          {copied && (
            <div
              className="text-xs mt-1 absolute"
              style={{
                color: "#84888b",
                top: "calc(100% + 4px)",
                whiteSpace: "nowrap",
                left: "var(--copy-msg-x, 64%)",
                transform: "translateX(-50%)",
              }}
            >
              Full wallet address copied!
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/SUPRA whiteblueshadow txt.png"
            alt="SUPRA Logo"
            className="h-[64px] mb-1"
          />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mt-2 mb-0">
          <img
            src="/supra head cutout.png"
            alt="Supra AI"
            className="h-[360px] w-auto drop-shadow-xl ml-[2rem]"
          />
        </div>
        
        {/* SUPA Title */}
        <div className="flex justify-center items-center -mt-[3rem] mb-1 text-[32px] font-light tracking-tight">
          <img
            src="/S.png"
            alt="SUPA Symbol"
            style={{ width: "var(--supa-symbol-size, 33px)", height: "var(--supa-symbol-size, 33px)", marginRight: "7px", marginTop: "-20px", marginLeft: "-11px" }}
          />
          <span style={{ color: "black", marginTop: "-20px" }}>SUPA</span>
        </div>

        {/* Totals */}
        <div className="flex justify-center gap-[15rem] mt-[-1rem] text-center">
          <div>
            <div className="text-[21px] text-center uppercase text-gray-600 tracking-wide mb-1" style={{ fontWeight: 200, letterSpacing: "-0.5px" }}>Total</div>
          <div
            style={{
              transform: "translateX(var(--quick-total-x, 0px)) translateY(var(--quick-total-y, 0px))"
            }}
          >
              <div className="text-[32px] text-center" style={{ fontWeight: 200, letterSpacing: "-0.5px" }}>5,000</div>
            </div>
          </div>
          <div>
            <div className="text-[21px] text-center uppercase text-gray-600 tracking-wide mb-1" style={{ fontWeight: 200, letterSpacing: "-0.5px" }}>Staked</div>
            <div className="text-[32px] text-center" style={{ fontWeight: 200, letterSpacing: "-0.5px" }}>2,000</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-[73px] mt-[15px]">
          <div className="transition-transform transform hover:scale-110 duration-200">
            <img
              src={activeButton === "stake" ? "/stake button active.png" : "/stake button.png"}
              alt="Stake Button"
              className="w-[90px] h-[35px]"
              onClick={() => setActiveButton(activeButton === "stake" ? "" : "stake")}
              style={{
                cursor: "none",
                filter: activeButton === "stake" ? "drop-shadow(0 0 5px #73cfff)" : "none",
                transition: "transform 0.2s, filter 0.2s"
              }}
            />
          </div>
          <div className="transition-transform transform hover:scale-110 duration-200">
            <img
              src={activeButton === "swap" ? "/swap button active.png" : "/swap button.png"}
              alt="Swap Button"
              className="w-[90px] h-[35px]"
              onClick={() => setActiveButton(activeButton === "swap" ? "" : "swap")}
              style={{
                cursor: "none",
                filter: activeButton === "swap" ? "drop-shadow(0 0 5px #73cfff)" : "none",
                transition: "transform 0.2s, filter 0.2s"
              }}
            />
          </div>
          <div
            className="transition-transform transform hover:scale-110 duration-200"
            onClick={() => setActiveButton(activeButton === "chat" ? "" : "chat")}
          >
            <img
              src={activeButton === "chat" ? "/chat button active.png" : "/chat button.png"}
              alt="Chat Button"
              className="w-[90px] h-[35px]"
              style={{
                cursor: "none",
                filter: activeButton === "chat" ? "drop-shadow(0 0 5px #73cfff)" : "none",
                transition: "transform 0.2s, filter 0.2s"
              }}
            />
          </div>
        </div>

        {/* Tooltip */}
        <div
          className="flex justify-center mt-[-2px] relative"
          style={{
            transform: "translateX(var(--tooltip-offset-x, 170px))",
            opacity: activeButton === "chat" ? 1 : 0,
            visibility: activeButton === "chat" ? "visible" : "hidden",
            transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out"
          }}
        >
          <img src="/tooltip chat box.png" alt="Tooltip Box" className="w-[300px] h-auto" style={{ opacity: 0.75 }} />
          <div
            className="absolute top-[15px] w-full text-center text-xs px-4"
            style={{
              color: "#84888b",
              lineHeight: "1.1",
              whiteSpace: "pre-wrap",
              fontFamily: "'FuturaCyrillicLight', sans-serif",
              fontWeight: 300
            }}
          >
            How does voting on proposals
            <br />
            with my staked $SUPA work?
          </div>
        </div>

        {/* Quick Balances */}
        <div className="mt-[13px] text-center" style={{ color: "#84888b", transform: "translateX(var(--quick-balances-offset-x, 0px))" }}>
          <div
            className="text-base font-semibold mb-1"
            style={{
              fontWeight: 200,
              fontSize: "21px",
              letterSpacing: "-0.5px",
              marginLeft: "var(--quick-balances-title-margin-left, -333px)",
              marginTop: "var(--quick-balances-title-margin-top, -57px)"
            }}
          >
            QUICK BALANCES
          </div>
          <div className="mb-2" style={{ transform: "translate(var(--quick-supa-offset-x, -165px), var(--quick-supa-offset-y, 18px))", position: "relative", left: "var(--supa-expand-left, 0px)", top: "var(--supa-expand-top, 0px)" }}>
            <div
              className="inline-flex items-center hover:scale-110 transition-transform duration-200"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                cursor: "none",
                fontWeight: 200,
                fontSize: "26px",
                letterSpacing: "-0.5px",
                color: "black"
              }}
            >
              <img src="/S.png" alt="SUPA Symbol" className="w-[26px] h-[26px] mr-[9px]" style={{ cursor: "none" }} />
              SUPA
              <img
                src={isExpanded ? "/collapse.png" : "/expand.png"}
                alt="Toggle"
                className="w-[14px] h-[10px] ml-[8px]"
                style={{ cursor: "none" }}
              />
            </div>
          </div>
              {isExpanded && (
                <div className="text-sm font-light tracking-wide mt-1" style={{ transform: "translate(var(--sub-supa-offset-x, 0px), var(--sub-supa-offset-y, 21px))" }}>
              <div className="flex justify-start" style={{ gap: "260px", marginLeft: "441px", fontSize: "var(--supa-subtoken-font-size, 18px)" }}>
                <div className="text-left font-mono">
                  <span style={{ color: "black" }}>SUPA</span>{" "}
                  <span style={{ color: "#84888b" }}>(ETH)</span>
                </div>
                <div className="text-right font-mono" style={{ fontSize: "var(--supa-subtoken-font-size, 18px)" }}>2,750</div>
              </div>
              <div className="flex justify-start" style={{ gap: "259px", marginLeft: "441px", fontSize: "var(--supa-subtoken-font-size, 18px)" }}>
                <div className="text-left font-mono">
                  <span style={{ color: "black" }}>SUPA</span>{" "}
                  <span style={{ color: "#84888b" }}>(SOL)</span>
                </div>
                <div className="text-right font-mono" style={{ fontSize: "var(--supa-subtoken-font-size, 18px)" }}>1,500</div>
              </div>
              <div className="flex justify-start" style={{ gap: "278px", marginLeft: "441px", fontSize: "var(--supa-subtoken-font-size, 18px)" }}>
                <div className="text-left font-mono">
                  <span style={{ color: "black" }}>SUPA</span>{" "}
                  <span style={{ color: "#84888b" }}>(BTC)</span>
                </div>
                <div className="text-right font-mono" style={{ fontSize: "var(--supa-subtoken-font-size, 18px)" }}>750</div>
              </div>
            </div>
          )}
          <div className="text-sm mt-4 space-y-1 font-light tracking-wide" style={{ transform: "translate(var(--quick-assets-offset-x, 0px), var(--quick-assets-offset-y, 30px))" }}>
            {/* Divider between SUPA and ETH */}
            {(isExpanded || !isExpanded) && (
              <div
                className="w-[422px] h-[1px] bg-[#b0b3b5] opacity-50 mx-auto"
                style={{
                  marginTop: isExpanded ? "0px" : "-8px",
                  marginBottom: isExpanded ? "5px" : "5px",
                  transform: "translateX(var(--divider-offset-x, 23px))"
                }}
              ></div>
            )}
          <div className="flex justify-start" style={{ gap: "336px", marginLeft: "var(--eth-margin-left, 422px)", transform: "translateY(var(--eth-margin-top, 0px))", fontSize: "var(--asset-font-size, 26px)" }}>
              <div className="text-left font-mono" style={{ color: "black" }}>
                <span>
                  <img
                    src="/Eth logo black.png"
                    alt="ETH Logo"
                    style={{
                      width: "var(--eth-logo-size, 18px)",
                      height: "var(--eth-logo-size, 26px)",
                      marginRight: "-18px",
                      transform: "translate(var(--eth-logo-offset-x, -33px), var(--eth-logo-offset-y, 2px))",
                      display: "inline-block"
                    }}
                  />
                </span>
                ETH
              </div>
              <div className="text-right font-mono" style={{ fontSize: "var(--quick-asset-balance-font-size, 21px)", transform: "translateY(var(--sol-margin-top, 5px))", color: "black" }}>1.25</div>
            </div>
          {/* Divider between ETH and BTC */}
          <div
            className="w-[422px] h-[1px] bg-[#b0b3b5] opacity-50 mx-auto mt-[4px] mb-[-3px]"
            style={{
              transform: "translateX(var(--divider-offset-x, 23px))"
            }}
          ></div>
          <div className="flex justify-start" style={{ gap: "348px", marginLeft: "var(--btc-margin-left, 422px)", transform: "translateY(var(--btc-margin-top, 10px))", fontSize: "var(--asset-font-size, 26px)" }}>
              <div className="text-left font-mono" style={{ color: "black" }}>
                <span>
                  <img
                    src="/btc logo black.png"
                    alt="BTC Logo"
                    style={{
                      width: "var(--btc-logo-size, 27px)",
                      height: "var(--btc-logo-size, 27px)",
                      marginRight: "-27px",
                      transform: "translate(var(--btc-logo-offset-x, -39px), var(--btc-logo-offset-y, 2px))",
                      display: "inline-block"
                    }}
                  />
                </span>
                BTC
              </div>
              <div className="text-right font-mono" style={{ fontSize: "var(--quick-asset-balance-font-size, 21px)", transform: "translateY(var(--sol-margin-top, 5px))", color: "black" }}>0.5</div>
            </div>
          {/* Divider between BTC and SOL */}
          <div
            className="w-[422px] h-[1px] bg-[#b0b3b5] opacity-50 mx-auto mt-[15px] mb-[-13px]"
            style={{
              transform: "translateX(var(--divider-offset-x, 23px))"
            }}
          ></div>
          <div className="flex justify-start" style={{ gap: "349px", marginLeft: "var(--sol-margin-left, 423px)", transform: "translateY(var(--sol-margin-top, 20px))", fontSize: "var(--asset-font-size, 26px)" }}>
              <div className="text-left font-mono" style={{ color: "black" }}>
                <span>
                  <img
                    src="/Sol logo black.png"
                    alt="SOL Logo"
                    style={{
                      width: "var(--sol-logo-size, 26px)",
                      height: "var(--sol-logo-size, 26px)",
                      marginRight: "-27px",
                      transform: "translate(var(--sol-logo-offset-x, -39px), var(--sol-logo-offset-y, 2px))",
                      display: "inline-block"
                    }}
                  />
                </span>
                SOL
              </div>
              <div className="text-right font-mono" style={{ fontSize: "var(--quick-asset-balance-font-size, 21px)", transform: "translateY(var(--sol-margin-top, 5px))", color: "black" }}>20</div>
            </div>
          {/* Divider below SOL */}
          <div
            className="w-[422px] h-[1px] bg-[#b0b3b5] opacity-50 mx-auto mt-[27px] mb-[-6px]"
            style={{
              transform: "translateX(var(--divider-offset-x, 23px))"
            }}
          ></div>
          </div>
        </div>

        {/* Dashboard Button */}
        <div className="flex justify-center mt-5 pb-[20px]" style={{ transform: "translateY(var(--dashboard-button-offset-y, 64px))" }}>
          <img
            src="/dashboard.png"
            alt="Open Full Dashboard"
            className="hover:scale-110 transition-transform duration-200"
            onClick={() => setIsDashboardActive(!isDashboardActive)}
            style={{
              cursor: "none",
              width: "auto",
              height: "var(--dashboard-height, 47px)",
              filter: isDashboardActive ? "drop-shadow(0 0 5px #73cfff)" : "none",
              transition: "transform 0.2s, filter 0.2s"
            }}
          />
        </div>
        {activeButton === "chat" && (
          <div>
            <img
              src="/enter.png"
              alt="Enter"
              className="hover:scale-110 transition-transform duration-200"
              style={{
                cursor: "none",
                width: "21px",
                height: "auto",
                position: "absolute",
                top: "var(--enter-button-top, 562px)",
                left: "var(--enter-button-left, 913px)"
              }}
            />
          </div>
        )}
        {/* Neon Dot Cursor with Echo */}
        <>
          <div
            className="fixed pointer-events-none z-50"
            style={{
              top: cursorPos.y - 4 + "px",
              left: cursorPos.x - 4 + "px",
              width: "7px",
              height: "7px",
              borderRadius: "100%",
              backgroundColor: "#73cfff66",
              boxShadow: "0 0 5px #73cfffcc, 0 0 12px #73cfffaa, 0 0 18px #73cfff77",
              transform: "scale(1)",
              transition: "transform 0.2s ease-in-out"
            }}
          >
            <div
              style={{
                width: "3px",
                height: "3px",
                margin: "2px auto",
                backgroundColor: "#73cfff",
                borderRadius: "100%",
                opacity: 1
              }}
            ></div>
          </div>
          <div
            className="fixed pointer-events-none z-40"
            style={{
              top: echo1Pos.y - 4 + "px",
              left: echo1Pos.x - 4 + "px",
              width: "9px",
              height: "9px",
              borderRadius: "100%",
              backgroundColor: "#73cfff33",
              boxShadow: "0 0 6px #73cfff33",
              transform: "scale(1)",
              transition: "transform 0.18s ease-in-out"
            }}
          ></div>
          <div
            className="fixed pointer-events-none z-30"
            style={{
              top: echo2Pos.y - 4 + "px",
              left: echo2Pos.x - 4 + "px",
              width: "11px",
              height: "11px",
              borderRadius: "100%",
              backgroundColor: "#73cfff22",
              boxShadow: "0 0 4px #73cfff22",
              transform: "scale(1)",
              transition: "transform 0.14s linear"
            }}
          ></div>
          <div
            className="fixed pointer-events-none z-20"
            style={{
              top: echo3Pos.y - 4 + "px",
              left: echo3Pos.x - 4 + "px",
              width: "13px",
              height: "13px",
              borderRadius: "100%",
              backgroundColor: "#73cfff11",
              boxShadow: "0 0 3px #73cfff11",
              transform: "scale(1)",
              transition: "transform 0.14s linear"
            }}
          ></div>
        </>
      </div>
    </div>
  );
};

export default App;
