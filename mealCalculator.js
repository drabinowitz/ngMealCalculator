angular.module('mealCalculator',[])

	.controller('rootCtrl',function($rootScope,$scope){

		$scope.reset = function(){

			$rootScope.$broadcast('reset');

		}

	})

	.controller('mdCtrl',function($rootScope,$scope){

		$scope.init = function(){

			$scope.submitted = false;

			$scope.inputs=[

				{
				
					label:"Base Meal Price: $",
					name:"basePrice",
					type:"number"

				},

				{
		
					label:"Tax Rate: %",
					name:"taxRate",
					type:"number"

				},

				{
				
					label:"Tip Percentage: %",
					name:"tipPercentage",
					type:"number"

				}

			]

		};

		$scope.init();

		$scope.$on('reset',function(){

			init();

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

	})

	.controller('ccCtrl',function($scope){

		var init = function(){

			$scope.subTotals = [

				{

					name:"Subtotal",
					value:0.00

				},

				{

					name:"Tip",
					value:0.00

				},

				{

					name:"Total",
					value:0.00

				},

			]

		};

		$scope.$on('reset',function(){

			init();

		});

	});