import React from "react";

const Banner = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
      <img
        src="/images/monitor.jpg.jpg"
        alt="Tech Monitor"
        style={{
          position: "relative",
          width: "100vw", // Force full viewport width
          height: "400px",
          overflow: "hidden",

          // fallback background
        }}
      />

      {/* Text on top of image */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "1rem 2rem",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: "0" }}>BLOG</h1>
        <p style={{ fontSize: "1.2rem", margin: "0.5rem 0 0" }}>Code for Interview</p>
      </div>
    </div>
  );
};

export default Banner;
