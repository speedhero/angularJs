/**
 * @description: 验证两个field大小
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateLargeThan', [function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {

                var validate = function(viewValue) {
                    var comparisonModel = $attrs.validateLargeThan;
                    if(!viewValue || !comparisonModel || (comparisonModel==="")){
                        // It's valid because we have nothing to compare against
                        ctrl.$setValidity('largeThan', true);
                    }else{
                        // It's valid if model is large than the model we're comparing against
                        ctrl.$setValidity('largeThan', parseFloat(viewValue) > parseFloat(comparisonModel) );
                    }
                    return viewValue;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('validateLargeThan', function(comparisonModel){
                    // Whenever the comparison model changes we'll re-validate
                    return validate(ctrl.$viewValue);
                });

            }
        };

    }]);
