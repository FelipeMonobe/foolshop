var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var User = app.models.user,
    controller = {};

  controller.addUser = function(req, res) {
    User
      .create(req.body)
      .then(addUserSuccess,
        addUserError);

    function addUserSuccess(user) {
      res.status(201).json({
        success: true,
        message: 'You were successfully added.',
        user: user
      });
    }

    function addUserError(error) {
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
    }
  };

  controller.getUser = function(req, res) {
    User
      .find({
        isActive: true
      })
      .exec()
      .then(getUserSuccess,
        getUserError);

    function getUserSuccess(users) {
      res.json(users);
    }

    function getUserError(error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  controller.getUserByEmail = function(req, res) {
    User
      .find({
        email: req.query.email
      })
      .exec()
      .then(getUserByEmailSuccess,
        getUserByEmailError);

    function getUserByEmailSuccess(users) {
      if (users.length > 0)
        return res.json({
          success: true,
          message: 'User successfully retrieved.',
          user: users[0]
        });
      else if (users.length == 0)
        return res.json({
          success: true,
          message: 'There is no user under this e-mail.'
        })
      else
        return res.json({
          success: false,
          message: 'Could not check user.'
        });
    }

    function getUserByEmailError(error) {
      return res.json({
        success: false,
        message: 'Could not check e-mail.'
      })
    }
  }

  controller.getUserByUsername = function(req, res) {
    User
      .find({
        username: req.params.username
      })
      .exec()
      .then(getUserByUsernameSuccess,
        getUserByUsernameError);

    function getUserByUsernameSuccess(user) {
      if (user != null)
        return user;
      else
        return res.json({
          success: false,
          message: 'Chosen username is already being used.'
        });
    }

    function getUserByUsernameError(error) {
      return res.json({
        success: false,
        message: 'Could not check username.'
      })
    }
  }

  controller.removeUser = function(req, res) {
    var _id = sanitize(req.params.id);

    User
      .findByIdAndUpdate(_id, {
        $set: {
          isActive: false
        }
      }, removeUserError);

    function removeUserError(error) {
      if (error)
        return console.error(error);
      res.json({
        success: true,
        message: 'User was successfully deleted.'
      });
      res.end();
    }
  };

  return controller;
};
