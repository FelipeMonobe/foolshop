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
      removeUser: removeUser
    };

    function addUser(model) {
      return $http.post('/api/user/add', model)
        .catch(addUserError);

      function addUserError(error) {
        console.log('XHR failed for addUser. ' + error.data.message);
      }
    }

    function getUser() {
      return $http.get('/api/user/get')
        .then(getUserSuccess)
        .catch(getUserError);

      function getUserSuccess(response) {
        return response.data;
      }

      function getUserError(error) {
        console.log('XHR failed for getUser. ' + error.data.message);
      }
    }

    function getUserByEmail(model) {
      return $http.post('api/user/getByEmail', model)
        .catch(getUserByEmailError);

      function getUserByEmailError(error) {
        console.log('XHR failed for getUserByEmail. ' + error.data.message);
      }
    }

    function getUserByUsername(model) {
      return $http.post('api/user/getByUsername', model)
        .catch(getUserByUsernameError);

      function getUserByUsernameError(error) {
        console.log('XHR failed for getUserByUsername. ' + error.data.message);
      }
    }

    function removeUser(id) {
      return $http.delete('/api/user/remove/' + id)
        .catch(removeUserError);

      function removeUserError(error) {
        console.log('XHR failed for removeUser. ' + error.data.message);
      }
    }
  }
})();
