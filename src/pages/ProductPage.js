import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the product details using the ID from the URL
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <img
          className="product-detail-image"
          src={product.images[0]} // Use `images` array from the API
          alt={product.title}
        />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
