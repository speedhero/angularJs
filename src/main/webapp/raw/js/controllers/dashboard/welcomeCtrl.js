/**
 * @name: 欢迎controller
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.dashboard.welcomeCtrl', [])
    .controller('welcomeCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_dashboard_welcome');

        }

    ]);
