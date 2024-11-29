import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["All Categories", "Beauty", "Fragrances", "Furniture", "Groceries"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch product data
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initially display all products
      });
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All Categories") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
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
