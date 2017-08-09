myapp.controller('EmployeeAddController',['$scope','$routeParams','$q','EmployeeApiFactory','$timeout','$mdDialog','$location', function($scope, $routeParams,$q,EmployeeApiFactory,$timeout,$mdDialog,$location) {
    $scope.employee = {
        designation: '',
        email: '',
        firstName: '',
        lastName: '',
        employeeID:'',
        company: 'MYCOM',
        address: '',
        phone: '',
        doj: "",
        dob: "",
        age:"",
        gender:''
    };

    $scope.saveEmployee = function(){
        var employeedata = $scope.employee;
        if(employeedata.email && employeedata.firstName && employeedata.lastName && employeedata.employeeID && employeedata.designation){
            console.log(employeedata);
            EmployeeApiFactory.addEmployee(employeedata).then(function (response) {
                console.log(response);
                console.log(response._id)
                if(response._id){

                    var confirm = $mdDialog.confirm()
                        .title("User Created")
                        .textContent('The user got created. Click ok to redirect to the Employee list')
                        .ariaLabel('User created')
                        .targetEvent()
                        .ok('Yes!')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function() {
                        console.log(employee)
                         $location.path('/');

                    });
                } else {
                    var errmsg = (response.message)?response.message:response.errmsg;
                    $mdDialog.show(
                    $mdDialog.alert()
                        .title('Error')
                        .textContent(response.message)
                        .ariaLabel('Action Message')
                        .ok('Close!')
                        .targetEvent(event)
                );}

            }, function (error) {
                console.log("werwe");

            });
        }

    };



}]);
