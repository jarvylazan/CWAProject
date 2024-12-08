import React, { useState, useEffect } from "react";
import "../styles/CartPage.css";
import PaymentForm from "../components/PaymentForm";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const adjustQuantity = (id, newQuantity) => {
    updateCart(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const calculateDiscountedPrice = (item) => (
    (item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2)
  );

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(calculateDiscountedPrice(item)), 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        {cartItems.length ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={adjustQuantity}
                />
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