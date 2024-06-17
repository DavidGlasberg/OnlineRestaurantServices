

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAdminLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/reviews" className="nav-link">Reviews</Link>
                {isAdminLoggedIn && (
                    <>
                        <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                        <Link to="/admin/unapproved" className="nav-link">Unapproved Reviews</Link>
                    </>
                )}
            </div>
            {isAdminLoggedIn ? (
                <div className="logout-button">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Link to="/login" className="nav-link">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;

