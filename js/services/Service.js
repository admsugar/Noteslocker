/**
 * Created by Adam on 2/14/2016.
 */
console.log("service.js");
angular.module('Service', []).factory('User', ['$http', function($http) {

    return {
        // call to get all users
        get : function() {
            return $http.get('/users');
        }
    }

}]);