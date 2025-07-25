import React from "react";
import {
  FaGlobe,
  FaMusic,
  FaFilm,
  FaFutbol,
  FaLaptopCode,
  FaTshirt,
} from "react-icons/fa";

const categories = [
  { name: "All", icon: FaGlobe, color: "#4caf50" },
  { name: "Music", icon: FaMusic, color: "#e91e63" },
  { name: "Movies", icon: FaFilm, color: "#3f51b5" },
  { name: "Sports", icon: FaFutbol, color: "#ff9800" },
  { name: "Tech", icon: FaLaptopCode, color: "#009688" },
  { name: "Fashion", icon: FaTshirt, color: "#9c27b0" },
];

export default function Categories() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", width: "100%" }}>
      {categories.map((cat, index) => {
        const Icon = cat.icon;
        return (
          <div key={cat.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.8rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.querySelector("svg").style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.querySelector("svg").style.transform = "scale(1)";
              }}
            >
              <Icon
                style={{
                  color: cat.color,
                  fontSize: "1.2rem",
                  transition: "transform 0.3s ease",
                }}
              />
              <span>{cat.name}</span>
            </div>

            {/* Thin line except after last */}
            {index < categories.length - 1 && (
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#ddd",
                  width: "100%",
                  margin: "4px 0",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
