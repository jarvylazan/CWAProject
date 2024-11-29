import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Manage search query state

  return (
    <Router>
      {/* Pass search query handler to Header */}
      <Header onSearch={setSearchQuery} />

      <Routes>
        {/* Pass searchQuery to HomePage */}
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Dynamic route */}
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
