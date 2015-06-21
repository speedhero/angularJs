/**
 * @description: 验证是否正整数
 * @author: Patrick.he
 **/
angular.module('flymvo.validate.directives')
    .directive('validatePositiveInteger', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    }else{
                        if (INTEGER_REGEXP.test(viewValue)) {
                            var intVar = parseInt(viewValue);
                            if(intVar && intVar > 0){
                                ctrl.$setValidity('integer', true);
                                return intVar;
                            }else{
                                ctrl.$setValidity('integer', false);
                                return viewValue;
                            }
                        } else {
                            ctrl.$setValidity('integer', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);