var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/movies');
  
  $stateProvider

    //Movies list state, also the main state
    .state('movies', {
        url: '/movies',
        templateUrl: 'partial-home.html',
        controller: 'moviesController',
        controllerAs: 'movies'
    })

    //Individual movie state
    .state('movie', {
        url: '/movies/{movieid}',
        templateUrl: 'partial-movie.html',
        controller: 'movieController'
    })

    //Tv shows list state
    .state('tvshows', {
        url: '/tvshows',
        templateUrl: 'partial-tvshows.html',
        controller: 'tvshowsController',
        controllerAs: 'tvshows'
    })

    //Individual tv show state
    .state('tvshow', {
        url: '/tvshows/{tvshowid}',
        templateUrl: 'partial-tvshow.html',
        controller: 'tvshowController'
    });
});

//Function that runs initially. Used to set the API key.
routerApp.run(function($rootScope) {
  $rootScope.movieDbApi = "97c9873a035726c716e8254e0a0e8ed1";
});

//Setting the controllers
routerApp

//Movies controller. Used in the page with the movies list
.controller('moviesController', function($scope, $http, $rootScope) {

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
})

//Movie controller. Used on the page for the individual movies.
.controller('movieController', function($scope, $stateParams, $http, $rootScope) {

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
})

//TV shows controller. Used in the page with the tv shows list
.controller('tvshowsController', function($scope, $http, $rootScope) {

  //Fetching the top tv shows from the API service, and defining the appropriate angular models.
  $scope.getTop10Tvshows = function() {

    //Fetch the tv shows list from the API service.
    $http.get("https://api.themoviedb.org/3/tv/top_rated", {
      params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1 }
    })
    .then(
      //Success function
      function(response) {
        $scope.topTvshows = response.data;
        $scope.infoText = "Showing top 10 tvshows:";
        $scope.Tvshows = $scope.topTvshows;
      },
      //Error fallback function
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );

    //Saving the state of the scope to the rootscope.
    $rootScope.tvshowsScope = $scope;
  }

  $scope.searchTvshows = function() {

    //If the search query string is less than 3 characters then falling back to the top10 tv shows and displaying them
    if ($scope.query.length == 0){
      $scope.infoText = "Showing top 10 tvshows:";
      $scope.Tvshows = $scope.topTvshows;
    }

    //If the search query string is 3 or more characters then sending a request to the API service with the search string.
    else if ($scope.query.length >= 3) {

      //Fetch the tv shows that match the search query string from the API service. 
      $http.get("https://api.themoviedb.org/3/search/tv", {
        params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1, include_adult: false, query: $scope.query }
      })
      .then(
        //Success function
        function(response) {
          $scope.infoText = "Search results for \"" + $scope.query + "\":";
          $scope.Tvshows = response.data;
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
      $scope.Tvshows = $scope.topTvshows;
    }

    //Saving the state of the scope to the rootscope.
    $rootScope.tvshowsScope = $scope;
  }

  //Initialization function. This is run initially for the controller. Here we are seting the models according to the previous state.
  $scope.init = function() {
    //alert(JSON.stringify($rootScope.tvshowsScope));
    if ($rootScope.tvshowsScope != undefined) {
      $scope.Tvshows = $rootScope.tvshowsScope.Tvshows;
      $scope.query = $rootScope.tvshowsScope.query;
      $scope.infoText = $rootScope.tvshowsScope.infoText;
      $scope.topTvshows = $rootScope.tvshowsScope.topTvshows;
    }

    //If there is no previous state then fetch the top tv shows again and display that
    if ($scope.Tvshows == null) {
      $scope.getTop10Tvshows();
    }
  }

  $scope.init();
})

//TV show controller. Used on the page for the individual tv shows.
.controller('tvshowController', function($scope, $stateParams, $http, $rootScope) {
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

);