import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "../styles/HomePage.css";

const HomePage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["All Categories", "Beauty", "Fragrances", "Furniture", "Groceries"]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error(error.message); // Handle errors by setting error state
      }
    };

    loadProducts();
  }, []);
  
  useEffect(() => {
    let filtered = products.filter((product) => {
      return (
        (selectedCategory === "All Categories" ||
          product.category?.toLowerCase().includes(selectedCategory.toLowerCase())) &&
        (!searchQuery || product.title?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="homepage">
      <h1>Products</h1>
      <div className="dropdown-container">
        <select id="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
