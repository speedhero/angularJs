angular.module("flymvo.account.manufacturerInfoCtrl", [])
    .controller("manufacturerInfoCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$globalSetting',
        '$stateParams',
        '$rootScope',
        '$state',
        'accountService',
        'logisticsService',
        function ($scope, $filter, $timeout, $window, $globalSetting, $stateParams, $rootScope, $state, accountService, logisticsService) {

            //-- =======================================变量===========================================
            //-- html模板
            $scope.templates = {
                //商城部分(查看模式)
                storeSection4ViewMode: '/html/account/include/viewManufacturerInfo4Store.html?tag=' + $globalSetting.version,
                //商城部分(编辑模式)
                storeSection4EditMode: '/html/account/include/editManufacturerInfo4Store.html?tag=' + $globalSetting.version
            };

            //商城panel 变量
            $scope.storePanel = {
            };

            //编辑对象
            $scope.mftModel = {};

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];

            //-- =======================================函数===========================================

            //获取省份城市函数
            function getRegions(regionArray, parentId, callback) {
                if(angular.isUndefined(parentId) || parentId==='') return;
                logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                    regionArray.splice(0, regionArray.length);
                    for(var i=0, len=resp.models.length; i<len; i++) {
                        regionArray.push(resp.models[i]);
                    }
                    if(callback) callback();
                });
            }

            $scope.changeState = function(){
                getRegions($scope.cityArray, $scope.mftModel.locationStateId, function(){
                    $scope.mftModel.locationCityId = $scope.cityArray[0].regionId;
                });
            };

            //获得供应商信息
            $scope.getManufacturerInfo = function(){
                accountService.getManufacturerInfo().$promise.then(function (resp) {
                    if (resp.success === false) {
                        $scope.manufacturerInfo = null;
                        $scope.message = resp.message;
                    } else if (resp.success === true) {
                        $scope.manufacturerInfo = resp.model;
                        //将string类型转为int类型
                        if($scope.manufacturerInfo.locationStateId){
                            $scope.manufacturerInfo.locationStateId = parseInt($scope.manufacturerInfo.locationStateId);
                        }
                        if($scope.manufacturerInfo.locationCityId){
                            $scope.manufacturerInfo.locationCityId = parseInt($scope.manufacturerInfo.locationCityId);
                        }

                    }
                });
            };


            //store panel进入只读模式
            $scope.viewStore = function(){
                $scope.storePanel.currTemplate = $scope.templates.storeSection4ViewMode;
                $scope.hasCommit = false;
            };

            //store panel进入编辑模式
            $scope.editStore = function(){
                $scope.storePanel.currTemplate = $scope.templates.storeSection4EditMode;
                //获取省份
                getRegions($scope.stateArray, 1);
                //将只读对象的数据拷贝到待编辑对象
                $scope.mftModel = {
                    mftNameAlias : $scope.manufacturerInfo.mftNameAlias,
                    hotline : $scope.manufacturerInfo.hotline,
                    isShowHotline : $scope.manufacturerInfo.isShowHotline,
                    locationStateId : $scope.manufacturerInfo.locationStateId,
                    locationCityId : $scope.manufacturerInfo.locationCityId
                };

                if($scope.mftModel.locationCityId){
                    getRegions($scope.cityArray, $scope.mftModel.locationStateId);
                }
                if(angular.isUndefined($scope.mftModel.isShowHotline)){
                    $scope.mftModel.isShowHotline = 0;
                }
            };

            //保存商城展示信息
            $scope.saveStore = function(){
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#storeForm :input.ng-invalid');
                var flag = true;
                if (fields.length > 0) {
                    fields.each(function (index, value) {
                        if (!flag)return;
                        if ($(this).parents(".ng-hide").length === 0) {
                            //找到非隐藏状态的input
                            $(this).focus();
                            console.log('fail to validate ' + $(this).attr("name"));
                            flag = false;
                        }
                    });
                }
                if(!flag){
                    return;
                }

                var location = "";
                angular.forEach($scope.stateArray, function(state, index){
                    if(state.regionId == $scope.mftModel.locationStateId){
                        location += state.regionName;
                    }
                });

                angular.forEach($scope.cityArray, function(city, index){
                    if(city.regionId == $scope.mftModel.locationCityId){
                        location += " " + city.regionName;
                    }
                });

                $scope.mftModel.location = location;

                accountService.saveStoreInfo($scope.mftModel).$promise.then(function (resp) {
                    if (resp.success) {
                        //获取供应商信息
                        $scope.getManufacturerInfo();
                        $scope.viewStore();
                    } else {
                        $window.alert(resp.message);
                    }
                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                    }

                });
            };


            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_account_info');

            //获取供应商信息
            $scope.getManufacturerInfo();

            $scope.viewStore();

        }]);