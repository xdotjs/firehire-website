var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', 
	function($scope, $http){
		console.log('hello from controller.js');
		var refresh = function() {
			$http.get('/joblist').success(function(response) {
			console.log('received json data');
			$scope.joblist = response;
			$scope.company = "";
			});

		};

		refresh();
		
		$scope.addContact = function() {
			console.log($scope.company);
			$http.post('/joblist', $scope.company).success(
				function(response) {
					console.log(response);
					refresh();
				});
		};

		$scope.remove = function(id) {
			console.log(id);
			$http.delete('/joblist/' + id).success(
				function(response) {
					refresh();
				});

		};

		$scope.edit = function(id) {
			console.log(id);
			$http.get('/joblist/' + id).success(
				function(response) {
					$scope.company = response;
				});
		};

		$scope.update = function() {
			console.log($scope.company._id);
			$http.put('/joblist/' + $scope.company._id, $scope.company).success(
				function(response) {
					refresh();
				});
		};

		$scope.deselect = function() {
			$scope.company = "";
		};

	}]);
