function tvshowsController($scope, $http, $rootScope) {

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
}