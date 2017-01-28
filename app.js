class MoviesController {
    constructor ($http, $scope) {
        'ngInject';
        this.$http = $http;
        this.$scope = $scope;
        this.getMovies();
        //this.getMessages();
    }

    getMovies() {
        var vm = this;
        vm.$http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=97c9873a035726c716e8254e0a0e8ed1&language=en-US&page=1")
	    .then(function(response) {
	        vm.$scope.topMovies = response.data;
	    });
    }
}

var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/movies');
    
    $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: 'partial-home.html',
            controller: 'moviesController'
        })
        .state('movie', {
            url: '/movies/{movieid}',
            templateUrl: 'partial-movie.html',
            controller: 'movieController'
        });
});

routerApp
.controller('moviesController', MoviesController)
.controller('movieController', function($scope, $stateParams, $http) {
    $http.get("https://api.themoviedb.org/3/movie/" + $stateParams.movieid + "?api_key=97c9873a035726c716e8254e0a0e8ed1&language=en-US")
    .then(function(response) {
        $scope.movie = response.data;
    });
});