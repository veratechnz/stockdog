'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
  	//Initializations
  	$scope.companies = CompanyService.query();
  	$scope.watchlist = WatchlistService.query($routeParams.listParams.listId);
  	$scope.stocks = $scope.watchlist.stocks;
  	$scope.newStock = {};
  	var addStockModal = $modal({
  		scope: $scope,
  		template: 'views/templates/addstock-modal.html',
  		show: false
  	});

  	// 2. Expose showStockModal to view via scope
  	$scope.showStockModal = function() {
  		addStockModal.$promise.then(addStockModal.show);
  	};

  	// 3. Call the watchlistModel addStock() function and hide the modal.
  	$scope.addStock = function (){
  		$scope.watchlist.addStock({
  			listId: $routeParams.listId,
  			company: $scope.newStock.company,
  			shares: $scope.newStock.shares
  		});
  		addStockModal.hide();
  		$scope.newStock = {};
  	};
  });
