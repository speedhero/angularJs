/**
 * @description:促销过滤器 
 * @author:allen.chan
 **/
angular.module('flymvo.coupon.filters', [])
    
    //-- 
    .filter('couponStatus', ['couponConstants', function (couponConstants) {
        return function (value) {
            if(angular.isUndefined(value)) return "";
            var item = _.findWhere(couponConstants.couponStatus, {value:'' + value});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])
;