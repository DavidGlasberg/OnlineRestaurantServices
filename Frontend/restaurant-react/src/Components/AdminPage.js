// src/AdminPage.js
// src/components/AdminPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const [reviews, setReviews] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setToken(adminToken);
            fetchUnapprovedReviews(adminToken);
        }
    }, []);

    const fetchUnapprovedReviews = async (token) => {
        const response = await axios.get('http://localhost:5000/reviews/unapproved', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
    };

    const handleApprove = async (id) => {
        await axios.put(`http://localhost:5000/reviews/${id}/approve`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUnapprovedReviews(token);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUnapprovedReviews(token);
    };

    return (
        <div className="admin-page">
            <h1>Unapproved Reviews</h1>
            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id} className="review">
                        <h3>{review.name}</h3>
                        <p>{review.feedback}</p>
                        <small>{review.date}</small>
                        <button onClick={() => handleApprove(review._id)}>Approve</button>
                        <button onClick={() => handleDelete(review._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
