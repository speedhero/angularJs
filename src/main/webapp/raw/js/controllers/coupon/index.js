/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: allen.chan
 */

angular.module('flymvo.coupon.controllers', [ 
  'flymvo.coupon.couponListCtrl' ,
  'flymvo.coupon.couponDetailCtrl',
  'flymvo.coupon.checkCouponDetailCtrl',
  'flymvo.coupon.addCouponCtrl'
]);
