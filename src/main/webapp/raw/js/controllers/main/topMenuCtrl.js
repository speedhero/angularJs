/**
 * @name: 顶部模块菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.topMenuCtrl', [])
    .controller('topMenuCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/topMenu.html?tag='+$globalSetting.version
            };
        }

    ]);
