/**
 * @name: 顶部模块用户dropdown控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.userCtrl', [])
    .controller('userCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/userDropdown.html?tag='+$globalSetting.version
            };


        }

    ]);
