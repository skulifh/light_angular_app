function movieController($scope, $stateParams, $http, $rootScope) {

  //Initialization function. This is run initially for the controller. Fetching the data for the movie from the API service.
  $scope.init = function() {

    //Fetch the data regarding the movie in question 
    $http.get("https://api.themoviedb.org/3/movie/" + $stateParams.movieid, {
      params: { api_key: $rootScope.movieDbApi, language: "en-US" }
    })
    .then(
      //Success function
      function(response) {
        $scope.movie = response.data;
      },
      //Error fallback function
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );
  }

  //Run the initialization function.
  $scope.init();
}