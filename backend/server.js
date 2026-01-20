const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Quiz App Backend is running');
});

const quizRoutes = require('./routes/quizzes');
const resultRoutes = require('./routes/results');

app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
