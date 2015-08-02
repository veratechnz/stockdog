'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */


angular.module('stockDogApp')
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
      	//[2] Initialize variables
      	$scope.watchlist = {};
      	$scope.currentList = $routeParams.listId;
      	var addListModal = $modal({
      		scope: $scope,
      		template: 'views/templates/addlist-modal.html',
      		show: false
      	});

      	//[3] Bind model from service to this scope.
      	$scope.watchlists = WatchlistService.query();

      	//[4] Display adlist modal
      	$scope.showModal = function (){
      		addListModal.$promise.then(addListModal.show);
      	};

      	//[5]Create a new list from fields in modal
      	$scope.createList = function (){
      		WatchlistService.save($scope.watchlist);
      		addListModal.hide();
      		$scope.watchlist = {};
      	};

      	//[6] Delete desired list and re-direct to home
      	$scope.deleteList = function (list) {
      		WatchlistService.remove(list);
      		$location.path('/');
      	};

      	$scope.gotoList = function (listId) {
      		$location.path('watchlist/' + listId);
      	};
      }
    };
  });
