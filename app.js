var myapp =angular.module('AngularTestIGT',['ngMaterial','ui.router','ngRoute','EmployeeApiService'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'EmployeeListController',
            templateUrl: 'views/home.html'
        })
        .otherwise({redirectTo: '/'});
    }])
    .run(function () {
        console.log("my emirates app");
    })