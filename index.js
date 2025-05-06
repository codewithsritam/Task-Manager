require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

// Middleware the parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

const userRoutes = require('./src/routes/index.routes');
app.use('/api/v1', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
}).then( () => {
    console.log('Connected to MongoDB');
}).catch( (err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
