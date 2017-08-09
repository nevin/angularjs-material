myapp.controller('EmployeeListController',['$scope','$routeParams','$q','EmployeeApiFactory', function($scope, $routeParams,$q,EmployeeApiFactory) {
    $scope.employeeData = {};
   EmployeeApiFactory.getAllEmployees().then(function(response){
    console.log(response);
        if(response.status == 200 && response.data >0){
            $scope.employeeData = response;
            console.log($scope.employeeData);
        }
    },function (error) {
        console.log(error.statusText);
    });

 
}]);
