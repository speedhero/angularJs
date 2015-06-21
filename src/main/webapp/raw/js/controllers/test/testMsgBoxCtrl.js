/**
 * @name: 测试飞飞信鸽盒子
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.test.testMsgBoxCtrl', [])
    .controller('testMsgBoxCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'msgBox',
        function ($scope, $window, $filter, $timeout, $globalSetting, msgBox) {

            //飞飞信鸽
            $scope.msgBox = msgBox({
            }, $scope);

            $scope.open = function(){
                $scope.msgBox.open();
            };

            $scope.send =function(msg) {
                $scope.msgBox.send(msg);
            };

        }

    ]);
