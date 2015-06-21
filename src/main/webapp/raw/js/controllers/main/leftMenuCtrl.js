/**
 * @name: 左边栏菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.leftMenuCtrl', [])
    .controller('leftMenuCtrl', [
        '$scope',
        '$state',
        '$filter',
        '$timeout',
        '$globalSetting',
        function ($scope, $state, $filter, $timeout, $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/leftMenu.html?tag='+$globalSetting.version
            };


        }
    ]);
