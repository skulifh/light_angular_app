var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/movies');
    
    $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: 'partial-home.html',
            controller: 'moviesController',
            controllerAs: 'movies'
        })
        .state('movie', {
            url: '/movies/{movieid}',
            templateUrl: 'partial-movie.html',
            controller: 'movieController'
        })
        .state('tvshows', {
            url: '/tvshows',
            templateUrl: 'partial-tvshows.html',
            controller: 'tvshowsController',
            controllerAs: 'tvshows'
        })
        .state('tvshow', {
            url: '/tvshows/{tvshowid}',
            templateUrl: 'partial-tvshow.html',
            controller: 'tvshowController'
        });
});

routerApp.run(function($rootScope) {
  $rootScope.movieDbApi = "97c9873a035726c716e8254e0a0e8ed1";
});

routerApp
.controller('moviesController', function($scope, $http, $rootScope) {

	$scope.getTop10Movies = function() {
  	$http.get("https://api.themoviedb.org/3/movie/top_rated", {
      params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1 }
    })
		.then(
      function(response) {
  		 	$scope.topMovies = response.data;
  		 	$scope.infoText = "Showing top 10 movies:";
  	 		$scope.Movies = $scope.topMovies;
  		},
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );

		$rootScope.moviesScope = $scope;
	}

	$scope.searchMovies = function() {
		if ($scope.query.length == 0){
			$scope.infoText = "Showing top 10 movies:";
			$scope.Movies = $scope.topMovies;
		}
		else if ($scope.query.length >= 3) {
			$scope.searching = true;
			$http.get("https://api.themoviedb.org/3/search/movie", {
        params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1, include_adult: false, query: $scope.query }
      })
			.then(
        function(response) {
  				$scope.infoText = "Search results for \"" + $scope.query + "\":";
  			 	$scope.Movies = response.data;
  			},
        function(error) {
          $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
        }
      );
		} 
		else {
			$scope.infoText = "Type in at least 3 characters to search";
			$scope.Movies = $scope.topMovies;
		}

		$rootScope.moviesScope = $scope;
	}

	$scope.init = function() {
		if ($rootScope.moviesScope != undefined) {
			$scope.Movies = $rootScope.moviesScope.Movies;
			$scope.query = $rootScope.moviesScope.query;
			$scope.infoText = $rootScope.moviesScope.infoText;
			$scope.topMovies = $rootScope.moviesScope.topMovies;
		}

		if ($scope.Movies == null) {
			$scope.getTop10Movies();
		}
	}

	$scope.init();
})

.controller('movieController', function($scope, $stateParams, $http, $rootScope) {
  $scope.init = function() {
    $http.get("https://api.themoviedb.org/3/movie/" + $stateParams.movieid, {
      params: { api_key: $rootScope.movieDbApi, language: "en-US" }
    })
    .then(
      function(response) {
        $scope.movie = response.data;
      },
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );
  }

  $scope.init();
})

.controller('tvshowsController', function($scope, $http, $rootScope) {

  $scope.getTop10Tvshows = function() {
    $http.get("https://api.themoviedb.org/3/tv/top_rated", {
      params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1 }
    })
    .then(
      function(response) {
        $scope.topTvshows = response.data;
        $scope.infoText = "Showing top 10 tvshows:";
        $scope.Tvshows = $scope.topTvshows;
      },
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );

    $rootScope.tvshowsScope = $scope;
  }

  $scope.searchTvshows = function() {
    if ($scope.query.length == 0){
      $scope.infoText = "Showing top 10 tvshows:";
      $scope.Tvshows = $scope.topTvshows;
    }
    else if ($scope.query.length >= 3) {
      $scope.searching = true;
      $http.get("https://api.themoviedb.org/3/search/tv", {
        params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1, include_adult: false, query: $scope.query }
      })
      .then(
        function(response) {
          $scope.infoText = "Search results for \"" + $scope.query + "\":";
          $scope.Tvshows = response.data;
        },
        function(error) {
          $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
        }
      );
    } 
    else {
      $scope.infoText = "Type in at least 3 characters to search";
      $scope.Tvshows = $scope.topTvshows;
    }

    $rootScope.tvshowsScope = $scope;
  }

  $scope.init = function() {
    //alert(JSON.stringify($rootScope.tvshowsScope));
    if ($rootScope.tvshowsScope != undefined) {
      $scope.Tvshows = $rootScope.tvshowsScope.Tvshows;
      $scope.query = $rootScope.tvshowsScope.query;
      $scope.infoText = $rootScope.tvshowsScope.infoText;
      $scope.topTvshows = $rootScope.tvshowsScope.topTvshows;
    }

    if ($scope.Tvshows == null) {
      $scope.getTop10Tvshows();
    }
  }

  $scope.init();
})

.controller('tvshowController', function($scope, $stateParams, $http, $rootScope) {
  $scope.init = function() {
    $http.get("https://api.themoviedb.org/3/tv/" + $stateParams.tvshowid, {
      params: { api_key: $rootScope.movieDbApi, language: "en-US" }
    })
    .then(
      function(response) {
        $scope.tvShow = response.data;
      },
      function(error) {
        $scope.infoText = "An error occured! (" + error.status + ". " + error.data.status_message + ")";
      }
    );
  }

  $scope.init();
}

);