/**
 * @name: Main框架控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.logisticsListCtrl', [])
    .controller('logisticsListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting',
        'logisticsConstants',
        'logisticsService',
        'ngTableParams',
        function ($scope, $filter, $timeout, $globalSetting, logisticsConstants, logisticsService, TableParams) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_list');

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化常量
            $scope._distributionMode = logisticsConstants.distributionMode;
            $scope.distributionMode = 1; //默认配送方式为快递

            //-- 构造省份数组
            $scope._provinceArray = [];
            logisticsService.getRegion({parentId: '1'}).$promise.then(function (resp) {
                $scope._provinceArray.length = 0;
                for (var i = 0, len = resp.models.length; i < len; i++) {
                    $scope._provinceArray[resp.models[i].regionId] = resp.models[i].regionName;
                }
            });

            //-- 获取模板表格数据
            $scope.getLogisticsList = function () {
                $scope.logisticsTables = [];
                var logisticsArray = [];

                logisticsService.query().$promise.then(function (resp) {
                    $scope.logisticsTables = resp.models;
                    angular.copy(resp.models, logisticsArray);

                    var detailVO, group, provinces;
                    for (var j = 0, lenj = $scope.logisticsTables.length; j < lenj; j++) {
                        $scope.logisticsTables[j].group = [];
                        group = $scope.logisticsTables[j].group;
                        for (var i = 0, leni = $scope.logisticsTables[j].detailVOs.length; i < leni; i++) {
                            detailVO = $scope.logisticsTables[j].detailVOs[i];
                            if (!group[detailVO.areaGroup]) {
                                detailVO.provinces = [];
                                group[detailVO.areaGroup] = detailVO;
                            }
                            group[detailVO.areaGroup].provinces.push(detailVO.destStateId);
                        }
                    }
                    $scope.$loaded = true;
                });
            };
            $scope.getLogisticsList();


            //-- 复制模板
            $scope.copyLogistics = function (index) {
                var temp = logisticsArray[index];
                delete temp.transFeeTempId;
                logisticsService.createLogistics(angular.toJson(temp)).$promise.then(function (resp) {

                });
            };

            //-- 删除模板
            $scope.deleteLogistics = function (transFeeTempId, index) {
                if (confirm('确认删除运费模板"' + $scope.logisticsTables[index].transFeeTempName + '"?')) {
                    logisticsService.deleteLogistics({transFeeTempId: transFeeTempId}).$promise.then(function (resp) {
                        if (resp.success) {
                            $scope.logisticsTables.splice(index, 1);
                            alert("删除成功");
                        } else {
                            alert("删除失败： " + resp.message);
                        }
                    });
                }

            };


        }
    ]);
