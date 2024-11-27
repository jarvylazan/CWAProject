import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={product.thumbnail} alt={product.title} />
      <h5>{product.title}</h5>
      <div className="price">
        ${product.price.toFixed(2)}{" "}
        {product.discountPercentage && (
          <span className="old-price">
            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
          </span>
        )}
      </div>
      <div className="rating">
        {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the card click event
          // Add "Add to Cart" logic here
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
