/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.account.controllers', [
  'flymvo.account.updatePasswordCtrl',
  'flymvo.account.manufacturerInfoCtrl',
  'flymvo.account.brandInfoCtrl'
]);
