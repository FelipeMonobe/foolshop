module.exports = function(app) {
  var controller = app.controllers.user;

  app.route('/api/user/add')
    .post(controller.addUser);

  app.route('/api/user/get')
    .get(controller.getUser);

  app.route('/api/user/getUserByEmail')
    .get(controller.getUserByEmail);

  app.route('/api/user/getUserByUsername')
    .get(controller.getUserByUsername);

    app.route('/api/user/login')
      .get(controller.login);

  app.route('/api/user/remove/:id')
    .delete(controller.removeUser);
};
