/**
 * @name: 问题运单号修改日志控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26.
 */
angular.module('flymvo.order.pendTrackingNoListCtrl', [])
    .controller('pendTrackingNoListCtrl', [
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
            $scope.$loadedPendTrackingNo = false;

            //-- 订单列表-1  发货列表-2 问题运单号列表-3 待处理运单号-4
            $scope.$backTo = 4;

            //模板
            $scope.templates = {
                pendTrackingNoTable: '/html/order/include/pendTrackingNoTable.html?tag=' + $globalSetting.version,
                updateTrackingNoModal: '/html/order/include/updateTrackingNoModal.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: "",
                trackingNumber: ""
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);
            $scope.queryOrigin = angular.copy($scope.query);

            //用于判断是否进行过搜索
            $scope.isSearchBefore = false;



    //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.pendTrackingNoTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if(($scope.query.orderNo.trim() === "") && ($scope.query.trackingNumber.trim() === "")){
                    $window.alert("订单编号或运单号至少填写一个");
                    return;
                }

                if($scope.pendTrackingNoSearchForm.$invalid){
                    $('#pendTrackingNoSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#pendTrackingNoSearchForm #pendTrackingNoSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.isSearchBefore = true;
                    $scope.pendTrackingNoTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.pendTrackingNoSearchForm.$setPristine(true);
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


            //查看订单详情
            $scope.checkOrderDetail = function(orderNumber){
                $scope.$orderNumber = orderNumber;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#pendTrackingNoListPage').hide();
            };


            //打开修改运单号modal
            $scope.openTrackingNoUpdateModal = function(orderNo, transportNo, carrierCode){
                $scope.trackingNoInfo = {
                    logisticsCompanyOrig : carrierCode,
                    trackingNo:transportNo,
                    trackingNoOrig:transportNo,
                    orderNo:orderNo
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

            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadPendTrackingNoTable", function () {
                $scope.pendTrackingNoTableParams.reload();
            });

            //-- =======================================初始化===========================================

            console.log("enter order pendTrackingNoListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_pendTrackingNo_list");

            //-- 获取物流公司
            $scope.listLogisticsCompanies();

            $scope.pendTrackingNoTableParams = new TableParams({
                page: 1,
                count: 10
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    if(!$scope.isSearchBefore){
                        $defer.resolve([]);
                        return;
                    }
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();


                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }

                    orderService.queryOrderDeliverList(postData).$promise.then(function (resp) {
                        $('#pendTrackingNoSearchForm #pendpendTrackingNoSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.pendTrackingNoList = list;
                            $defer.resolve(list);
                            $scope.$loadedPendTrackingNo = true;
                        }
                    });


                }
            });



        }
    ]);