'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http',
  function($scope, Global, $http) {
    $scope.global = Global;
    
	
	
	$scope.dontLikeSend = function(){
		$scope.selectionPage = true;
		$scope.facebookIconStyle.opacity = 1;
		$scope.suggestionBarStyle.width = '400px';
		$http.post('backend', {'username':'AAA', 'share_eat':'BBB', 'no_eat':$scope.noEat})
			.success(function(response){
				$scope.suggestPerson = response.username;
				$scope.suggestFood = response.food;
				console.log(response);
			});
	};
	
	$scope.selectionPage = false;
	$scope.facebookIconStyle = {'opacity': 0};
	$scope.suggestionBarStyle = {'width': 0};
  }
]);
