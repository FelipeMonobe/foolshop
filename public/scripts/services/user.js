(function() {
  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    return {
      getUser: getUser,
      addUser: addUser,
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

    function removeUser(id) {
      return $http.delete('/api/user/remove/' + id)
        .catch(removeUserError);

      function removeUserError(error) {
        console.log('XHR failed for removeUser. ' + error.data.message);
      }
    }
  }
})();
