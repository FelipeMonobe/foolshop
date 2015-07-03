var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var User = app.models.user,
    controller = {};

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
