/**
 * @description: refund filters
 *
 * @author: max.huang
 **/

angular.module('flymvo.refund.filters', [])
    //-- 售后类型
    .filter('refundType', ['refundConstants', function (refundConstants) {
        return function (value) {
            if(!value) return;
            var item = _.findWhere(refundConstants.refundType, {value: ""+value});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])

    //-- 售后类型反转查询（根据label查value）
    .filter('refundTypeRevers', ['refundConstants', function (refundConstants) {
        return function (label) {
            if(!label) return;
            var item = _.findWhere(refundConstants.refundType, {label: label});
            if(angular.isDefined(item.value)){
                return parseInt(item.value);
            }else{
                return 0;
            }
        };
    }])


    //-- 售后状态
    .filter('refundStatus', ['refundConstants', function (refundConstants) {
        return function (value) {
            if(!value.refundType) return;
            var item = _.findWhere(_.findWhere(refundConstants.refundType, {value: ""+value.refundType}).refundStatus, {value: ""+value.refundStatus});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])

    /** 
    /* 售后状态反转查询（根据label查value）
     * 注：退款中 = 完成
     **/
     .filter('refundStatusRevers', ['refundConstants', function (refundConstants) {
        return function (type, status) { 
            if(!angular.isString(type) || !angular.isString(status) ){
                console.log("type="+type);
                console.log("status="+status);
                return;
            }

            var item = _.findWhere(_.findWhere(refundConstants.refundType, {label: type}).refundStatus, {label: ""+status});
            if(item && angular.isDefined(item.value)){
                return parseInt(item.value);
            }else{
                return 0;
            }
        };
    }])
;

