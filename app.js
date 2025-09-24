const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars'); 
require('dotenv').config(); 

const indexRouter = require('./routes/index');

const app = express();

// MongoDB Atlas connection using Mongoose
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://webaooadmin:RhqGqHJLJIskeRnw@cluster0.u2zmk.mongodb.net/ProjectTrackerMonday'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

// Set up the port (can be set in an environment variable or default to 3000)
const port = process.env.PORT || 5000;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup - Using express-handlebars (HBS)
app.engine(
    'hbs',
    engine({
        extname: 'hbs', 
        defaultLayout: 'layout', 
        layoutsDir: path.join(__dirname, 'views/layouts'), // Layouts folder
        partialsDir: path.join(__dirname, 'views/partials'), // Partials folder
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger('dev')); // Logging HTTP requests
app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded request bodies
app.use(cookieParser()); // Parsing cookies
app.use(bodyParser.urlencoded({ extended: false })); // Handling form data

// Routes
app.use('/', indexRouter);

// Error Handling - 404 page
app.use(function(req, res, next) {
    res.status(404).render('404', { title: '404: Page Not Found' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); // Log message when server starts
});

module.exports = app; // Export the Express app
