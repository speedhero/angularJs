/** 
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.logisticsSubmitCtrl', [])
    .controller('logisticsSubmitCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$templateCache',
        'ngPopover',
        '$globalSetting',
        'logisticsConstants',
        'logisticsService',
        '$state',
        '$stateParams',
        function ($scope, $filter, $timeout, $window, $templateCache, ngPopover, $globalSetting, logisticsConstants, logisticsService, $state, $stateParams) {
            //-- 设置菜单
            if(!$scope.$fromProduct){
                $scope.$changeCurrMenuByCode('mvo_logistics_add');
            }

            //-- 初始化常量
            $scope.transFeeTempId = $stateParams.transFeeTempId;

            //-- 初始化模型
            $scope.logistics = {};
            $scope.logistics.detailVOs = [];
            $scope.logistics.feeChargedBy = '0';
            $scope.logistics.caculateType = '0';
            //$scope.logistics.originStateId = '1';
            //$scope.logistics.originCityId = '1';
            //$scope.logistics.originAreaId = '1';

            $scope.regions   = [];
            $scope.hasCommit = false;

            $scope.detailVO = {};
            $scope.detailVO.provinces = [];

            if($scope.transFeeTempId) {
                //-- 获取模板信息
                logisticsService.get({transFeeTempId: $scope.transFeeTempId}).$promise.then(function(resp) {
                    $scope.logistics = resp.model;

                    var detailVO, regions, provinces;
                    regions = $scope.regions;

                    for(var i=0, len=$scope.logistics.detailVOs.length; i<len; i++) {
                        detailVO = {};
                        angular.copy($scope.logistics.detailVOs[i], detailVO);
                        if(!regions[detailVO.areaGroup]) {
                            detailVO.provinces = [];
                            detailVO.detailIds = [];
                            regions[detailVO.areaGroup] = detailVO;
                        }
                        regions[detailVO.areaGroup].provinces.push(detailVO.destStateId);
                        regions[detailVO.areaGroup].detailIds.push(detailVO.transFeeTempDetailId);
                    }

                    for(i=0, len=$scope.regions.length; i<len; i++)  {
                        if(!$scope.regions[i])
                            $scope.regions.splice(i, 1);
                    }

                });
            }

            //获取省份城市函数
            var getRegions = function(regionArray, parentId, callback) {
                if(_.isUndefined(parentId) || parentId==='') return;
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

            $scope.$watch('logistics.originStateId', function(newVal, oldVal) {
                getRegions($scope.cityArray, newVal);
                if(oldVal !== undefined) $scope.logistics.originCityId = '';
                //$scope.logistics.originAreaId = '';
            });
            $scope.$watch('logistics.originCityId', function(newVal, oldVal) {
                getRegions($scope.areaArray, newVal);
                if(oldVal !== undefined) $scope.logistics.originAreaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
                //-- 构造省份数组
                $scope._provinceArray = [];
                for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                    $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
                }
            });

            $scope.$on('ng-popover-show', function() {
            });


            //提交表单
            $scope.submitForm = function(isEdit) {

                $scope.hasCommit = true;
                var valid = false;
                if($scope.$fromProduct){
                    valid = $scope.$$childHead.logisticsForm.$valid;
                }else{
                    valid = $scope.logisticsForm.$valid;
                }
                if(valid) {

                  // 过滤regions数组里面不正确的输入
                  for (var index=0, region=$scope.regions[0]; index<$scope.regions.length; index++) {
                    region=$scope.regions[index];
                    if (!region.provinces.length ||  //验证省份数组
                        isNaN(region.firstValue + region.firstPrice + region.addValue + region.addPrice) || //验证是否数字
                        region.firstValue<0 || region.firstPrice<0 || region.addValue<0 || region.addPrice<0 //验证数字是否小于零
                       ) {
                      //$scope.regions.splice(index, 1);
                      //index--;
                      return;
                    }
                  }

                    var tempi, tempj;
                    $scope.logistics.detailVOs.length = 0;
                    for(i=0, leni=$scope.regions.length; i<leni; i++) {
                        tempi = {};
                        angular.copy($scope.regions[i], tempi);
                        for(var j=0, lenj=tempi.provinces.length; j<lenj; j++){
                            tempj = {};
                            angular.copy(tempi, tempj);
                            tempj.destStateId = tempj.provinces[j];

                            if(tempj.transFeeTempDetailId)
                              delete tempj.transFeeTempDetailId;

                            tempj.areaGroup = i;

                            tempj.firstPriceUnit = '元';
                            tempj.addPriceUnit = '元';
                            tempj.firstUnit = 'kg';
                            tempj.addUnit = 'kg';

                            delete tempj.provinces;
                            if(tempj.detailIds)
                                delete tempj.detailIds;

                            $scope.logistics.detailVOs.push(tempj);
                        }
                    }
                    //如果是编辑的话要传入id，添加则不用
                    if(!isEdit)
                      delete $scope.logistics.transFeeTempId;
                    logisticsService.createLogistics(angular.toJson($scope.logistics)).$promise.then(function(resp) {
                        if($scope.$fromProduct){
                            //将新的模板id回传给商品创建或者编辑页面
                            $scope.$emit('finishAddLogisticsTemplateEvent',resp.model.transFeeTempId);
                        }else{
                            $window.alert("添加费模板成功");
                            $state.go("main.logistics");
                        }
                    });

                }
            };


            //指定区域数组
            $scope.regionsDelete = function(index) {
              $scope.regions.splice(index, 1);
            };

            $scope.addRegion = function() {
              var tmp = {};
              tmp.provinces = [];
              $scope.regions.push(tmp);
            };

        }

    ])
;
