angular.module('mealCalculator',['ui.router','ngAnimate']).

	config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.otherwise("/home");

		$stateProvider.

		state('home',{
			url : '/home',
			templateUrl : 'partials/home.html'
		}).

		state('newMeal',{
			url : '/New Meal',
			templateUrl : 'partials/newMeal.html'
		}).

		state('myEarnings',{
			url : '/My Earnings',
			templateUrl : 'partials/myEarnings.html'
		});

	}).

	controller('rootCtrl',function($rootScope,$scope){

		var init = function(){

			$rootScope.earnings={

				tipTotal: 0.00,
				mealCount: 0,
				tipAverage: 0.00

			};

		};

		init();

		$scope.$on('mdSubmit',function(event,inputs){

			console.log('caught');

			$rootScope.earnings.tipTotal += inputs.basePrice.value * inputs.tipPercentage.value / 100;

			$rootScope.earnings.mealCount++;

			$rootScope.earnings.tipAverage = $rootScope.earnings.tipTotal /  $rootScope.earnings.mealCount;

		})

		$scope.reset = function(){

			$rootScope.$broadcast('reset');

		};

	}).

	controller('mdCtrl',function($rootScope,$scope){

		$scope.init = function(){

			$scope.submitted = false;

			$scope.inputs={

				basePrice:{
					label: "Base Meal Price: $",
					value:undefined,
					index: 1
				},

				taxRate:{
					label:"Tax Rate: %",
					value:8.5,
					index: 2
				},

				tipPercentage:{
					label:"Tip Percentage: %",
					value:17.0,
					index: 3
				}

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

		$scope.$watch('inputs',function(newVal,oldVal){

			$rootScope.$broadcast('mdEdit',$scope.inputs);

		},true);

	}).

	controller('ccCtrl',function($rootScope,$scope){

		$scope.inputs = {};

		$scope.$on('mdEdit',function(event,inputs){

			$scope.inputs.subTotal = inputs.basePrice.value + inputs.basePrice.value * inputs.taxRate.value / 100;

			$scope.inputs.tip = inputs.basePrice.value * inputs.tipPercentage.value / 100;

			$scope.inputs.total = $scope.inputs.subTotal + $scope.inputs.tip;

		})

	}).

	controller('eiCtrl',function($rootScope,$scope){

		var init = function(){

			$rootScope.earnings={

				tipTotal: 0.00,
				mealCount: 0,
				tipAverage: 0.00

			};

		}

		$scope.$on('reset',function(){

			init();

		});

	}).

	filter('orderObjectBy', function() {
	  
	  return function(items, field, reverse) {

	    var filtered = [];

	    angular.forEach(items, function(item) {

	      filtered.push(item);
	    
	    });
	    
	    filtered.sort(function (a, b) {
	    
	      return (a[field] > b[field] ? 1 : -1);
	    
	    });
	    
	    if(reverse) filtered.reverse();
	    
	    return filtered;
	  
	  };

	});