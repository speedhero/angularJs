/**
 * @name: 订单发货列表
 * @description:
 * @author: allen.chan
 * @create : 2014/12/15.
 */
angular.module('flymvo.order.orderDeliverListCtrl', [])
    .controller('orderDeliverListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        'ngTableParams',
        '$rootScope',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, TableParams, $rootScope, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 订单列表 1  发货列表 2
            $scope.$backTo = 2;

            //订单表模板
            $scope.templates = {
                //发货modal
                orderDeliveryModal: '/html/order/include/orderDeliverModal.html?tag=' + $globalSetting.version,
                //待发货表格
                orderDeliverTable: '/html/order/include/deliverTable.html?tag=' + $globalSetting.version,
                //已发货表格
                orderDeliveredTable: '/html/order/include/deliveredTable.html?tag=' + $globalSetting.version,
                //订单详情
                orderDetail: '/html/order/checkOrderDetail.html?tag=' + $globalSetting.version,
                //批量打印
                batchExport: '/html/order/batchExport.html?tag=' + $globalSetting.version,
                //批量发货
                multiDeliver:'/html/order/include/multiDeliverDetail.html?tag=' + $globalSetting.version
            };


            //查询条件
            $scope.query = {
                number: null,
                skuNumber: null,
                skuName: null,
                receiverName: null,
                orderTotalMin: null,
                orderTotalMax: null
            };

            //默认是待发货
            $scope.query.orderStatus = 35;
            $scope.query.orderStatuss = null;
            //当前的订单标签页
            $scope.currentTab = 1;

            //当前模板
            $scope.listTemplate = $scope.templates.orderDeliverTable;


            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //用于记录选择的订单ID
            $scope.selectedItems = [];
            //用于记录选择的运单号
            $scope.selectedShipmentItems = [];
            //用于记录全部的订单ID
            $scope.selectedItemsForAll = [];
            //用于记录全部的运单号
            $scope.selectedShipmentItemsForAll = [];
            //用于记录选择的订单
            $scope.selectedOrdersArray = [];

            //用于控制发货按钮模态框的内容
            $scope.isDeliver = false;
            //默认不能激活发货功能
            $scope.orderNumberForCanDeliver = null;

            //待发货未浏览记录数量
            $scope.hasWaitForDeliverCount = 0;
            //已发货未浏览记录数量
            $scope.hasDeliveredCount = 0;

            //用于标识是否提交过
            $scope.hasCommit = false;

            //-- =======================================函数===========================================
            //获取格式化后的时间字符串
            function getStringFromDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month <= 9) {
                    month = "0" + month;
                }
                var day = date.getDate();
                return year + "-" + month + "-" + day;
            }

            //获得订单号逗号分隔字符串
            $scope.getOrderNumbers = function(){
                return $scope.selectedShipmentItems.join(",");
            };
            //显示发货单内所有sku
            $scope.showOtherSkus = function(o){
                o.flag4ShowOtherSkus = true;
            };

            //隐藏发货单内除第一个以外的所有skus
            $scope.hideOtherSkus = function(o){
                o.flag4ShowOtherSkus = false;
            };

            //返回订单号字符串
            $scope.isShowOtherSkus = function(o, index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };


            //获取物流公司
            $scope.listLogisticsCompanies = function(){
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因："+resp.message);
                    }
                });
            };

            //--  重置查询函数
            $scope.resetSearch = function () {
                //将错误移除
                $scope.deliverSearchForm.$setPristine(true);
                //处理验证的field
                $scope.deliverSearchForm.orderTotalMin.$setViewValue("");
                $scope.deliverSearchForm.orderTotalMax.$setViewValue("");
                //还原查询条件
                $scope.query = {
                    number: null,
                    skuNumber: null,
                    skuName: null,
                    receiverName: null,
                    orderTotalMin: null,
                    orderTotalMax: null
                };
                //$scope.waitForDeliver();
            };

            //搜索
            $scope.search = function () {
                $('#deliverSearchForm #searchBtn').button('loading');
                //保存上一次的查询结果
                $scope.querySaved = angular.copy($scope.query);

                $scope.deliverTableParams.reload();
            };

            //待发货
            $scope.waitForDeliver = function () {
                $scope.$loaded = false;
                $scope.hasWaitForDeliverCount = 0;
                $scope.querySaved.orderStatus = 35;
                $scope.query.orderStatus = 35;
                $scope.querySaved.orderStatuss = null;
                $scope.query.orderStatuss = null;

                $scope.listTemplate = $scope.templates.orderDeliverTable;
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];

                if ($scope.deliverTableParams) {
                    $scope.currentTab = 1;
                }

            };
            //已发货
            $scope.delivered = function () {
                $scope.$loaded = false;
                $scope.listTemplate = $scope.templates.orderDeliveredTable;
                $scope.hasDeliveredCount = 0;
                $scope.querySaved.orderStatuss = [60,70];
                $scope.query.orderStatuss = [60,70];
                $scope.querySaved.orderStatus = null;
                $scope.query.orderStatus = null;
                console.log($scope.query);
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];
                if ($scope.deliverTableParams) {
                    $scope.currentTab = 2;
                }

            };


            //获取配送详情（和订单追踪的信息是一致的,根据订单号来查）
            $scope.getDistributingDetail = function (orderNumber) {
                $scope.deliverInfo = null;
                orderService.getTrackOrderDistributing({"orderNumber": orderNumber}).$promise.then(function (resp) {
                    $scope.deliverInfo = resp.model.trackingInfo.deliverInfos;
                });

                ngPopover.open(
                    $('#distributingDetailBtn-'+orderNumber),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderLogisterInfo.html?tag=' + $globalSetting.version
                    }
                );
            };

            //打开发货模态框
            $scope.openDeliverModal = function (orderAddress, orderStatus, orderNumber) {
                //变量初始化
                $scope.deliverInfoForModal = {};
                //将错误移除
                angular.element('#deliverModalForm').scope().deliverModalForm.$setPristine(true);

                //$scope.orderNumberForModal = orderShipmentNumber;
                $scope.orderStatusForModal = orderStatus;
                $scope.orderNumberForDeliver = orderNumber;
                //发货模态框的收货信息
                if(orderAddress){
                    $scope.receiveInfo = orderAddress;
                }else{
                    $scope.receiveInfo = null;
                }

                $('#deliverModal').modal('show');
            };


            //关闭模态框
            $scope.closeDeliverModal = function () {
                $('#deliverModal').modal('hide');
                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                $scope.isDeliver = false;
                //跳至已发货Tab
                $scope.delivered();
            };


            //在发货对话框中打开订单详情
            $scope.checkOrderDetail4DeliverModal = function (orderNumberForModal) {
                //关闭模态框
                $scope.closeDeliverModal();
                //打开详情
                $scope.checkOrderDetail(orderNumberForModal);
            };


            //获取发票信息
            $scope.getBillInfo = function (orderId) {
                orderService.getBillInfo({"orderId": orderId}).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.billInfo = resp.model;
                    }
                });
                ngPopover.open(
                    $('#billInfoBtn-'+orderId),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderInvoiceInfo.html?tag=' + $globalSetting.version
                    }
                );
            };


            //查看详情
            $scope.checkOrderDetail = function (number) {
                // 设置当前订单号
                $scope.$orderNumber = number;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);

                $('#deliverListPage').hide();
                $('#orderDetailPage').slideDown("slow");
            };

            //从详情中返回订单列表时要重新加载订单列表
            $scope.backToList = function () {

                $("#multiDeliverPage").hide();
                $("#deliverListPage").slideDown("slow");
                $scope.reloadList();
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                $scope.isDeliver = true;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var trackingNo = deliverInfo.trackingNo;
                trackingNo = trackingNo.replace(/\s+/g,"");

                orderService.deliver(angular.toJson({"orderNo": $scope.orderNumberForDeliver, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName})).$promise.then(function (resp) {
                    if (resp.result === 1) {
                        //倒计时
                        $scope.closeDeliverModalTime = 6;
                        (function tick() {
                            if ($scope.closeDeliverModalTime <= 0) {
                                $timeout.cancel(clearTimeOut);
                                $('#deliverModal').modal('hide');
                                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                                $scope.isDeliver = false;
                                //跳至已发货Tab
                                $scope.delivered();
                                return;
                            }
                            $scope.closeDeliverModalTime--;
                            var clearTimeOut = $timeout(tick, 1000);
                        })();
                        $scope.reloadList();
                    }else{
                        alert(resp.remark);
                    }
                });
            };

            //批量发货
            $scope.multiDeliver  = function(){
                var orderNumbers = $scope.selectedItems;
                var numbers = "";
                for(var i = 0,len = orderNumbers.length;i<len;i++){
                    numbers += orderNumbers[i];
                    if(i < len - 1){
                        numbers += ",";
                    }
                }
                // 设置当前订单号（多个）
                $scope.$orderNumbers = numbers;
                $('#multiDeliverPage').empty().append('<div ng-controller="orderMultiDeliverCtrl" ng-include="\'/html/order/multiDeliverDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#multiDeliverPage').contents())($scope);

                $('#deliverListPage').hide();
                $('#multiDeliverPage').slideDown("slow");
            };


            //初始化数组
            $scope.pushToSelected = function(orderStatus, orderNumber, orderShipmentNumber){
                if(orderStatus === 35){
                    $scope.selectedItemsForAll.push(orderNumber);
                    $scope.selectedShipmentItemsForAll.push(orderShipmentNumber);
                }
            };

            //从详情中返回订单发货列表时要重新加载订单列表
            $scope.$on("loadDeliverTable", function () {
                $scope.deliverTableParams.reload();
            });

            $scope.reloadList = function(){
                $scope.deliverTableParams.reload();
            };

            /*格式化订单日期*/
            $scope.$watch("query.orderTimeBegin", function () {
                if($scope.query.orderTimeBegin){
                    $scope.query.orderTimeBegin = moment($scope.query.orderTimeBegin).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.orderTimeEnd", function () {
                if($scope.query.orderTimeEnd){
                    $scope.query.orderTimeEnd = moment($scope.query.orderTimeEnd).format("YYYY-MM-DD");
                }
            });

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //-- =======================================初始化===========================================
            //加载订单
            $scope.$changeCurrMenuByCode('mvo_order_deliver');

            //获取物流公司
            $scope.listLogisticsCompanies();

            $scope.deliverTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                count: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer, params) {
                    var postData = angular.copy($scope.querySaved);
                    postData.pageIndex = params.page();
                    postData.pageSize = params.count();
                    if($scope.currentTab === 1){
                        postData.orderStatus = 35;
                        postData.orderStatuss = null;
                    }else{
                        postData.orderStatus = null;
                        postData.orderStatuss = [60,70];
                    }

                    //table区域重新加载，选择的订单需要重置
                    $scope.selectedItemsForAll = [];
                    $scope.selectedItems = [];
                    $scope.selectedShipmentItemsForAll = [];
                    $scope.selectedShipmentItems = [];
                    //查询
                    orderService.queryDeliver(postData).$promise.then(function (resp) {
                        if (resp.success) {

                            params.total(resp.query.totalRecord);
                            //处理是否退款标识
                            for(var i = 0,len = resp.models.length; i<len; i++){
                                var o = resp.models[i];
                                if((o.flagGather.toString()).charAt(1) == '1' ){
                                    resp.models[i].flagGather = true;
                                    resp.models.splice(i,1);
                                    len--;
                                    i--;
                                }
                                else{
                                    resp.models[i].flagGather = false;
                                }
                            }
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            $('#deliverSearchForm #searchBtn').button('reset');
                            if ($globalSetting.isMockEnv) {
                                $defer.resolve(list.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            } else {
                                $defer.resolve(list);
                            }
                            $scope.$loaded = true;
                        }
                    });
                }
            });



        }
    ]);