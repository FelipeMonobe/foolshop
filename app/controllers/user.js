var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var User = app.models.user,
    controller = {};

  controller.addUser = function(req, res) {
    User
      .create(req.body)
      .then(function(user) {
          res.status(201).json({
            success: true,
            message: 'You were successfully added.',
            user: user
          });
        },
        function(error) {
          console.log(error);
          if (error.code === 11000)
            res.json({
              success: false,
              message: 'This user already exists.'
            });
          res.json({
            success: false,
            message: 'User could not be added.'
          });
        });
  };

  controller.getUser = function(req, res) {
    User
      .find({
        isActive: true
      })
      .exec()
      .then(function(users) {
          res.json(users);
        },
        function(error) {
          console.log(error);
          res.status(500).json(error);
        });
  };

  controller.getUserByEmail = function(req, res) {
    User
      .find({
        email: req.query.email
      })
      .exec()
      .then(function(users) {
          if (users.length > 0)
            return res.json({
              success: true,
              message: 'User successfully retrieved.',
              user: users[0]
            });
          else if (!!users.length)
            return res.json({
              success: true,
              message: 'There is no user under this e-mail.'
            });
          else
            return res.json({
              success: false,
              message: 'Could not check user.'
            });
        },
        function(error) {
          return res.json({
            success: false,
            message: 'Could not check e-mail.'
          });
        });
  };

  controller.getUserByUsername = function(req, res) {
    User
      .find({
        username: req.query.username
      })
      .exec()
      .then(function(users) {
          if (users.length > 0)
            return res.json({
              success: true,
              message: 'User successfully retrieved.',
              user: users[0]
            });
          else if (!!users.length)
            return res.json({
              success: true,
              message: 'There is no user under this username.'
            });
          else
            return res.json({
              success: false,
              message: 'Could not check user.'
            });
        },
        function(error) {
          return res.json({
            success: false,
            message: 'Could not check username.'
          });
        });
  };

  controller.signIn = function(req, res) {
    User
      .find({
        username: req.query.username,
        password: req.query.password
      })
      .exec()
      .then(function(users) {
        if (users.length) {

          req.session.userData = users[0];

          console.log();
          console.log(req.session.userData.username + ' has signed in.');

          return res.json({
            success: true,
            message: 'Successful sign in.',
            user: users[0]
          });
        }
        return res.json({
          success: false,
          message: 'Invalid user credentials.'
        });
      });
  };

  controller.signOut = function(req, res) {
    var username = req.session.userData.username;
    req.session.destroy(function(error) {
      return res.json({
        success: false,
        message: 'Could not sign out.'
      });
    });

    console.log();
    console.log(username + ' has signed out.');

    return res.json({
      success: true,
      message: 'You were successfully signed out.'
    });
  };

  controller.removeUser = function(req, res) {
    var _id = sanitize(req.params.id);

    User
      .findByIdAndUpdate(_id, {
        $set: {
          isActive: false
        }
      }, function(error) {
        if (error)
          return console.error(error);
        res.json({
          success: true,
          message: 'User was successfully deleted.'
        });
        res.end();
      });
  };

  return controller;
};
