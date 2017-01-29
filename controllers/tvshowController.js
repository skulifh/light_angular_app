function tvshowController($scope, $stateParams, $http, $rootScope) {
  $scope.init = function() {

    //Fetch the data regarding the tv show in question 
    $http.get("https://api.themoviedb.org/3/tv/" + $stateParams.tvshowid, {
      params: { api_key: $rootScope.movieDbApi, language: "en-US" }
    })
    .then(
      //Success function
      function(response) {
        $scope.tvShow = response.data;
      },
      //Error fallback function
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );
  }

  $scope.init();
}