/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.refund.controllers', [
  'flymvo.refund.refundListCtrl',
  'flymvo.refund.refundDetailCtrl',
  'flymvo.refund.refundInfoCtrl',
  'flymvo.refund.refundAddressCtrl',
  'flymvo.refund.refundLogisticsCtrl',
  'flymvo.refund.refundAddressListCtrl' 
]);
