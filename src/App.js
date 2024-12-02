import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Manage search query state
  const [orderDetails, setOrderDetails] = useState(null); // State to hold order details

  return (
    <Router>
      {/* Pass search query handler to Header */}
      <Header onSearch={setSearchQuery} />

      <Routes>
        {/* Pass searchQuery to HomePage */}
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Dynamic route */}
        <Route
          path="/cart"
          element={<CartPage onConfirmOrder={setOrderDetails} />}
        />
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation orderDetails={orderDetails} />}
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
