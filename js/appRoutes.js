/**
 * Created by Adam on 2/14/2016.
 */
console.log("appRoutes.js");
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    //$routeProvider
    //
    //// home page
    //    .when('/', {
    //        templateUrl: '../views/index.html',
    //        controller: 'IndexController'
    //    })
    //
    //    .when('/users', {
    //        templateUrl: '../views/profile.html',
    //        controller: 'ProfileController'
    //    });

    $locationProvider.html5Mode(true);

}]);