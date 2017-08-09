var myapp =angular.module('AngularTestIGT',['ngMaterial','ui.router','ngRoute','EmployeeApiService','ngSanitize', 'ngCsv','ngMessages'])
    .config(['$routeProvider','$mdIconProvider', function($routeProvider,$mdIconProvider) {
        $mdIconProvider
                .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
                .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
                .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
                .defaultIconSet('img/icons/sets/core-icons.svg', 24);
        $routeProvider.when('/', {
            controller: 'EmployeeListController',
            templateUrl: 'views/employeeListView.html'
        }) .when('/add', {
                controller: 'EmployeeAddController',
                templateUrl: 'views/employeeAddView.html'
            })
        .otherwise({redirectTo: '/'});
    }])
    .run(function () {
        console.log("my emirates app");
    })