// src/App.js

// import React from 'react';
// import './App.css';
// import Navbar from './Components/Navbar';
// import HomePage from './Components/HomePage';
// import ReviewPage from './Components/ReviewPage';
// import LoginPage from './Components/LoginPage';
// import AdminPage from './Components/AdminPage';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <header className="App-header">
//                     <Navbar />
//                 </header>
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<HomePage />} />
//                         <Route path="/reviews" element={<ReviewPage />} />
//                         <Route path="/login" element={<LoginPage />} />
//                         <Route path="/admin" element={<AdminPage />} />
//                     </Routes>
//                 </main>
//             </div>
//         </Router>
//     );
// }

// export default App;


// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import ReviewPage from './Components/ReviewPage';
import LoginPage from './Components/LoginPage';
import AdminPage from './Components/AdminPage';
import UnapprovedReviews from './Components/UnapprovedReviews';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAdminLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/reviews" element={<ReviewPage />} />
                        <Route path="/login" element={<LoginPage setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                        {isAdminLoggedIn ? (
                            <>
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="/admin/unapproved" element={<UnapprovedReviews />} />
                            </>
                        ) : (
                            <Route path="*" element={<Navigate to="/" replace />} />
                        )}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

