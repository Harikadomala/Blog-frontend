// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/home">HOME</Link>
      <Link to="/blogs">BLOGS</Link>
      <Link to="/contact">CONTACT</Link>
      <Link to="/logout">LOGOUT</Link>
    </nav>
  );
}
