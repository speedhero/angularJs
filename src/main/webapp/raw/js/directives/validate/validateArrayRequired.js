/**
 * @description: 验证数组是否为空
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateArrayRequired', [function () {
        return {
            require: 'ngModel',
            scope: {
                validateArrayRequired: '='
            },
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch('validateArrayRequired', function(value) {
                    if (value.length) {
                        ctrl.$setViewValue(value);
                        ctrl.$setValidity('arrayRequired', true);
                    } else {
                        ctrl.$setValidity('arrayRequired', false);
                    }
                });

            }
        };
    }]);
