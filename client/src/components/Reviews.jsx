// components/Reviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/course/${courseId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [courseId]);

  const submitReview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/reviews/add',
        { courseId, rating, reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setRating(0);
      setReviewText('');
    } catch (error) {
      setMessage('Failed to submit review');
    }
  };

  return (
    <div className="reviews-container">
      <h2>Course Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <h4>{review.studentId.name}</h4>
            <p>{review.reviewText}</p>
            <span>{'⭐'.repeat(review.rating)}</span>
          </div>
        ))}
      </div>

      <div className="submit-review">
        <h3>Submit Your Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          placeholder="Rating (1-5)"
        />
        <button onClick={submitReview}>Submit</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Reviews;
