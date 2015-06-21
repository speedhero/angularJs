angular.module('flymvo.coupon.checkCouponDetailCtrl',[])
    .controller('checkCouponDetailCtrl',[
    	'$scope',
    	'$filter',
    	'$stateParams',
    	'$globalSetting', 
    	'$rootScope', 
    	'$state', 
        'couponService',
    	function ($scope,$filter,$stateParams,$globalSetting, $rootScope,$state ,couponService){
    		"use strict";

    		//==============================================变量===================================================
    		 
            $scope.couponDetail = { 
             }; 
 
    		//==============================================函数===================================================
            //刷新页面,根据传过来的参数进行判断
            $scope.$on("checkCouponDetail",function(){  
                if(!$scope.$couponId){ 
                }
                else{
                    $scope.loadDetail();
                }   
            }); 
             
            //重新加载
            $scope.loadDetail = function(){   
                couponService.queryDetail({"couponId": $scope.$couponId}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.couponDetail = resp.model;  
                    }
                });
            };
            
           

    		//==============================================初始化=================================================
            $scope.loadDetail();

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");
    	}
]);