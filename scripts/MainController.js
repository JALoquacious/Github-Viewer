(function() {

    let app = angular.module("githubViewer");

    function MainController($scope, $interval, $location) {
        
        function decrementCountdown() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        let countdownInterval = null;

        function startCountdown() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = function(username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }
            $location.path("/user/" + username);
        }

        $scope.username = "Angular";
        $scope.countdown = 10;

        startCountdown();
    }

    app.controller("MainController", MainController);

}());