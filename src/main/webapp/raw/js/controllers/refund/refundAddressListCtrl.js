angular.module('flymvo.refund.refundAddressListCtrl',[])
  .controller('refundAddressListCtrl',[
    '$scope',
    '$filter',
    '$state',
    '$globalSetting',
    'ngDialog',
    'ngPopover',
    'refundService', 
    function ($scope, $filter, $state, $globalSetting, ngDialog, ngPopover , refundService) {
      "use strict";  
      
      //售后地址
      //-- 初始化常量
      $scope.addressArray = [];
      $scope.defaultId = 0;

      //-- 获取地址列表
      refundService.queryAddress(angular.toJson({
        pageIndex: 1,
        pageSize:  10
      })).$promise.then(function(resp) {
        console.log($scope.address);
        $scope.addressArray = resp.models;
        angular.forEach($scope.addressArray, function(address, index) {
          if(address.defaultFlag) {
            $scope.defaultId = index;
            return;
          }
        });
      });

      //-- 设为默认按钮 
      $scope.setDefault = function(index, tmsMftAddressId) {

        refundService.defaultAddress({id: tmsMftAddressId}).$promise.then(function(resp) {
          if(resp.success) {
            $scope.addressArray[$scope.defaultId].defaultFlag = false;
            $scope.defaultId = index;
            $scope.addressArray[$scope.defaultId].defaultFlag = true;
            alert("设置成功");  

          }else{
            alert("设置失败: " + resp.message);
          }
           $scope.$emit("setDefault");
        });
      };





       //-- 初始化模型
        $scope.address   = {};
        $scope.hasCommit = false;
        $scope.address.defaultFlag = false;
          //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = []; 
           
     
           var getRegions = function(regionArray, parentId, callback) {
              if(!parentId) return;
              refundService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                regionArray.length = 0;
                for(var i=0, len=resp.models.length; i<len; i++) {
                  regionArray.push(resp.models[i]);
                }
                if(callback) callback();
              });
            };

          

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
                refundService.createAddress(angular.toJson($scope.address)).$promise.then(function(resp) {
                  if(resp.success) {
                    alert("添加地址成功");  
                    ngPopover.close();  
                  }else{
                    alert("操作失败：" + resp.message);
                  }
                });

              }
            };    
     }
    ]); 
