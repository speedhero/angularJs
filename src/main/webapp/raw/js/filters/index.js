/**
 * @description: Filters 集合器，所有需要注入app的filter都要在这里注册
 * @author: Patrick.he
 **/

angular.module('flymvo.filters', [
    'flymvo.demo.filters',
    'flymvo.product.filters',
    'flymvo.order.filters',
    'flymvo.consult.filters',
    'flymvo.promo.filters',
	'flymvo.coupon.filters',
    'flymvo.refund.filters'
]);
