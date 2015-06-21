/**
 * @name: 左边栏菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.sidebarSearchCtrl', [])
    .controller('sidebarSearchCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/sidebarSearch.html?tag='+$globalSetting.version
            };


        }

    ]);
