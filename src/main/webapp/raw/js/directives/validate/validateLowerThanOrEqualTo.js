/**
 * @description: 验证两个field大小
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateLowerThanOrEqualTo', [function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {
                var validate = function(viewValue) {
                    var comparisonModel = $attrs.validateLowerThanOrEqualTo;
                    if(!viewValue || !comparisonModel || (comparisonModel==="")){
                        // It's valid because we have nothing to compare against
                        ctrl.$setValidity('lowerThanOrEqualTo', true);
                    }else{
                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('lowerThanOrEqualTo', parseFloat(viewValue) <= parseFloat(comparisonModel) );
                    }


                    return viewValue;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('validateLowerThanOrEqualTo', function(comparisonModel){
                    // Whenever the comparison model changes we'll re-validate
                    return validate(ctrl.$viewValue);
                });

            }
        };

    }]);
