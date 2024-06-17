// Backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = `${process.env.SECRET_KEY}`; 

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


// JWT Middleware
const authMiddleware = expressJwt({ secret: SECRET_KEY, algorithms: ['HS256'] });

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
    name: String,
    feedback: String,
    date: String,
    approved: { type: Boolean, default: false },
});

const Review = mongoose.model('Review', reviewSchema);

// Routes
// Public routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username !== 'admin' || !bcrypt.compareSync(password, bcrypt.hashSync('password', 8))) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
    console.log("Admin connected!");
});

app.post('/reviews', async (req, res) => {
    const { name, feedback } = req.body;
    const newReview = new Review({ name, feedback, date: new Date().toLocaleString() });
    await newReview.save();
    res.status(201).send(newReview);
});

app.get('/reviews', async (req, res) => {
    const reviews = await Review.find({ approved: true });
    res.send(reviews);
});

// Protected routes
app.get('/reviews/unapproved', authMiddleware, async (req, res) => {
    try {
        const reviews = await Review.find({ approved: false });
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch unapproved reviews' });
    }
});

app.put('/reviews/:id/approve', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(id, { approved: true }, { new: true });
        res.send(review);
    } catch (error) {
        res.status(500).send({ message: 'Failed to approve review' });
    }
});

app.delete('/reviews/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.send({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete review' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
