/**
 * @name: 问题运单号控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.errTrackingNoListCtrl', [])
    .controller('errTrackingNoListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        'ngTableParams',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedErrTrackingNo = false;

            //-- 3= 问题订单号列表
            $scope.$backTo = 3;

            //模板
            $scope.templates = {
                errTrackingNoTable: '/html/order/include/errTrackingNoTable.html?tag=' + $globalSetting.version,
                updateTrackingNoModal: '/html/order/include/updateTrackingNoModal.html?tag=' + $globalSetting.version,
                errTrackingNoDetailModal: '/html/order/include/errTrackingNoDetailModal.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: null,
                transportNo: null,
                orderTimeBegin: null,
                orderTimeEnd: null,
                deliveryTimeBegin: null,
                deliveryTimeEnd: null,
                carrierCode: null,
                handlingStatus: 1  //默认是“未处理”
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);
            $scope.queryOrigin = angular.copy($scope.query);


            //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.errTrackingNoTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if($scope.errTrackingNoSearchForm.$invalid){
                    $('#errTrackingNoSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#errTrackingNoSearchForm #errTrackingNoSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.errTrackingNoTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.errTrackingNoSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //获取物流公司
            $scope.listLogisticsCompanies = function () {
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因：" + resp.message);
                    }
                });
            };


            //查看详情Modal
            $scope.checkTrackingNoDetail = function(orderNo){
                orderService.searchTrackingNoLog({orderNo:orderNo}).$promise.then(function(resp){
                    if (resp.success) {
                        $scope.trackingNoLogDetail = resp.models[0];
                        $('#errTrackingNoDetailModal').modal('show');
                    }
                });
            };
            //关闭详情Modal
            $scope.closeTrackingNoDetail = function(){
                $('#errTrackingNoDetailModal').modal('hide');
            };

            //查看订单详情
            $scope.checkOrderDetail = function(orderNo){
                $scope.$orderNumber = orderNo;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#errTrackingNoListPage').hide();
            };


            //打开修改运单号modal
            $scope.openTrackingNoUpdateModal = function(orderNo, transportNo, carrierCode, tmsAbnormalOrderReportId){
                $scope.trackingNoInfo = {
                    logisticsCompanyOrig : carrierCode,
                    trackingNo:transportNo,
                    trackingNoOrig:transportNo,
                    orderNo:orderNo,
                    tmsAbnormalOrderReportId: tmsAbnormalOrderReportId
                };
                angular.forEach($scope.$logisticsCompanies, function(item, index){
                    if(item.code == $scope.trackingNoInfo.logisticsCompanyOrig){
                        $scope.trackingNoInfo.carrier = item;
                    }
                });

                $('#updateTrackingNoModal .modal-dialog').empty().append('<div ng-controller="trackingNoUpdateCtrl" ng-include="\''+$scope.templates.updateTrackingNoModal+'\'"></div>');
                $compile($('#updateTrackingNoModal').contents())($scope);
                $('#updateTrackingNoModal').modal('show');
            };
            //关闭运单号modal
            $scope.closeTrackingNoUpdateModal = function(){
                $('#updateTrackingNoModal').modal('hide');
            };


            //-- =======================================初始化===========================================

            console.log("enter order errTrackingNoListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_errTrackingNo_list");

            //时间转换
            $scope.$watch("query.orderTimeBegin", function() {
                if($scope.query.orderTimeBegin){
                    $scope.query.orderTimeBegin = moment($scope.query.orderTimeBegin).format("YYYY-MM-DD");
                }
            });

            $scope.$watch("query.orderTimeEnd", function() {
               if($scope.query.orderTimeEnd){
                   $scope.query.orderTimeEnd = moment($scope.query.orderTimeEnd).format("YYYY-MM-DD");
               }
            });

            $scope.$watch("query.deliveryTimeBegin", function() {
                if($scope.query.deliveryTimeBegin){
                    $scope.query.deliveryTimeBegin = moment($scope.query.deliveryTimeBegin).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.deliveryTimeEnd", function() {
                if($scope.query.deliveryTimeEnd){
                    $scope.query.deliveryTimeEnd = moment($scope.query.deliveryTimeEnd).format("YYYY-MM-DD");
                }
            });


            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadErrTrackingNoTable", function () {
                $scope.errTrackingNoTableParams.reload();
            });


            //-- 获取物流公司
            $scope.listLogisticsCompanies();

            //-- 获得列表
            $scope.errTrackingNoTableParams = new TableParams({
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

                    if (postData.orderTimeBegin) {
                        postData.orderTimeBegin = postData.orderTimeBegin + " 00:00:00";
                    }
                    if (postData.orderTimeEnd) {
                        postData.orderTimeEnd = postData.orderTimeEnd + " 23:59:59";
                    }
                    if (postData.deliveryTimeBegin) {
                        postData.deliveryTimeBegin = postData.deliveryTimeBegin + " 00:00:00";
                    }
                    if (postData.deliveryTimeEnd) {
                        postData.deliveryTimeEnd = postData.deliveryTimeEnd + " 23:59:59";
                    }

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    orderService.errTrackingNo(postData).$promise.then(function (resp) {
                        $('#errTrackingNoSearchForm #errTrackingNoSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.trackingNoList = list;
                            $defer.resolve(list);
                            $scope.$loadedErrTrackingNo = true;
                        }
                    });


                }
            });


        }
    ]);