import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentForm.css";

const PaymentForm = ({ cartItems = [], totalPrice = 0 }) => {
  const navigate = useNavigate();

  totalPrice = parseFloat(totalPrice); // Ensure totalPrice is a number

  const gstRate = 0.05; // GST rate: 5%
  const qstRate = 0.09975; // QST rate: 9.975%

  const gstAmount = totalPrice * gstRate;
  const qstAmount = totalPrice * qstRate;
  const finalTotal = totalPrice + gstAmount + qstAmount;

  const handleConfirmOrder = (e) => {
    e.preventDefault(); // Prevent form submission behavior

    // Validate that all fields are filled
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postalCode").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!name || !address || !city || !postalCode || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderDetails = {
      name,
      address,
      city,
      postalCode,
      paymentMethod,
      cartItems,
      subtotal: totalPrice,
      GST: gstAmount,
      QST: qstAmount,
      total: finalTotal,
    };

    // Clear the basket
    localStorage.setItem("cart", JSON.stringify([]));

    // Navigate to order confirmation page with order details
    navigate("/order-confirmation", { state: { orderDetails } });
  };

  return (
    <div className="checkout-container">
      <h1 className="text-center">Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        <p>GST (5%): ${gstAmount.toFixed(2)}</p>
        <p>QST (9.975%): ${qstAmount.toFixed(2)}</p>
        <p>
          <strong>Total: ${finalTotal.toFixed(2)}</strong>
        </p>
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <h2>Payment Method</h2>
        <label>
          <input type="radio" name="payment" value="Credit Card" required /> Credit Card
        </label>
        <label>
          <input type="radio" name="payment" value="PayPal" required /> PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="Bank Transfer" required /> Bank Transfer
        </label>
      </div>

      {/* Shipping Address */}
      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <input type="text" id="name" placeholder="Name" required />
        <input type="text" id="address" placeholder="Street Address" required />
        <input type="text" id="city" placeholder="City" required />
        <input type="text" id="postalCode" placeholder="Postal Code" required />
      </div>

      {/* Confirm Order Button */}
      <button className="confirm-order-btn" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default PaymentForm;
