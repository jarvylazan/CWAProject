import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";

const HomePage = ({ searchQuery }) => {
  // State management for products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["All Categories", "Beauty", "Fragrances", "Furniture", "Groceries"]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Fetch product data when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products); // Store all products
          setFilteredProducts(data.products); // Display all products initially
        } else {
          console.error("Error: No products found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Filter products by category and search query
  useEffect(() => {
    const filterProducts = (category, query) => {
      let filtered = products;

      // Filter by selected category (exclude "All Categories")
      if (category && category !== "All Categories") {
        filtered = filtered.filter((product) =>
          product.category && product.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      // Filter by search query
      if (query) {
        filtered = filtered.filter((product) =>
          product.title && product.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      setFilteredProducts(filtered); // Update filtered products
    };

    filterProducts(selectedCategory, searchQuery); // Re-run filter on dependency changes
  }, [searchQuery, selectedCategory, products]);

  // Handle category selection
  const filterByCategory = (category) => {
    setSelectedCategory(category); // Update category state
  };

  return (
    <div className="homepage">
      <h1>Products</h1>

      {/* Dropdown for Category Filter */}
      <div className="dropdown-container">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => filterByCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered Products */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p> // Show message if no products match the filters
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
