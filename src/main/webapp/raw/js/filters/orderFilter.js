/**
 * @description:订单过滤器
 *
 * @author:caibin
 **/
angular.module('flymvo.order.filters', [])
    //下单时间过滤器
    .filter('placeOrderTime', function () {
        return function (value) {
            return moment.lang('zh-cn', value);
        };
    })
    //-- 发票的商品类型
    .filter('invoiceItemContent', ['orderConstants', function (orderConstants) {
        return function (value) {
            if(angular.isUndefined(value))return "";
            var items = _.where(orderConstants.invoiceItemContents, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //订单类型
    .filter('orderTypes', ['orderConstants', function(orderConstants) {
        return function (label){
            if(!label) return;
            var item = _.findWhere(orderConstants.orderTypes, {value: label});

            if(angular.isDefined(item.status)){
                return parseInt(item.status);
            }else{
                return 0;
            }
        };
    }])

    //运单号处理状态
    .filter('transportNoHandlingStatus', ['orderConstants', function(orderConstants) {
        return function (value){
            var items = _.where(orderConstants.transportNoHandlingStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //修改运单号状态
    .filter('pendTrackingOrderStatus', ['orderConstants', function(orderConstants) {
        return function (value){
            var items = _.where(orderConstants.pendTrackingOrderStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
;