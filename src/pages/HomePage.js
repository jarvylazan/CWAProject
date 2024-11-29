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
  }, []); // This effect only runs once when the component mounts

  useEffect(() => {
    // Filter products based on category and search query
    let filtered = products;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) =>
        product.category && product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query (case-insensitive search for products by title)
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Ensure 'title' exists
      );
    }

    setFilteredProducts(filtered); // Update the filtered products state
  }, [searchQuery, selectedCategory, products]); // Re-run filtering whenever these dependencies change

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
