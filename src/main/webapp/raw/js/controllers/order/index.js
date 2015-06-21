/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.order.controllers', [
  'flymvo.order.orderListCtrl',
  'flymvo.order.orderDetailCtrl',
  'flymvo.order.orderPrintListCtrl',
  'flymvo.order.orderMultiDeliverCtrl',
  'flymvo.order.errTrackingNoListCtrl',
  'flymvo.order.pendTrackingNoListCtrl',
  'flymvo.order.trackingNoUpdateCtrl',
  'flymvo.order.trackingNoLogCtrl',
  'flymvo.order.orderDeliverListCtrl'
]);
