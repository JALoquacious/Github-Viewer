(function() {

    let app = angular.module("githubViewer");

    function UserController($scope, github, $routeParams) {
        
        function onUserComplete(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        }

        function onRepos(data) {
            $scope.repos = data;
            $scope.repoCount = data.length;
        }

        function onError(reason) {
            $scope.error = "Error: Could not fetch data.";
        }

        $scope.userName = $routeParams.username;
        $scope.repoSortOrder = "+name";
        
        github.getUser($scope.userName).then(onUserComplete, onError);
    }

    app.controller("UserController", UserController);

}());