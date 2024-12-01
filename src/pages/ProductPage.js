import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/ProductDetail.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 0,
    description: "",
    name: "",
  });

  // Load product details and reviews from the API or LocalStorage
  useEffect(() => {
    // Fetch product details
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Load reviews from LocalStorage if available, otherwise use an empty array
        const savedReviews = JSON.parse(localStorage.getItem(`product-${id}-reviews`)) || [];
        const combinedReviews = [...(data.reviews || []), ...savedReviews];

        // Get rid of the duplicationszzz
        const uniqueReviews = Array.from(new Map(combinedReviews.map((r) => [`${r.reviewerName}-${r.comment}-${r.date}`, r])).values());

        setProduct({
          ...data,
          reviews: uniqueReviews,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product details:", error);
        setLoading(false);
      });
  }, [id]);

  // Save reviews to LocalStorage when product.reviews changes
  useEffect(() => {
    if (product && product.reviews) {
      localStorage.setItem(`product-${id}-reviews`, JSON.stringify(product.reviews));
    }
  }, [product, id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex > -1) {
      // If it exists, update the quantity
      cart[existingProductIndex].quantity =
        (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      // If it doesn't exist, add the product with an initial quantity of 1
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  };
  

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  // Function to render stars with Bootstrap icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          <i
            className={`bi ${i <= rating ? "bi-star-fill" : "bi-star"}`}
            style={i <= rating ? { color: "#ffc107" } : { color: "grey" }}
          ></i>
        </span>
      );
    }
    return stars;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const { rating, description, name } = newReview;

    // If no name provided, set as 'Anonymous'
    const userName = name || "Anonymous";

    // Add new review to the list
    const updatedReviews = [
      ...product.reviews,
      {
        rating,
        comment: description,
        reviewerName: userName,
        reviewerEmail: "", // Optionally add email or leave blank
        date: new Date().toISOString(),
      },
    ];

    // Update the product state with new reviews
    setProduct({
      ...product,
      reviews: updatedReviews,
    });

    // Reset the form
    setNewReview({
      rating: 0,
      description: "",
      name: "",
    });

    alert("Review submitted!");
  };

  // Function to display availability status
  const getAvailabilityStatus = (stock) => {
    if (stock > 5) {
      return "In Stock";
    } else if (stock <= 5 && stock > 0) {
      return "Low Stock";
    } else {
      return "Out of Stock";
    }
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <img
          className="product-detail-image"
          src={product.images[0]}
          alt={product.title}
        />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-prices">
            <s className="original-price">${product.price.toFixed(2)}</s>
            <span className="discount-price">${discountedPrice.toFixed(2)}</span>
          </div>

          {/* Product rating with review count */}
          <div className="product-rating">
            {renderStars(Math.floor(product.rating))}
            <span className="product-rating-value">
              ({product.rating.toFixed(1)}) - {product.reviews.length} Reviews
            </span>
          </div>

          {/* Displaying Availability Status */}
          <p className="product-availability">
            Availability: {getAvailabilityStatus(product.stock)}
          </p>

          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>

          {/* QR Code Section placed right below the button */}
          <div className="product-qr">
            <h3>Product QR Code</h3>
            {id && (
              <QRCodeCanvas value={`https://dummyjson.com/products/${id}`} size={150} />
            )}
          </div>
        </div>
      </div>

      <div className="product-reviews">
  {/* Customer Reviews Heading */}
  <h2>Customer Reviews</h2>
  {product.reviews && product.reviews.length > 0 ? (
    product.reviews.map((review, index) => (
      <div key={index} className="review">
        <h4>
          <strong>{review.reviewerName}</strong> (Rating: {review.rating})
        </h4>
        <p>{review.comment}</p>
        <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
      </div>
    ))
  ) : (
    <p>No reviews available.</p>
  )}

  {/* Leave a Review Heading */}
  <h3>Leave a Review</h3>
  <form onSubmit={handleReviewSubmit}>
    <div className="form-group">
      <label>Rating:</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setNewReview({ ...newReview, rating: star })}
            style={{
              cursor: "pointer",
              color: star <= newReview.rating ? "#ffc107" : "grey",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>

    <div className="form-group">
      <textarea
        value={newReview.description}
        onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
        rows="4"
        placeholder="Write a review here..."
      />
    </div>

    <div className="form-group">
      <input
        type="text"
        value={newReview.name}
        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        placeholder="Your name (Optional)"
      />
    </div>

    <button type="submit" className="submit-review-button">
      Submit Review
    </button>
  </form>
</div>
    </div>
  );
};

export default ProductPage;
