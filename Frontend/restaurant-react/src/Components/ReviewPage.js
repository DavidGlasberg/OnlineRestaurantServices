
// src/components/ReviewPage.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactStars from 'react-rating-stars-component';
// import Loader from 'react-loader-spinner';
// import './ReviewPage.css';

// const ReviewPage = () => {
//     const [reviews, setReviews] = useState([]);
//     const [name, setName] = useState('');
//     const [feedback, setFeedback] = useState('');
//     const [rating, setRating] = useState(0);
//     const [loading, setLoading] = useState(false); // State for loading indicator
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     const fetchReviews = async () => {
//         setLoading(true);
//         try {
//         const response = await axios.get('http://localhost:5000/reviews');
//         setReviews(response.data);
//         } catch(err) {
//             setError('Failed to fetch reviews from server')
//         } finally {
//             setLoading(false); // Set loading to false after fetching data (whether success or failure)
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newReview = { name, feedback, rating };
//         await axios.post('http://localhost:5000/reviews', newReview);
//         setName('');
//         setFeedback('');
//         setRating(5);
//         fetchReviews();
//     };

//     const ratingChanged = (newRating) => {
//         setRating(newRating);
//     };

//     return (
//         <div className="review-page">
//             <h1>Customer Reviews</h1>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit} className="review-form">
//                 <div>
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="feedback">Feedback:</label>
//                     <textarea
//                         id="feedback"
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label htmlFor="rating">Rating:</label>
//                     <ReactStars
//                         count={5}
//                         onChange={ratingChanged}
//                         size={24}
//                         activeColor="#ffd700"
//                         value={rating}
//                     />
//                 </div>
//                 <button type="submit">Submit Review</button>
//             </form>
//             <div className="reviews">
//                 {reviews.map((review, index) => (
//                     <div key={index} className="review">
//                         <h3>{review.name}</h3>
//                         <p>{review.feedback}</p>
//                         <div className='stars'>
//                             <ReactStars 
//                             count={5}
//                             size={24}
//                             activeColor="#ffd700"
//                             value={review.rating}
//                             edit={false}
//                         /></div>

//                         <small>{review.date}</small>
//                     </div>
//                 ))}
                
//             </div>
//         </div>
//     );
// };

// export default ReviewPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
// import Loader from 'react-loader-spinner' // Importing Oval loader component
import { Oval } from "react-loader-spinner";
import './ReviewPage.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axios.get('http://localhost:5000/reviews');
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to fetch reviews from server');
        } finally {
            setLoading(false); // Set loading to false after fetching data (whether success or failure)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { name, feedback, rating };
        try {
            await axios.post('http://localhost:5000/reviews', newReview);
            setName('');
            setFeedback('');
            setRating(0);
            fetchReviews();
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Failed to submit review');
        }
    };

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="review-page">
            <h1>Customer Reviews</h1>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating stars:</label>
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
            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <div className="loader-container">
                    <Oval color="blue" radius={"8px"} />
                </div>
            ) : (
                <div className="reviews">
                    {reviews.map((review, index) => (
                        <div key={index} className="review">
                            <h3>{review.name}</h3>
                            <p>{review.feedback}</p>
                            <div className="stars">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={review.rating}
                                    edit={false}
                                />
                            </div>
                            <small>{review.date}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewPage;
