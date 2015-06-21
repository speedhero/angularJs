/** 
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.addressCreateCtrl', [])
    .controller('addressCreateCtrl', [
        '$scope',
        '$state',
        '$filter',
        '$timeout',
        '$templateCache',
        'ngPopover',
        '$globalSetting',
        'logisticsConstants',
        'addressService',
        'logisticsService',
        function ($scope, $state, $filter, $timeout, $templateCache, ngPopover, $globalSetting, logisticsConstants, addressService, logisticsService) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_address_add');

            //-- 初始化常量

            //-- 初始化模型
            $scope.address   = {};
            $scope.hasCommit = false;
            $scope.address.defaultFlag = false;

            //获取省份城市函数
            var getRegions = function(regionArray, parentId, callback) {
              if(!parentId) return;
              logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                regionArray.length = 0;
                for(var i=0, len=resp.models.length; i<len; i++) {
                  regionArray.push(resp.models[i]);
                }
                if(callback) callback();
              });
            };

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = [];

            $scope.$watch('address.stateId', function(newVal, oldVal) {
              getRegions($scope.cityArray, newVal);
              $scope.address.cityId = '';
              $scope.address.areaId = '';
            });
            $scope.$watch('address.cityId', function(newVal, oldVal) {
              getRegions($scope.areaArray, newVal);
              $scope.address.areaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
              //-- 构造省份数组
              $scope._provinceArray = [];
              for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
              }
            });

            //提交表单函数
            $scope.submitForm = function() {
              $scope.hasCommit = true;
              if($scope.addressForm.$valid) {
                addressService.create(angular.toJson($scope.address)).$promise.then(function(resp) {
                  if(resp.success) {
                    alert("添加地址成功");
                    $state.go("main.address");
                  }else{
                    alert("操作失败：" + resp.message);
                  }
                });

              }
            }; 

        }

    ]);
