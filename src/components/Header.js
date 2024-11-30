import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header bg-light d-flex align-items-center justify-content-between px-4 py-2">
      {/* Logo and Store Name */}
      <div className="d-flex align-items-center">
        <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
          <img src="/logo.png" alt="CST Store" className="me-2 logo" />
          <h5 className="mb-0 me-3">CST Store</h5>
        </Link>
        {/* Cart */}
        <Link to="/cart" className="d-flex align-items-center text-decoration-none text-secondary">
          <i className="bi bi-cart-fill me-1" aria-label="Cart"></i>
          <span style={{marginRight: "20px"}}>Cart</span>
        </Link>
      </div>

      {/* Search */}
      <div className="d-flex align-items-center flex-grow-1 justify-content-center search-container">
        <input
          type="text"
          placeholder="Search products"
          className="form-control search-input"
          onChange={handleSearchChange}
        />
        <button
          className="btn btn-outline-success ms-2 search-button"
          onClick={() => onSearch(document.querySelector(".search-input").value)}
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
