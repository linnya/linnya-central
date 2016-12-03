(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngPasswordApp.directive:passwordStrengthIndicator
   * @description
   * Different color showing the strength of a given password
   */
  angular.module('ngPasswordApp', [])
    .directive('passwordStrength',passwordStrengthIndicator);

    function passwordStrengthIndicator() {
        return {
            restrict: 'E',
            scope: {
                target: '='
            },
            link: function ($scope, element, attrs) {
                $scope.strength = 0;
                var strength = {
                    measureStrength: function (p) {
                        var _passedMatches = 0;
                        var _regex = /[$@&+#-/:-?{-~!"^_`\[\]]/g;
                        if (/[a-z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (/[A-Z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (_regex.test(p)) {
                            _passedMatches++;
                        }
                        return _passedMatches;
                    }
                };
                $scope.$watchCollection('target', function (newValue) {
                    if (newValue) {
                        var c = strength.measureStrength(newValue);
                        if(c === 1) $scope.strength = 33;
                        if(c === 2) $scope.strength = 63;
                        if(c === 3) $scope.strength = 100;
                    }
                });
            },
            template: '<md-progress-linear class="bg-{{strength}}" md-mode="determinate" value="{{strength}}"></md-progress-linear>'
        };
    }
})();

