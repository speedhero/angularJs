/**
 * @name: 运单号日志控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.trackingNoLogCtrl', [])
    .controller('trackingNoLogCtrl', [
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
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope,TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedTrackingNoLog = false;

            //-- 订单列表-1  发货列表-2 问题运单号列表-3 待处理运单号-4 运单号修改日志-5
            $scope.$backTo = 5;

            //模板
            $scope.templates = {
                trackingNoLogTable: '/html/order/include/trackingNoLogTable.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: null,
                transpNo: null,
                createTimeBegin: null,
                createTimeEnd: null
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);

            $scope.queryOrigin = angular.copy($scope.query);



            //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.trackingNoLogTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if($scope.trackingNoLogSearchForm.$invalid){
                    $('#trackingNoLogSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#trackingNoLogSearchForm #trackingNoLogSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.trackingNoLogTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.trackingNoLogSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //查看订单详情
            $scope.checkOrderDetail = function(orderNo){
                $scope.$orderNumber = orderNo;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#trackingNoLogListPage').hide();
            };

            //-- =======================================初始化===========================================

            console.log("enter order trackingNoLogListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_trackingNoLog_list");

            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadTrackingLogNoTable", function () {
                $scope.trackingLogNoTableParams.reload();
            });

            //时间转换
            $scope.$watch("query.createTimeEnd", function() {
                if($scope.query.createTimeEnd){
                    $scope.query.createTimeEnd = moment($scope.query.createTimeEnd).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.createTimeBegin", function() {
                if($scope.query.createTimeBegin){
                    $scope.query.createTimeBegin = moment($scope.query.createTimeBegin).format("YYYY-MM-DD");
                }
            });


            $scope.trackingNoLogTableParams = new TableParams({
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


                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }

                    if (postData.createTimeBegin) {
                        postData.createTimeBegin = postData.createTimeBegin + " 00:00:00";
                    }
                    if (postData.createTimeEnd) {
                        postData.createTimeEnd = postData.createTimeEnd + " 23:59:59";
                    }

                    orderService.searchTrackingNoLog(postData).$promise.then(function (resp) {
                        $('#trackingNoLogSearchForm #trackingNoLogSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.trackingNoLogList = list;
                            $defer.resolve(list);
                            $scope.$loadedTrackingNoLog = true;
                        }
                    });


                }
            });


        }
    ]);