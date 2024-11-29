import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart data from local storage or initialize an empty array
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Function to calculate the total price
  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          item.quantity *
            (item.price * (1 - (item.discountPercentage || 0) / 100)),
        0
      )
      .toFixed(2);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle quantity updates
  const handleUpdateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ${calculateTotal()}</h2>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
