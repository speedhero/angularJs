/**
 * @component: service
 * @name: flymvo.coupon.service
 * @description: coupon模块相关服务
 * @author: allen.chan
 * @creat on: 2014/11/17.

 */
angular.module('flymvo.coupon.service', [])
    .factory('couponService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var headers = {};
            // if(!$globalSetting.isMockEnv){
            //     headers = {'Content-Type': 'application/json;charset=UTF-8'};
            // }
          var service = $resource('/data/', null,
              { 
                'query': {url: '/data/mft/mftCoupon/searchCoupon', method: "POST", isArray: false },
                'queryDetail':{url: '/data/mft/mftCoupon/couponDetail', method: "POST" ,isArray :false},
                'saveOrUpdate' : {url: '/data/mft/mftCoupon/saveOrUpdateCoupon', method: 'POST', isArray: false},
                //'update' : {url: '/data/tms/mftAddress/update', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'remove': {url: '/data/mft/mftCoupon/deleteCoupon' ,method: 'POST' ,isArray:false} ,
                'updateStatus': {url: '/data/mft/mftCoupon/updateCouponStatus',method: 'POST',  isArray: false}
              }
          );
          return service;
        }]);
