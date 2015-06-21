/**
 * @description: 验证是否符合面额
 * @author: allen.chan
 **/

angular.module('flymvo.validate.directives')
    .directive('validateAmount', [function () {
        return {
          require: "ngModel",
          link: function (scope, element, attr, ngModel) {
              if (ngModel) {
                 // var Regexp = /(^[1-9][0-9]{0,2}$)|(^1000$)/;
                 // var Regexp = /^(?:0\.\d{1,2}|[1-9]\d{0,2}(?:\.\d{1,2})?|1000)$/;
                  //var Regexp = ^(?:0\.(?:[1-9]{1,2}|0[1-9])|[1-9]\d{0,2}(?:\.[1-9]{1,2}|\.0[1-9])?|1000)$;
                  //var Regexp = /^(?!00)(?:[0-9]{1,3}|1000)$/;
                  //var Regexp1 = /^([1-9]\d*)*[0|5]$/; 
                  //var Regexp = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;
                  var Regexp = /^\d+(\.{0,1}\d+){0,1}$/;
              }
              var customValidator = function (value) {
                  var validity = ngModel.$isEmpty(value) ; 
                  validity =  Regexp.test(value) && (value%5 === 0)&& (value >0) && (value <= 1000.00); 
                  
                  ngModel.$setValidity("validateAmount", validity); 
                  return validity ? value : undefined;
              };
              ngModel.$formatters.push(customValidator);
              ngModel.$parsers.push(customValidator);
          }
      };
    }]);
