var myapp =angular.module('EmiratesTestApp',['ngMaterial','ui.router','ngRoute','EmiratesTestApp.services'])
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