(function() {
  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    return {
      addUser: addUser,
      getUser: getUser,
      getUserByEmail: getUserByEmail,
      getUserByUsername: getUserByUsername,
      login: login,
      removeUser: removeUser
    };

    function addUser(model) {
      return $http.post('/api/user/add', model)
        .catch(function(error) {
          console.log('XHR failed for addUser. ' + error.data.message);
        });
    }

    function getUser() {
      return $http.get('/api/user/get')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log('XHR failed for getUser. ' + error.data.message);
        });
    }

    function getUserByEmail(email) {
      return $http.get('/api/user/getUserByEmail', {
          params: {
            email: email
          }
        })
        .catch(function(error) {
          console.log('XHR failed for getUserByEmail. ' + error.data.message);
        });
    }

    function getUserByUsername(username) {
      return $http.get('/api/user/getUserByUsername', {
          params: {
            username: username
          }
        })
        .catch(function(error) {
          console.log('XHR failed for getUserByUsername. ' + error.data.message);
        });
    }

    function login(username, password) {
      return $http.get('/api/user/login', {
          params: {
            username: username,
            password: password
          }
        })
        .catch(function(error) {
          console.log('XHR failed for login. ' + error.data.message);
        });
    }

    function removeUser(id) {
      return $http.delete('/api/user/remove/' + id)
        .catch(function(error) {
          console.log('XHR failed for removeUser. ' + error.data.message);
        });
    }
  }
})();
