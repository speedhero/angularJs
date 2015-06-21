/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.product.controllers', [
  'flymvo.product.productListCtrl',
  'flymvo.product.productChooseCatBrandCtrl',
  'flymvo.product.productCreateCtrl',
  'flymvo.product.productEditCtrl',
  'flymvo.product.productRecycleBinCtrl',
  'flymvo.product.consultListCtrl'
]);
