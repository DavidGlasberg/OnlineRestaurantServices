// src/ReviewPage.js

// import React, { useState } from 'react';

// const ReviewPage = () => {
//     const [reviews, setReviews] = useState([]);
//     const [name, setName] = useState('');
//     const [feedback, setFeedback] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newReview = { name, feedback, date: new Date().toLocaleString() };
//         setReviews([newReview, ...reviews]);
//         setName('');
//         setFeedback('');
//     };

//     return (
//         <div className="review-page">
//             <h1>Customer Reviews</h1>
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
//                 <button type="submit">Submit Review</button>
//             </form>
//             <div className="reviews">
//                 {reviews.map((review, index) => (
//                     <div key={index} className="review">
//                         <h3>{review.name}</h3>
//                         <p>{review.feedback}</p>
//                         <small>{review.date}</small>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ReviewPage;

// src/ReviewPage.js

// ******************************************************************************************** 2


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReviewPage = () => {
//     const [reviews, setReviews] = useState([]);
//     const [name, setName] = useState('');
//     const [feedback, setFeedback] = useState('');

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     const fetchReviews = async () => {
//         const response = await axios.get('http://localhost:5000/reviews');
//         setReviews(response.data);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newReview = { name, feedback };
//         await axios.post('http://localhost:5000/reviews', newReview);
//         setName('');
//         setFeedback('');
//         fetchReviews();
//     };

//     return (
//         <div className="review-page">
//             <h1>Customer Reviews</h1>
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
//                 <button type="submit">Submit Review</button>
//             </form>
//             <div className="reviews">
//                 {reviews.map((review, index) => (
//                     <div key={index} className="review">
//                         <h3>{review.name}</h3>
//                         <p>{review.feedback}</p>
//                         <small>{review.date}</small>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ReviewPage;

// ******************************************************************************** 3
// src/components/ReviewPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewPage.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { name, feedback };
        await axios.post('http://localhost:5000/reviews', newReview);
        setName('');
        setFeedback('');
        fetchReviews();
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
                <button type="submit">Submit Review</button>
            </form>
            <div className="reviews">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h3>{review.name}</h3>
                        <p>{review.feedback}</p>
                        <small>{review.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
