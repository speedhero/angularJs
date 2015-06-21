/**
 * @name: Main框架控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.addressListCtrl', [])
    .controller('addressListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting',
        'logisticsConstants',
        'addressService',
        'ngTableParams',
        function ($scope, $filter, $timeout, $globalSetting, logisticsConstants, addressService, TableParams) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_address_list');

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化常量
            $scope.addressArray = [];
            $scope.defaultId = 0;

            //-- 获取地址列表
            addressService.query(angular.toJson({
                pageIndex: 1,
                pageSize: 10
            })).$promise.then(function (resp) {
                    $scope.addressArray = resp.models;
                    angular.forEach($scope.addressArray, function (address, index) {
                        if (address.defaultFlag) {
                            $scope.defaultId = index;
                            return;
                        }
                    });
                    $scope.$loaded = true;
                });

            //-- 设为默认按钮
            $scope.setDefault = function (index, tmsMftAddressId) {
                addressService.setDefault({id: tmsMftAddressId}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.addressArray[$scope.defaultId].defaultFlag = false;
                        $scope.defaultId = index;
                        $scope.addressArray[$scope.defaultId].defaultFlag = true;
                        alert("设置成功");
                    } else {
                        alert("设置失败: " + resp.message);
                    }
                });
            };

        }
    ]);
