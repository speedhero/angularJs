/**
 * @description: 验证是否整数
 * @author: Patrick.he
 **/
angular.module('flymvo.validate.directives')
    .directive('validateInteger', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    }else{
                        if (INTEGER_REGEXP.test(viewValue)) {
                            ctrl.$setValidity('integer', true);
                            return parseInt(viewValue);
                        } else {
                            ctrl.$setValidity('integer', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);