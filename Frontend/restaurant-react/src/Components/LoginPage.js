// src/Components/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Oval } from "react-loader-spinner";
import './LoginPage.css';

const LoginPage = ({ setIsAdminLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const adminToken = response.data.token;
            localStorage.setItem('adminToken', adminToken);
            setIsAdminLoggedIn(true); // Update isAdminLoggedIn state
            navigate('/admin');
        } catch (error) {
            console.error('Login failed', error);
            alert("Login failed, user or password worng!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {loading && (
                <div className="loader-container">
                    <Oval color="#00BFFF" radius={"8px"} />
                </div>
            )}
        </div>
    );
};

export default LoginPage;
