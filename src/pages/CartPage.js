import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";
import PaymentForm from "../components/PaymentForm";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch and set cart items from localStorage
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const adjustQuantity = (id, delta) => {
    updateCart(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
    ));
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const calculatePrice = (item) => (
    (item.price * (1 - item.discountPercentage / 100) * (item.quantity || 1)).toFixed(2)
  );

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(calculatePrice(item)), 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        {cartItems.length ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-details">
                    <h5>{item.title}</h5>
                    <p><span style={{ color: "red", fontWeight: "bold" }}>${calculatePrice(item)}</span>
                    <s className="original-price">${item.price.toFixed(2)}</s></p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => adjustQuantity(item.id, -1)} className="quantity-btn bg-secondary">-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => adjustQuantity(item.id, 1)} className="quantity-btn bg-secondary">+</button>
                    </div>
                    <div className="item-btns">
                    <button onClick={() => removeItem(item.id)} className="shared-btn remove-btn">Remove</button>
                    <Link to={`/product/${item.id}`} className="shared-btn view-product-btn">View Product</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: ${totalPrice}</h3>
          </>
        ) : <p>Your cart is empty.</p>}
      </div>
      {cartItems.length > 0 && <PaymentForm cartItems={cartItems} totalPrice={totalPrice} />}
    </div>
  );
};

export default CartPage;