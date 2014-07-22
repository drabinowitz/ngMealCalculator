angular.module('mealCalculator',[])

	.controller('rootCtrl',function($rootScope,$scope){

		$scope.reset = function(){

			$rootScope.$broadcast('reset');

		}

	})

	.controller('mdCtrl',function($rootScope,$scope){

		$scope.init = function(){

			$scope.submitted = false;

			$rootScope.inputs={

				taxRate: 8.5,
				tipPercentage: 17.0

			};

		};

		$scope.init();

		$scope.$on('reset',function(){

			$scope.init();

		});

		$scope.submit = function(){

			$scope.submitted = true;

			if($scope.mdForm.$valid){

				$rootScope.$broadcast('mdSubmit',$scope.inputs);

				$scope.init();

			} else {

				console.log('form not valid');

			}

		};

	})

	.controller('eiCtrl',function($rootScope,$scope){

		var init = function(){

			$scope.earnings={

				tipTotal: 0.00,
				mealCount: 0,
				tipAverage: 0.00

			};

		}

		init();

		$scope.$on('reset',function(){

			init();

		});

		$scope.$on('mdSubmit',function(event,inputs){

			$scope.earnings.tipTotal += inputs.basePrice * inputs.tipPercentage / 100;

			$scope.earnings.mealCount++;

			$scope.earnings.tipAverage = $scope.earnings.tipTotal /  $scope.earnings.mealCount;

		})

	});