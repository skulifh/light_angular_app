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
.controller('moviesController', moviesController)

//Movie controller. Used on the page for the individual movies.
.controller('movieController', movieController)

//TV shows controller. Used in the page with the tv shows list
.controller('tvshowsController', tvshowsController)

//TV show controller. Used on the page for the individual tv shows.
.controller('tvshowController', tvshowController);