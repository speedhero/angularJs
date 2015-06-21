/**
 * @description: Consult filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.consult.filters', [])
    //-- 提问类型
    .filter('consultType', ['consultConstants', function (consultConstants) {
        return function (value) {
            var items = _.where(consultConstants.types, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
    //-- 回复状态
    .filter('consultStatus', ['consultConstants', function (consultConstants) {
        return function (value) {
            var items = _.where(consultConstants.statuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;

