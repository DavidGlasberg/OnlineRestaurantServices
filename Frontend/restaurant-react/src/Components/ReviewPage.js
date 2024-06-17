
// src/components/ReviewPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import './ReviewPage.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { name, feedback, rating };
        await axios.post('http://localhost:5000/reviews', newReview);
        setName('');
        setFeedback('');
        setRating(5);
        fetchReviews();
    };

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="review-page">
            <h1>Customer Reviews</h1>
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        value={rating}
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
            <div className="reviews">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h3>{review.name}</h3>
                        <p>{review.feedback}</p>
                        <div className='stars'>
                            <ReactStars 
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={review.rating}
                            edit={false}
                        /></div>

                        <small>{review.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
