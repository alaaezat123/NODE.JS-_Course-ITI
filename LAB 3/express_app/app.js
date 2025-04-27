const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', userRoutes);
app.use('/', todoRoutes);

const DB_URI = 'mongodb://localhost:27017/todoapp';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to MongoDB database'))
    .catch((err) => console.error('Failed to connect to MongoDB database:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});