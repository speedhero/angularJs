/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.test.controllers', [
  'flymvo.test.testSkuSelectorCtrl',
  'flymvo.test.testMsgBoxCtrl'
]);