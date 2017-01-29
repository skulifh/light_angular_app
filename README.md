<h1>Solution notes</h1>

To run open the <b>main.html</b> file in any browser. Chrome browser can have some ross origin request problem but a local web-server should solve that problem. However, Firefox should have no problem in that regards.

A web-server was not implemented during this project since that is out of scope for this case. The main focus was on AngularJS and HTML.

The solution uses angular promises for requests to the MovieDB API, UI-router for routing, and dependency injection. It then uses the Bootstrap frontend framework to allow for a responsive UI.


<h1>Problem</h1>
Please create a Movie Web App.<br><br>
Requirements:
<br>
<li>use Angular 1.5.x version<br></li>
<li>use angular dependency injection</li>
<li>use angular promises</li>
<li>use angular ui-router for routing</li>
<li>UI should be responsive use Bootstrap</li>
<li>for data use REST API provided by https://developers.themoviedb.org/3/getting-started (e.g. to get list of top rated TV shows)</li>
<br><br>
Features:<br>
<li>display 10 top rated TV shows or 10 top rated movies</li>
<li>implement live search for movies and TV shows after more than 3 characters entered. The search is server side which means that results should be shown for all movies and not only for the top rated.</li>
<li>back button should return to the previous screen and not previous view (see the UI)</li>
