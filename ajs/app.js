var app = angular.module('myapp', ['ui.router']);

/*app.config(function($stateProvider, $urlRouterProvider){
 $urlRouterProvider.otherwise('home');
 $stateProvider
   .state('home', {
     url: '/home',
     templateUrl: 'home.html',
     controller: 'MainController'
   });
});*/

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainController'
    });

  $stateProvider
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsController'
    });

  $urlRouterProvider.otherwise('home');
}]);


app.factory('posts', function(){
  var o = {
  	posts: []
  };
  return o;
});

app.controller('PostsController', function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };
});

app.controller('MainController', function($scope, posts){
  $scope.headtitle = "Angular With Rails";
  $scope.posts = posts.posts;
  
  $scope.addPost = function(){
  	if( !$scope.title || $scope.title === '' ) { return  ; }
  	$scope.posts.push({ 
  		title: $scope.title, 
  		link: $scope.link, 
  		upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}  
        ] 
  	});
  	$scope.title = '';
  	$scope.link = '';
  }
  $scope.incrementUpvotes = function(post) {
  	post.upvotes +=1;
  }
});