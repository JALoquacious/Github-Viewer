(function() {

    function github($http) {

        function getUser(username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                    return response.data;
                });
        }

        function getRepos(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    console.log("repos_url:", response.data)
                    return response.data;
                });
        }
        
        function getRepoDetails(username, reponame) {
            let repo;
            let repoUrl = `https://api.github.com/repos/${username}/${reponame}`;
            
            return $http.get(repoUrl)
                .then(function(response) {
                    repo = response.data;
                    return $http.get(repoUrl + "/contributors");
                })
                .then(function(response) {
                    repo.contributors = response.data;
                    return repo;
                })
        }

        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };
    }
    angular.module("githubViewer").service("github", github);
}());