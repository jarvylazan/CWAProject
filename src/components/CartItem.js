import React from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css"; // Import the styles used in the CartPage component

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
          <span className="discounted-price"  style={{ color: "red", fontWeight: "bold" }}>${discountedPrice}</span>
          {item.discountPercentage > 0 && <span className="original-price">${item.price.toFixed(2)}</span>}
        </p>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange(-1)} className="quantity-btn bg-secondary">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="quantity-btn bg-secondary">+</button>
          </div>
          <div className="cart-item-buttons">
            <button className="shared-btn remove-btn" onClick={() => onRemove(item.id)}>
              Remove
            </button>
            <Link to={`/product/${item.id}`} className="shared-btn view-product-btn">
              View Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
