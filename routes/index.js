// routes/index.js
var express = require('express');
var router = express.Router();

// Home Page Route
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

// Home Page Route with '/home' path
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

// About Me Page Route
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

// Projects Page Route
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

// Contact Me Page (GET)
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

// Contact Me Page (POST) - For form submission
router.post('/contact', function(req, res, next) {
  const { name, email, message } = req.body;

  // For now, we log the form data in the console (you can later implement sending an email, storing the message, etc.)
  console.log(`Received contact form submission: Name: ${name}, Email: ${email}, Message: ${message}`);

  // Redirect back to the contact page with a success message (optional)
  res.render('contact', { title: 'Contact Me', successMessage: 'Your message has been sent successfully!' });
});

module.exports = router;
