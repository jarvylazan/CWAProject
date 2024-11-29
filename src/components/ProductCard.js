import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <div className="product-details">
          <h2>{product.title}</h2>
          <p className="product-price">
            <span className="discounted-price">${discountedPrice}</span>{" "}
            <span className="original-price">${product.price.toFixed(2)}</span>
          </p>
          <p className="product-rating">
            {product.rating.toFixed(1)}⭐ ({product.stock} in stock)
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
