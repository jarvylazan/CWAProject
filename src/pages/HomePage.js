import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";

const HomePage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["All Categories", "Beauty", "Fragrances", "Furniture", "Groceries"]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    // Fetch product data
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Ensure that products are correctly fetched
        if (data && data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initially display all products
        } else {
          console.error("Error: No products found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    // Function to filter products by category and search query
    const filterProducts = (category, query) => {
      let filtered = products;

      // Filter by category
      if (category && category !== "All Categories") {
        filtered = filtered.filter((product) =>
          product.category && product.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      // Filter by search query (case-insensitive search for products by title)
      if (query) {
        filtered = filtered.filter((product) =>
          product.title && product.title.toLowerCase().includes(query.toLowerCase()) // Ensure 'title' exists
        );
      }

      setFilteredProducts(filtered); // Update the filtered products state
    };

    filterProducts(selectedCategory, searchQuery); // Re-filter products when searchQuery or selectedCategory changes
  }, [searchQuery, selectedCategory, products]); // Dependencies include products, selectedCategory, and searchQuery

  const filterByCategory = (category) => {
    setSelectedCategory(category); // Update selected category and re-filter products
  };

  return (
    <div className="homepage">
      <h1>Products</h1>

      {/* Category Filter */}
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
          <p>No products found</p> // Message if no products match the filters
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
