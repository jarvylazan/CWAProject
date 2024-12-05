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
  const [hoverRating, setHoverRating] = useState(null); // For hover effects on the star rating

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const savedReviews = JSON.parse(localStorage.getItem(`product-${id}-reviews`)) || [];
        const combinedReviews = [...(data.reviews || []), ...savedReviews];
        const uniqueReviews = Array.from(
          new Map(combinedReviews.map((r) => [`${r.reviewerName}-${r.comment}-${r.date}`, r])).values()
        );

        // Calculate the average rating
        const totalRating = uniqueReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = uniqueReviews.length > 0 ? totalRating / uniqueReviews.length : 0;

        setProduct({
          ...data,
          reviews: uniqueReviews,
          rating: averageRating,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product && product.reviews) {
      localStorage.setItem(`product-${id}-reviews`, JSON.stringify(product.reviews));
    }
  }, [product, id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Dispatch custom cartUpdated event
    window.dispatchEvent(new Event("cartUpdated"));
    
    alert(`${product.title} added to cart!`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const { rating, description, name } = newReview;
    const userName = name || "Anonymous";

    const updatedReviews = [
      ...product.reviews,
      {
        rating,
        comment: description,
        reviewerName: userName,
        date: new Date().toISOString(),
      },
    ];

    // Recalculate the average rating
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0;

    setProduct({
      ...product,
      reviews: updatedReviews,
      rating: averageRating,
    });

    setNewReview({
      rating: 0,
      description: "",
      name: "",
    });

    alert("Review submitted!");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStars);
  
    let stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<i className="bi bi-star-fill filled" key={"full-" + i}></i>);
    if (halfStars) stars.push(<i className="bi bi-star-half filled" key="half"></i>);
    for (let i = 0; i < emptyStars; i++) stars.push(<i className="bi bi-star empty" key={"empty-" + i}></i>);
  
    return stars;
  };

  const renderInteractiveStars = () => {
    const ratingToDisplay = hoverRating || newReview.rating; // Show hover rating or selected rating

    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setNewReview({ ...newReview, rating: star })}
        onMouseEnter={() => setHoverRating(star)}  // Update hover rating
        onMouseLeave={() => setHoverRating(null)} // Reset hover rating
        style={{
          cursor: "pointer",
          color: star <= ratingToDisplay ? "#ffc107" : "grey",  // Highlight stars up to selected/hovered rating
        }}
      >
        ★
      </span>
    ));
  };

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

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
        <img className="product-detail-image" src={product.images[0]} alt={product.title} />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-prices">
            <s className="original-price">${product.price.toFixed(2)}</s>
            <span className="discount-price">${discountedPrice.toFixed(2)}</span>
          </div>
          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="product-rating-value">
              ({product.rating.toFixed(1)}) - {product.reviews.length} Reviews
            </span>
          </div>
          <p className="product-availability">Availability: {getAvailabilityStatus(product.stock)}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
          <div className="product-qr">
            <h3>Product QR Code</h3>
            {id && <QRCodeCanvas value={`https://dummyjson.com/products/${id}`} size={150} />}
          </div>
        </div>
      </div>
      <div className="product-reviews">
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
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating">
              {renderInteractiveStars()}  {/* Updated star rating rendering */}
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
