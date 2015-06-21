angular.module('flymvo.coupon.couponListCtrl',[])
    .controller('couponListCtrl',[
        '$compile',
    	'$scope',
    	'$filter',
    	'$stateParams',
    	'$globalSetting',
    	'ngTableParams', 
    	'$rootScope',
    	'$state',
        'couponService',
        'couponConstants',
    	function ($compile, $scope, $filter, $stateParams, $globalSetting, TableParams, $rootScope, $state, couponService, couponConstants){
    		"use strict";

    		//==============================================变量===================================================
            //-- 是否已加载完成
            $scope.$loaded = false;

    		$scope.templates = { 
    			 couponTable: '/html/coupon/couponTable.html?tag=' + $globalSetting.version,
    			 couponDetail: '/html/coupon/couponDetail.html?tag=' + $globalSetting.version,
                 checkCouponDetail: '/html/coupon/checkCouponDetail.html?tag=' + $globalSetting.version
    		};
            //查询条件
            $scope.query = {
                name: null,
                dateFrom: null,
                dateTo: null,
                discountAmountFrom: null,
                discountAmountTo:null,
                isShow:null
            };
            //保存查询条件 
            $scope.querySaved = angular.copy($scope.query);

            $scope.queryOrigin = angular.copy($scope.query);
            //下拉框状态
           

            $scope._couponConstants = couponConstants;
    		//==============================================函数===================================================
            //重新加载列表
            $scope.reloadList = function (){
                $scope.couponTableParams.reload();
            };

            //搜索
            $scope.search = function(){ 
                 if($scope.couponSearchForm.$invalid){ 
                    $('#couponSearchForm :input .ng-invalid').first().focus();
                 }else{ 
                    $("#couponSearchForm #couponSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.couponTableParams.reload();
                 }
            };
 
            //删除
            $scope.deleteCoupon = function(coupon){  
                if(confirm("您确认删除'"+coupon.name+"'吗？")){
                    couponService.remove({"couponId": coupon.coupon_id}).$promise.then(function (resp) {
                        if(resp.success === true){
                            alert("删除成功");
                            $scope.reloadList();
                        }else{
                            alert("删除失败");
                        }
                    });
                }
            };
            //添加优惠券
            $scope.addCoupon = function(){ 
                
                  
                $('#couponDetailPage').empty().append('<div ng-controller="addCouponCtrl" ng-include="\'/html/coupon/couponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#couponDetailPage').contents())($scope); 
                 
                $('#couponDetailPage').slideDown("fast"); 
                $('#couponListPage').hide();
                $('#checkCouponDetailPage').hide();
                //$scope.$enableEditInfo = true; 
                $scope.$couponId = null; 
            };

            //编辑优惠券
            $scope.updateCoupon = function(couponId){   

                $scope.$couponId = couponId; 
                
                $('#couponDetailPage').empty().append('<div ng-controller="couponDetailCtrl" ng-include="\'/html/coupon/couponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#couponDetailPage').contents())($scope);  
                
                $('#couponDetailPage').slideDown("fast");
                $('#couponListPage').hide();
                $('#checkCouponDetailPage').hide();

                 
            };

            //上架--1 /下架--2
            $scope.handleCoupon = function(couponId, isShow){ 
                couponService.updateStatus({
                    "couponId": couponId,
                    "isShow": isShow
                }).$promise.then(function(resp){
                    if(resp.success === true){
                        if(isShow === 1){ 
                           alert("上架成功");
                        }else{
                           alert("下架成功");
                        }
                        $scope.reloadList();
                    }else{
                        if(isShow === 1){ 
                            if(resp.resultCode === "300017"){
                                alert("亲，最多可同时上架派发3张优惠劵哦");
                            }else{ 
                                alert("上架失败");
                           }
                        }else{
                           alert("下架失败");
                        }
                    }
                });
            };
           
            //详细信息页面
            $scope.showDetail = function(couponId){ 

                $scope.$couponId = couponId; 
                $('#checkCouponDetailPage').empty().append('<div ng-controller="checkCouponDetailCtrl"  ng-include="\'/html/coupon/checkCouponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#checkCouponDetailPage').contents())($scope);

                $('#checkCouponDetailPage').slideDown("fast");
                $('#couponListPage').hide();
                $('#couponDetailPage').hide(); 
            };

            //返回列表
            $scope.backToList = function(){
                
                $('#couponListPage').show();
                $('#couponDetailPage').hide(); 
                $('#checkCouponDetailPage').hide();
                $scope.reloadList();
                $scope.$couponId = null;
                $scope.$enableEditInfo = false; 
            };

            //下拉框状态改变时，重新加载
            $scope.statusChange = function (selectedStatus){ 
                if(selectedStatus) {
                    $scope.query.isShow = selectedStatus.value; //$scope.statusReturn(selectedStatus.value);
                } else {
                    $scope.query.isShow = null;  
                    //$scope.isShow = null; 
                }
                $scope.reloadList();
            };
            // //搜索下拉框状态改变时，重新加载
            // $scope.statusChangeSearch = function(selectedStatus){  
            //     if(selectedStatus) {
            //         $scope.query.isShow = selectedStatus.value;// $scope.statusReturn(selectedStatus.value);
            //     } else { 
            //         $scope.query.isShow = null;   
            //     }  
            // };

            //重置
            $scope.reset = function () {
                //将错误移除   
                $scope.couponSearchForm.$setPristine(true);
                //处理验证的field
                $scope.couponSearchForm.discountAmountTo.$setViewValue("");
                $scope.couponSearchForm.discountAmountFrom.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);  
               //   $scope.isShow = null;

            };
           /* //下拉框改变时修改返回数据
            $scope.statusReturn = function(value){
                if(value == 1){//未派发
                    $scope.status = 0;
                    $scope.isShow = 0;
                }
                else if(value == 2){//派发中
                    $scope.status = 1;
                    $scope.isShow = 1;

                }else if(value == 3){ //已派完
                    $scope.status = 1;
                    $scope.isShow = 1;
                }else if(value == 4){ //已结束
                    $scope.status = 0;
                    $scope.isShow = 1; 
                }else{ 
                    $scope.status = null;  
                    $scope.isShow = null; 
                }
            };
*/

    		//==============================================初始化=================================================

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");

            //时间转换
            $scope.$watch("query.dateFrom", function () {
                if ($scope.query.dateFrom) { 
                    $scope.query.dateFrom = moment($scope.query.dateFrom).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.dateTo", function () {
                if ($scope.query.dateTo) {
                    $scope.query.dateTo = moment($scope.query.dateTo).format("YYYY-MM-DD");
                }
            });

            $scope.$on("reloadCouponDetail",function(coupon){   
                $scope.$couponId = coupon.targetScope.$couponId;
                if(!$scope.$couponId){ 
                }
                else{
                    $scope.showDetail($scope.$couponId);
                }  

            });


            $scope.couponTableParams = new TableParams({
                page: 1,
                count: 10   
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();
                    //当前状态
                    postData.isShow = $scope.query.isShow;
                    //postData.isShow = $scope.isShow;
                   // console.log(postData);

                    if (postData.dateFrom) {
                        postData.dateFrom = moment(postData.dateFrom).format("YYYY-MM-DD") + " 00:00:00";
                    }
                    if (postData.dateTo) {
                        postData.dateTo = moment(postData.dateTo).format("YYYY-MM-DD") + " 23:59:59";
                    } 
                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                     
                    couponService.query(postData).$promise.then(function (resp) {
                        $('#couponSearchForm #couponSearchBtn').button('reset');
                        if(resp.model){  
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? 
                            $filter('orderBy')(resp.model, params.orderBy()) : resp.model;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.couponList = list;
                            $defer.resolve(list);

                            $scope.$loaded = true;
                        } 
                    });
                    
                     
                }
            });
    	}
]);