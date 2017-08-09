var myapp = angular.module('EmployeeApiService', []);

 myapp.factory('EmployeeApiFactory', ['$http','$q' , function ($http,$q) {
  var deferred = $q.defer();
   var url = "https://still-caverns-98497.herokuapp.com";
   this.getAllEmployees = function () {
      return $http.get(url+'/employees/').then(function (response) {
              // promise is fulfilled
              deferred.resolve(response.data);
              // promise is returned
              return deferred.promise;
          }, function (response) {
              // the following line rejects the promise 
              deferred.reject(response);
              // promise is returned
              return deferred.promise;
          });
    };
    return this;
}]);
         