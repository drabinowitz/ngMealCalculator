angular.module('mealCalculator',[])

	.controller('rootCtrl',function($rootScope,$scope){

		$scope.reset = function(){

			$rootScope.$broadcast('reset');

		}

	})

	.controller('mdCtrl',function($rootScope,$scope){

		var init = function(){

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

		init();

	});