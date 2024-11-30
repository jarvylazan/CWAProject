import React from "react";
import "../styles/Checkout.css";

const Checkout = ({ cartItems = [], totalPrice = 0 }) => {
  const gstRate = 0.05; // GST rate: 5%
  const qstRate = 0.09975; // QST rate: 9.975%

  const gstAmount = (totalPrice * gstRate).toFixed(2);
  const qstAmount = (totalPrice * qstRate).toFixed(2);
  const finalTotal = (
    parseFloat(totalPrice) +
    parseFloat(gstAmount) +
    parseFloat(qstAmount)
  ).toFixed(2);

  return (
    <div className="checkout-container">
      <h1 className="text-center">Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ${parseFloat(totalPrice).toFixed(2)}</p>
        <p>GST (5%): ${gstAmount}</p>
        <p>QST (9.975%): ${qstAmount}</p>
        <p>
          <strong>Total: ${finalTotal}</strong>
        </p>
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <h2>Payment Method</h2>
        <label>
          <input type="radio" name="payment" value="credit-card" /> Credit Card
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" /> PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="bank-transfer" /> Bank Transfer
        </label>
      </div>

      {/* Shipping Address */}
      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Street Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Postal Code" />
      </div>

      {/* Confirm Order Button */}
      <button className="confirm-order-btn">Confirm Order</button>
    </div>
  );
};

export default Checkout;
