import React from "react";
import "../styles/OrderConfirmation.css";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <p>No order details available. Please return to the checkout page.</p>;
  }

  const { name, address, city, postalCode, paymentMethod, cartItems, total, GST, QST, subtotal } = orderDetails;

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              <span>{item.quantity || 1} x ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>GST (5%): ${GST.toFixed(2)}</p>
        <p>QST (9.975%): ${QST.toFixed(2)}</p>
        <p>
          <strong>Total: ${total.toFixed(2)}</strong>
        </p>
      </div>
      <div className="customer-details">
        <h2>Customer Details</h2>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Address:</strong> {address}, {city}, {postalCode}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
      </div>
      <button onClick={() => window.location.href = '/'}>Return to Home</button>
    </div>
  );
};

export default OrderConfirmation;
