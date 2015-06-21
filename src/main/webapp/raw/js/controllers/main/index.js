/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.main.controllers', [
  'flymvo.main.loginCtrl',
  'flymvo.main.mainCtrl',
  'flymvo.main.topMenuCtrl',
  'flymvo.main.alertCtrl',
  'flymvo.main.userCtrl',
  'flymvo.main.leftMenuCtrl',
  'flymvo.main.sidebarSearchCtrl'
]);
