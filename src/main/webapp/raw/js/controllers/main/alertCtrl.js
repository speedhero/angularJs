/**
 * @name: 顶部模块提醒控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.alertCtrl', [])
    .controller('alertCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/alertDropdown.html?tag='+$globalSetting.version
            };


        }

    ]);
