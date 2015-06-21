/**
 * @description: Bootstrap 3 javascript checkbox and radio button toggle prevents angular's ng-model from updating on input
 * 用于解决此问题的指令 https://github.com/angular/angular.js/issues/4516
 * 解决方法： http://jsfiddle.net/6MPNz/6/
 * @author: Patrick.he
 **/
angular.module('flymvo.checkboxRadioButtonToggle.directives', [])
    .directive('checkboxWithChangeHandler', [function checkboxWithChangeHandler() {
        return {
            replace: false,
            require: 'ngModel',
            scope: false,
            link: function (scope, element, attr, ngModelCtrl) {
                $(element).change(function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(element[0].checked);
                    });
                });
            }
        };
    }]).directive('radioWithChangeHandler', [function checkboxWithChangeHandler() {
        return {
            replace: false,
            require: 'ngModel',
            scope: false,
            link: function (scope, element, attr, ngModelCtrl) {
                $(element).change(function () {
                    if (element[0].checked) {
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(attr.value);
                        });
                    }
                });
            }
        };
    }]);