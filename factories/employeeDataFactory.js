angular.module('EmiratesTestApp.services', [])
    .factory('employeeDataService', function ($http) {
        var githubUrl = 'https://api.github.com';
        var runUserRequest = function (username, path) {

            return $http({
            method: 'JSONP',
                url
        :
            githubUrl + '/users/' +
            username + '/' +
            path + '?callback=JSON_CALLBACK'
        }
    );
}
// Return the service object with a single function // events
return {
    events: function (username) {
        return runUserRequest(username, 'events');
    }
};
})