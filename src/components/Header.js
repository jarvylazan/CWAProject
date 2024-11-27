import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        CST Store
      </Link>
      <nav>
        <Link to="/cart">Cart</Link>
      </nav>
      <input type="text" placeholder="Search products" />
      <button>Search</button>
    </header>
  );
};

export default Header;
