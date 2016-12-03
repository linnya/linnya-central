(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('chat.dashboard', dashCtrl);


    function dashCtrl($scope) {
    	$scope.selected = [];
  		$scope.limitOptions = [5, 10, 15];

    	$scope.desserts = {
		    "count": 9,
		    "data": [
		      {
		        "name": "Frozen yogurt",
		        "type": "Ice cream",
		        "calories": { "value": 159.0 },
		        "fat": { "value": 6.0 },
		        "carbs": { "value": 24.0 },
		        "protein": { "value": 4.0 },
		        "sodium": { "value": 87.0 },
		        "calcium": { "value": 14.0 },
		        "iron": { "value": 1.0 }
		      }, {
		        "name": "Ice cream sandwich",
		        "type": "Ice cream",
		        "calories": { "value": 237.0 },
		        "fat": { "value": 9.0 },
		        "carbs": { "value": 37.0 },
		        "protein": { "value": 4.3 },
		        "sodium": { "value": 129.0 },
		        "calcium": { "value": 8.0 },
		        "iron": { "value": 1.0 }
		      }, {
		        "name": "Eclair",
		        "type": "Pastry",
		        "calories": { "value":  262.0 },
		        "fat": { "value": 16.0 },
		        "carbs": { "value": 24.0 },
		        "protein": { "value":  6.0 },
		        "sodium": { "value": 337.0 },
		        "calcium": { "value":  6.0 },
		        "iron": { "value": 7.0 }
		      }, {
		        "name": "Cupcake",
		        "type": "Pastry",
		        "calories": { "value":  305.0 },
		        "fat": { "value": 3.7 },
		        "carbs": { "value": 67.0 },
		        "protein": { "value": 4.3 },
		        "sodium": { "value": 413.0 },
		        "calcium": { "value": 3.0 },
		        "iron": { "value": 8.0 }
		      }, {
		        "name": "Jelly bean",
		        "type": "Candy",
		        "calories": { "value":  375.0 },
		        "fat": { "value": 0.0 },
		        "carbs": { "value": 94.0 },
		        "protein": { "value": 0.0 },
		        "sodium": { "value": 50.0 },
		        "calcium": { "value": 0.0 },
		        "iron": { "value": 0.0 }
		      }
		    ]
		  };
    }

    dashCtrl.$inject = ['$scope'];


})();