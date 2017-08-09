myapp.controller('EmployeeListController',['$scope','$rootScope','$routeParams','$q','EmployeeApiFactory','$timeout','$mdDialog', function($scope,$rootScope, $routeParams,$q,EmployeeApiFactory,$timeout,$mdDialog) {
    $scope.employeeData = {};

    $scope.customFullscreen = false;
    $scope.selectedEmployee = {};
    $scope.csvHeaderData = [];
    $scope.$watch('employeeDetails', function() {
        EmployeeApiFactory.getAllEmployees().then(function (response) {
                $scope.employeeData = response;
                $scope.csvHeaderData = $scope.prepareCSVHeaderData();
        }, function (error) {
            console.log(error.statusText);
        });
    });

    $scope.csvFileName = 'Employee_Details-'+formatDate();
    $scope.fieldSeparator = ',';
    $scope.decimalSeparator ='.';

  $scope.deleteEmployee = function (employee){
      var indexToDelete  = null;
      angular.forEach($scope.employeeData, function(cb, index) {
          if (cb._id == employee._id) {
              indexToDelete = index;
              $scope.employeeData.splice(indexToDelete,1);
          }
      });

      EmployeeApiFactory.deleteEmployee(employee).then(function (response) {
          $mdDialog.show(
              $mdDialog.alert()
                  .title('User Deleted')
                  .textContent('The user was succesfully deleted!')
                  .ariaLabel('Delete Confirmation')
                  .ok('Close!')
                  .targetEvent(event)
          );
      })
  };

  $scope.prepareCSVHeaderData =function () {
      var jsonObj = $scope.employeeData;
      var keys = Object.keys(jsonObj[0]);
      return keys;
  };




  $scope.navigateTo = function(to, event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Navigating')
                .textContent('Imagine being taken to ' + to)
                .ariaLabel('Navigation demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

  $scope.doPrimaryAction = function(event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Primary Action')
                .textContent('Primary actions can be used for one click actions')
                .ariaLabel('Primary click demo')
                .ok('Awesome!')
                .targetEvent(event)
        );
    };


    $scope.deleteEmployeeBtnAction = function(employee,ev) {
                console.log("deleteAction  called")
        var confirm = $mdDialog.confirm()
            .title("Are you sure you want to delete  Employee Details of "+employee.firstName+" "+employee.lastName+" ?")
            .textContent('All the related details will be deleted!.')
            .ariaLabel('Delete User')
            .targetEvent(ev)
            .ok('Yes!')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            console.log(employee)
            $scope.deleteEmployee(employee)
            $scope.status = 'You decided to get rid of your debt.';
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };
    $scope.goToDetails = function(employee,ev) {

     $rootScope.selectedEmployee=employee
     ;
        $mdDialog.show({
            data: 'test',
            controller: DialogController,
            templateUrl: 'views/employeeDetailDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    function DialogController($scope, $mdDialog) {

        $scope.selectedEmployee = $scope.$root.selectedEmployee;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

}]);
