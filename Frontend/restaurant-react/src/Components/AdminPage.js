
// src/components/AdminPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import './AdminPage.css';

const AdminDashboard = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const fetchAllReviews = async () => {
        const response = await axios.get('http://localhost:5000/reviews/all', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setReviews(response.data);
    };

    const handleApprove = async (id) => {
        await axios.put(`http://localhost:5000/reviews/${id}/approve`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchAllReviews();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/reviews/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchAllReviews();
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin - all review:</h1>
            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id} className="review">
                        <h3>{review.name}</h3>
                        <p>{review.feedback}</p>
                        <small>{review.date}</small>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={review.rating}
                            edit={false}
                        />
                        <div>
                            <button onClick={() => handleApprove(review._id)} disabled={review.approved}>
                                {review.approved ? 'Approved' : 'Approve'}
                            </button>
                            <button onClick={() => handleDelete(review._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
