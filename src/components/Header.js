import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onSearch }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    // Function to fetch cart items count from localStorage
    const fetchCartItemsCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemsCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
    };

    // Initial fetch
    fetchCartItemsCount();

    // Listen for changes in localStorage and custom cartUpdated event
    const handleCartUpdate = () => {
      fetchCartItemsCount();
    };

    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    // Dynamically update the visibility of the cart superscript
    const hideCartItems = () => {
      const superscript = document.querySelector(".cart-superscript");
      const cartSpan = document.getElementById("cart-span");

      if (superscript && cartSpan) {
        if (cartItemsCount === 0) {
          superscript.style.display = "none";
          cartSpan.style.marginRight = "20px";
        } else {
          superscript.style.display = "flex";
          cartSpan.style.marginRight = "0";
        }
      }
    };

    hideCartItems();
  }, [cartItemsCount]);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleCartUpdateEvent = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <header className="header bg-light d-flex align-items-center justify-content-between px-4 py-2">
      {/* Logo and Store Name */}
      <div className="d-flex align-items-center">
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none text-dark"
          onClick={handleCartUpdateEvent}
        >
          <img src="/logo.png" alt="CST Store" className="me-2 logo" />
          <h5 className="mb-0 me-3">CST Store</h5>
        </Link>
        {/* Cart */}
        <Link
          to="/cart"
          className="d-flex align-items-center text-decoration-none text-secondary"
          onClick={handleCartUpdateEvent}
        >
          <i className="bi bi-cart-fill me-1" aria-label="Cart"></i>
          <span id="cart-span">Cart</span>
          <div>
            <sup className="cart-superscript">{cartItemsCount}</sup>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="d-flex align-items-center flex-grow-1 justify-content-center search-container">
        <input type="text" placeholder="Search products" className="form-control search-input" onChange={handleSearchChange} />
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
