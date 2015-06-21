/**
 * @description: Product filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.product.filters', [])
    //-- 上架状态
    .filter('productShelvesStatus', ['productConstants', function (productConstants) {
        return function (value) {
            var items = _.where(productConstants.shelvesStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
    //-- 监控状态
    .filter('productWatchStatus', ['productConstants', function (productConstants) {
        return function (value) {
            var items = _.where(productConstants.watchStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;

