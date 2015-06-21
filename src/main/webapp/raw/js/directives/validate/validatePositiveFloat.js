/**
 * @description: 验证是否浮点数
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validatePositiveFloat', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('float', true);
                        return viewValue;
                    }else{
                        if (FLOAT_REGEXP.test(viewValue) && !isNaN(parseFloat(viewValue))) {
                            var floatVar = parseFloat(viewValue);
                            if(floatVar > 0){
                                ctrl.$setValidity('float', true);
                                return parseFloat(viewValue);
                            }else{
                                ctrl.$setValidity('float', false);
                                return viewValue;
                            }
                        } else {
                            ctrl.$setValidity('float', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);