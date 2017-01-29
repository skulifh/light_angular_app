//Movies controller. Used in the page with the movies list
function moviesController($scope, $http, $rootScope) {

  //Fetching the top movies from the API service, and defining the appropriate angular models.
	$scope.getTop10Movies = function() {

    //Fetch the movies list from the API service.
  	$http.get("https://api.themoviedb.org/3/movie/top_rated", {
      params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1 }
    })
		.then(
      //Success function
      function(response) {
  		 	$scope.topMovies = response.data;
  		 	$scope.infoText = "Showing top 10 movies:";
  	 		$scope.Movies = $scope.topMovies;
  		},
      //Error fallback function
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );

    //Saving the state of the scope to the rootscope.
		$rootScope.moviesScope = $scope;
	}

  //Searching for a movie from the API service, and defining the appropriate angular models.
	$scope.searchMovies = function() {

    //If the search query string is less than 3 characters then falling back to the top10 movies and displaying them
		if ($scope.query.length == 0){
			$scope.infoText = "Showing top 10 movies:";
			$scope.Movies = $scope.topMovies;
		}

    //If the search query string is 3 or more characters then sending a request to the API service with the search string.
		else if ($scope.query.length >= 3) {

      //Fetch the movies that match the search query string from the API service. 
			$http.get("https://api.themoviedb.org/3/search/movie", {
        params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1, include_adult: false, query: $scope.query }
      })
			.then(
        //Success function
        function(response) {
  				$scope.infoText = "Search results for \"" + $scope.query + "\":";
  			 	$scope.Movies = response.data;
  			},
        //Error fallback function
        function(error) {
          $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
        }
      );
		} 

    //If the search query string is 1 or 2 characters then do this.
		else {
			$scope.infoText = "Type in at least 3 characters to search";
			$scope.Movies = $scope.topMovies;
		}

    //Saving the state of the scope to the rootscope.
		$rootScope.moviesScope = $scope;
	}

  //Initialization function. This is run initially for the controller. Here we are seting the models according to the previous state.
	$scope.init = function() {
		if ($rootScope.moviesScope != undefined) {
			$scope.Movies = $rootScope.moviesScope.Movies;
			$scope.query = $rootScope.moviesScope.query;
			$scope.infoText = $rootScope.moviesScope.infoText;
			$scope.topMovies = $rootScope.moviesScope.topMovies;
		}

    //If there is no previous state then fetch the top movies again and display that
		if ($scope.Movies == null) {
			$scope.getTop10Movies();
		}
	}

  //Run the initialization function.
	$scope.init();
}