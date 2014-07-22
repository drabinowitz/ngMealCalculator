angular.module('mealCalculator',[])

	.controller('rootCtrl',function($rootScope,$scope){

		$scope.reset = function(){

			$rootScope.$broadcast('reset');

		}

	})

	.controller('mdCtrl',function($rootScope,$scope){

		$scope.init = function(){

			$scope.submitted = false;

			$rootScope.inputs={};

		};

		$scope.init();

		$scope.$on('reset',function(){

			$scope.init();

		});

		$scope.submit = function(){

			$scope.submitted = true;

			if($scope.mdForm.$valid){

				console.log('Form Submitted: ',$scope.inputs);

				$rootScope.$broadcast('mdSubmit',$scope.inputs);

			} else {

				console.log('form not valid');

			}

		};

	});