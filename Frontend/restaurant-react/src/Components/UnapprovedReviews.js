// src/Components/UnapprovedReviews.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import './UnapprovedReviews.css'; 

const UnapprovedReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUnapprovedReviews = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('http://localhost:5000/reviews/unapproved', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(response.data);
            } catch (err) {
                setError('Failed to fetch unapproved reviews');
            }
        };

        fetchUnapprovedReviews();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5000/reviews/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviews.filter(review => review._id !== id));
        } catch (err) {
            setError('Failed to approve review');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/reviews/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviews.filter(review => review._id !== id));
        } catch (err) {
            setError('Failed to delete review');
        }
    };

    return (
        <div className="unapproved-reviews">
            <h1>Unapproved Reviews</h1>
            {/* <h1>אזור מנהל - ביקורות ממתינות לאישור</h1> */}

            {error && <p className="error-message">{error}</p>}
            <ul>
                {reviews.map(review => (
                    <li key={review._id}>
                        <p>{review.name}: {review.feedback}</p>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={review.rating}
                            edit={false}
                        />
                        <div>
                            <button onClick={() => handleApprove(review._id)}>Approve</button>
                            <button onClick={() => handleDelete(review._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UnapprovedReviews;
