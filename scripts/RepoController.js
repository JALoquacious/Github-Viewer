(function() {
    let app = angular.module("githubViewer");

    function RepoController($scope, $routeParams, github) {

        function onRepo(data) {
            $scope.repo = data;
        }

        function onError(reason) {
            $scope.error = reason;
        }

        let username = $routeParams.username;
        let reponame = $routeParams.reponame;

        github.getRepoDetails(username, reponame)
            .then(onRepo, onError);
    }

    app.controller("RepoController", RepoController);
}());