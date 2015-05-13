'use strict';

// Taxes controller
angular.module('taxes').controller('TaxesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Taxes', 'TaxTypes',
	function($scope, $stateParams, $location, Authentication, Taxes, TaxTypes ) {
		$scope.authentication = Authentication;

		// Create new Tax
		$scope.create = function() {
			// Create new Tax object
			var tax = new Taxes ({
				name: this.name,
				type: this.selectedType._id,
				value: this.value,
				description: this.description	
			});

			// Redirect after save
			tax.$save(function(response) {
				$location.path('taxes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tax
		$scope.remove = function( tax ) {
			if ( tax ) { tax.$remove();

				for (var i in $scope.taxes ) {
					if ($scope.taxes [i] === tax ) {
						$scope.taxes.splice(i, 1);
					}
				}
			} else {
				$scope.tax.$remove(function() {
					$location.path('taxes');
				});
			}
		};

		// Update existing Tax
		$scope.update = function() {
			var tax = $scope.tax;
			//tax.type = $scope.selectedType._id;

			tax.$update(function() {
				$location.path('taxes/' + tax._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Taxes
		$scope.find = function() {
			$scope.taxes = Taxes.query();
		};

		// Find existing Tax
		$scope.findOne = function() {
			$scope.tax = Taxes.get({ 
				taxId: $stateParams.taxId
			});

	        $scope.types = TaxTypes.query();				
		};

	    $scope.findTypes = function() {
	        $scope.types = TaxTypes.query();
	    }; 		
	}
]);