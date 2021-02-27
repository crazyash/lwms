const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Employee = require('../model/employee');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'id' }, (id, password, done) => {
      // Match Employee
      Employee.findOne({
        id: id
      }).then(employee => {
        if (!employee) {
          return done(null, false, { message: 'That employee is not registered' });
        }
        // Match password
        bcrypt.compare(password, employee.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, employee);
            console.log(`Matched password`);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(employee, done) {
    done(null, employee.id);
  });

  passport.deserializeUser(function(id, done) {
    Employee.findOne({id: id}, function(err, employee) {
      done(err, employee);
    });
  });
};
