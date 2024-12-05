import React from "react";
import { Link } from "react-router-dom";
import "../styles/CartItem.css";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const discountedPrice = (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2);

  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">
          <span className="discounted-price">${discountedPrice}</span> {item.discountPercentage && <span className="original-price">${item.price.toFixed(2)}</span>}
        </p>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="cart-item-buttons">
            <button className="remove-button" onClick={() => onRemove(item.id)}>
              Remove
            </button>
            <Link to={`/product/${item.id}`} className="view-product-button">
              View Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
