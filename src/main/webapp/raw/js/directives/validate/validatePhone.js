/**
 * @description: 验证电话
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validatePhone', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('phone', true);
                        return viewValue;
                    }
                    if (PHONE_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('phone', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('phone', false);
                        return undefined;
                    }
                });
            }
        };
    }]);
