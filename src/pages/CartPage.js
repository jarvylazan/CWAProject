import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalPrice = cartItems
    .reduce(
      (acc, item) =>
        acc +
        item.price * (1 - item.discountPercentage / 100) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-details">
                    <h5>{item.title}</h5>
                    <p>
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        $
                        {(
                          item.price *
                          (1 - item.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <s className="original-price">${item.price.toFixed(2)}</s>
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-btns">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shared-btn remove-btn"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/product/${item.id}`}
                        className="shared-btn view-product-btn"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: ${totalPrice}</h3>
          </>
        )}
      </div>

      {/* Pass cartItems and totalPrice as props to Checkout */}
      {cartItems.length > 0 && (
        <Checkout cartItems={cartItems} totalPrice={totalPrice} />
      )}
    </div>
  );
};

export default CartPage;
