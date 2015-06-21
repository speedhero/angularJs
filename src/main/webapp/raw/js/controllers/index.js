/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.controllers', [
  'flymvo.demo.controller',
  'flymvo.dashboard.controllers',
  'flymvo.main.controllers',
  'flymvo.product.controllers',
  'flymvo.order.controllers',
  'flymvo.refund.controllers',
  'flymvo.finance.controllers',
  'flymvo.account.controllers',
  'flymvo.logistics.controllers',
  'flymvo.promo.controllers',
  'flymvo.coupon.controllers',
  'flymvo.helpCenter.controllers',
  'flymvo.test.controllers'
]);

