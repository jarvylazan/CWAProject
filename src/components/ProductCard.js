import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css"; // Ensure CSS is correctly configured

const ProductCard = ({ product }) => {
  // Calculate discounted price
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const [currentRating, setCurrentRating] = useState(product.rating);
  const [reviewsCount, setReviewsCount] = useState(product.reviews.length);

  useEffect(() => {
    // Fetch reviews from localStorage
    const fetchReviews = () => {
      const storedReviews = JSON.parse(localStorage.getItem(`product-${product.id}-reviews`)) || [];
      const combinedReviews = [...product.reviews, ...storedReviews];
      const uniqueReviews = Array.from(
        new Map(combinedReviews.map((r) => [`${r.reviewerName}-${r.comment}-${r.date}`, r])).values()
      );

      // Calculate average rating
      const totalRating = uniqueReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = uniqueReviews.length > 0 ? totalRating / uniqueReviews.length : 0;

      setCurrentRating(averageRating);
      setReviewsCount(uniqueReviews.length);
    };

    fetchReviews();
  }, [product]);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStars);

    let stars = [];
    // Add full stars
    for (let i = 0; i < fullStars; i++) stars.push(<i className="bi bi-star-fill filled" key={"full-" + i}></i>);
    // Add half star
    if (halfStars) stars.push(<i className="bi bi-star-half filled" key="half"></i>);
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) stars.push(<i className="bi bi-star empty" key={"empty-" + i}></i>);

    return stars;
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <div className="product-details">
        <h2>{product.title}</h2>

        {/* Rating stars and reviews count */}
        <p className="product-rating">
          {renderStars(currentRating)} ({reviewsCount} reviews)
        </p>

        {/* Price details */}
        <p className="product-price">
          <span className="discounted-price text-success">${discountedPrice}</span> <span className="original-price text-muted">${product.price.toFixed(2)}</span>
        </p>
      </div>

      {/* "View Details" button */}
      <Link to={`/product/${product.id}`} className="btn btn-outline-primary view-details-button">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
