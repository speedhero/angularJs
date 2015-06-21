/**
 * @description: Consult filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.promo.filters', [])
    //-- 促销价类型
    .filter('promoPriceStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.promoPriceStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //--店铺优惠类型
    .filter('salesRuleType', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleTypes, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 店铺优惠状态
    .filter('salesRuleStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 店铺优惠范围类型
    .filter('salesRuleRangeType', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleRangeTypes, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 推荐组合状态
    .filter('groupPromoStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.groupPromoStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 搭配组合状态
    .filter('bundlingStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.bundlingStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;

