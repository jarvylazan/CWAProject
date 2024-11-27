import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailPage.css";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  // Fetch the product details based on the ID
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
        <div className="product-details">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.discountPercentage && (
              <span className="old-price">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>
          <div className="rating">
            Rating: {product.rating} ⭐ ({product.stock} in stock)
          </div>
          <button
            className="add-to-cart-button"
            onClick={() => {
              // Logic to add product to cart
              console.log("Product added to cart:", product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-reviews">
        <h2>Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul className="reviews-list">
            {product.reviews.map((review, index) => (
              <li key={index} className="review-item">
                <strong>{review.reviewerName}</strong>: {review.comment} (
                {review.rating} ⭐)
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
