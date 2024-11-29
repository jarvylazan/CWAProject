import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cookies from "js-cookie"; // Import js-cookie for cookies management
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState([
    "All Categories",
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    Cookies.get("selectedCategory") || "All Categories" // Load selected category from cookies or default to "All Categories"
  );

  useEffect(() => {
    // Check if products are already in localStorage
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(
        selectedCategory === "All Categories"
          ? parsedProducts
          : parsedProducts.filter(
              (product) =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            )
      );
    } else {
      // Fetch product data if not present in localStorage
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initially display all products
          localStorage.setItem("products", JSON.stringify(data.products)); // Save products to localStorage
        });
    }
  }, [selectedCategory]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    Cookies.set("selectedCategory", category, { expires: 7 }); // Save selected category to cookies
    if (category === "All Categories") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="homepage">
      <h1>Products</h1>
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
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
