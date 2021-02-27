const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/**
 *  @description Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
route.get('/dashboard', ensureAuthenticated, services.dashboardRoutes);

//Login
route.get('/employee/login', forwardAuthenticated, services.loginRoutes);

// Login
route.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/employee/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  route.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/employee/login');
  });


// API
route.post('/api/employees', controller.create);
route.get('/api/employees', controller.find);
route.put('/api/employees/:id', controller.update);
route.delete('/api/employees/:id', controller.delete);


module.exports = route