const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../loginApp/config/auth.js/index.js');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
