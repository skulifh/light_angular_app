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
        });
});

routerApp
.controller('moviesController', function($scope, $http, $rootScope) {

	$scope.getTop10Movies = function() {
  	$http.get("https://api.themoviedb.org/3/movie/top_rated", {
      params: { api_key: $rootScope.movieDbApi, language: "en-US", page: 1 }
    })
		.then(function(response) {
		 	$scope.topMovies = response.data;
		 	$scope.infoText = "Showing top 10 movies:";
	 		$scope.Movies = $scope.topMovies;
		});

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
			.then(function(response) {
				$scope.infoText = "Search results for \"" + $scope.query + "\":";
			 	$scope.Movies = response.data;
			});
		} 
		else {
			$scope.infoText = "Type in at least 3 characters to search";
			$scope.Movies = $scope.topMovies;
		}

		$rootScope.moviesScope = $scope;
	}

	$scope.init = function() {
    $rootScope.movieDbApi = "97c9873a035726c716e8254e0a0e8ed1";
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

.controller('movieController', function($scope, $stateParams, $http) {
    $http.get("https://api.themoviedb.org/3/movie/" + $stateParams.movieid + "?api_key=97c9873a035726c716e8254e0a0e8ed1&language=en-US")
    .then(function(response) {
        $scope.movie = response.data;
    });
});