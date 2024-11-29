import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header bg-light d-flex align-items-center justify-content-between px-4 py-2">
      {/* Logo and Store Name */}
      <div className="d-flex align-items-center">
        <img
          src="/logo.png"
          alt="CST Store"
          className="me-2"
          style={{ width: "60px", height: "60px" }}
        />
        <h5 className="mb-0 me-3">CST Store</h5>

        {/* Cart */}
        <Link
          to="/cart"
          className="d-flex align-items-center text-decoration-none text-secondary"
        >
          <i className="bi bi-cart-fill me-1" aria-label="Cart"></i>
          <span>Cart</span>
        </Link>
      </div>

      {/* Search */}
      <div className="d-flex align-items-center flex-grow-1 justify-content-center">
        <input
          type="text"
          placeholder="Search products"
          className="form-control"
          style={{ width: "1100px" }}
        />
        <button
          className="btn btn-outline-success ms-2"
          style={{ backgroundColor: "white", color: "green", borderColor: "green" }}
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
