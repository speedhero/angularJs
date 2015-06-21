angular.module('flymvo.order.orderListCtrl', [])
    .controller('orderListCtrl', [
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
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, TableParams, $rootScope, $state, $compile, ngPopover) {

            //-- =======================================常量===========================================

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 订单列表 1  发货列表 2
            $scope.$backTo = 1;

            //订单表模板
            $scope.templates = {
                //订单表格
                orderTable: '/html/order/include/orderTable.html?tag=' + $globalSetting.version,
                //发货modal
                orderDeliveryModal: '/html/order/include/orderDeliverModal.html?tag=' + $globalSetting.version,
                //订单明细
                orderDetail: '/html/order/checkOrderDetail.html?tag=' + $globalSetting.version
            };

            //当前的订单标签页
            $scope.currentTab = 1;
            //常量：订单状态 
            $scope._orderStatus = orderConstants.orderTypesItems;

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
            $scope.query.status = 35;
            $scope.query.selectStatusItem = 1;
            
            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //用于记录选择的订单ID
            $scope.selectedItems = [];
            //用于记录全部的商品ID
            $scope.selectedItemsForAll = [];
            //用于控制发货按钮模态框的内容
            $scope.isDeliver = false;
            //默认不能激活发货功能
            $scope.orderNumberForCanDeliver = null;
            //物流/快递公司(多个)
            $scope.$logisticsCompanies = null;
            //是否显示信息
            //$scope.isShowAlert = false;

            //待发货未浏览记录数量
            $scope.hasWaitForDeliverCount = 0;
            //配送中未浏览记录数量
            $scope.hasDistributingCount = 0;


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

           //售后提醒 popover框
            $scope.openRefundPop = function(index) {
                $("#refundSpan"+index).popover('show');
            };
            $scope.closeRefundPop = function(index) {
                $("#refundSpan"+index).popover('hide');
                $("#refundSpan"+index).popover('destroy');
            };

            //下拉框状态改变时，重新加载
            $scope.statusChange = function (selectedStatus){
                   switch(parseInt(selectedStatus)){
                       case 1:  $scope.waitForDeliver();break;
                       case 2:  $scope.distributing();break;
                       case 3:  $scope.tradeFinish();break;
                       case 4:  $scope.allOrders();break;
                       default: $scope.waitForDeliver();
                   }
            };

            //显示所有Sku
            $scope.showOtherSkus = function(o) {
                o.flag4ShowOtherSkus = true;
            };

            //隐藏除第一个以外的所有skus
            $scope.hideOtherSkus = function(o) {
                o.flag4ShowOtherSkus = false;
            };

            //返回订单号字符串
            $scope.isShowOtherSkus = function(o,index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };


            //批量打印
            $scope.multiExport = function(){
                //if(!$scope.query.orderTimeBegin&&!$scope.query.orderTimeEnd){
                //    $scope.initDate();
                //}
                var start = $scope.query.orderTimeBegin;
                var end = $scope.query.orderTimeEnd;
                //验证时间
                if(!start&&end){
                        alert('亲，请输入开始时间');
                         return;
                }else  if(!end&&start){

                        alert('亲，请输入结束时间');
                        return;
                }
                else  if(start > end){
                        alert('亲，结束时间必须小于开始时间');
                        return;
                }
                else {
                        $scope.querySaved.orderTimeBegin = $scope.query.orderTimeBegin;
                        $scope.querySaved.orderTimeEnd = $scope.query.orderTimeEnd;
                        var url = '/data/order/export/excel?pageSize=10000';
                        //var flag = false;
                        if($scope.query.status){
                                url += '&&status=' + $scope.query.status;
                        }
                        if($scope.query.orderTimeBegin){
                                url += '&&orderTimeBegin=' + $scope.query.orderTimeBegin;
                        }
                        if($scope.query.orderTimeEnd){
                                url += '&&orderTimeEnd=' + $scope.query.orderTimeEnd;
                        }
                        if($scope.query.number){
                                url += '&&number=' + $scope.query.number;
                        }
                        if($scope.query.skuNumber){
                                url += '&&skuNumber=' + $scope.query.skuNumber;
                        }
                        if($scope.query.skuName){
                                url += '&&skuName=' + $scope.query.skuName;
                        }
                        if($scope.query.receiverName){
                                url += '&&receiverName=' + $scope.query.receiverName;
                        }
                        if($scope.query.orderTotalMin){
                                url += '&&orderTotalMin=' + $scope.query.orderTotalMin;
                        }
                        if($scope.query.orderTotalMax){
                                url += '&&orderTotalMax=' + $scope.query.orderTotalMax;
                        }
                         
                        //模拟点击a标签
                        $('body').append("<a target='_blank' id=\'downloadcsv\'  ></a>");
                        $('#downloadcsv').attr('href',url);
                        document.getElementById("downloadcsv").click();

                }
            };


            //$scope.initDate = function(){
            //    /*格式化订单日期*/
            //    var dateFormat = "YYYY-MM-DD";
            //    var now = new Date();
            //    var before = new Date();
            //    before.setDate(before.getDate() - 7);
            //    $scope.query.orderTimeBegin = moment(before).format(dateFormat);
            //    $scope.query.orderTimeEnd = moment(now).format(dateFormat);
            //};

            
            //--  重置查询函数
            $scope.resetSearch = function () {
                //将错误移除
                $scope.orderSearchForm.$setPristine(true);
                //处理验证的field
                $scope.orderSearchForm.orderTotalMin.$setViewValue("");
                $scope.orderSearchForm.orderTotalMax.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //搜索
            $scope.search = function () {
                $('#orderSearchForm #searchBtn').button('loading');
                //保存上一次的查询结果
                $scope.querySaved = angular.copy($scope.query);

                $scope.orderTableParams.reload();

            };

            //待发货
            $scope.waitForDeliver = function () {
                $scope.$loaded = false;
                //$scope.hasWaitForDeliverCount = 0;
                $scope.querySaved.status = 35;
                $scope.query.status = 35;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 1;
                    $("#searchSelect").get(0).options[0].selected = true;
                    $scope.orderTableParams.reload(); 
                }
            };

            //配送中
            $scope.distributing = function () {
                $scope.$loaded = false;
                //$scope.hasDistributingCount = 0;
                $scope.querySaved.status = 50;
                $scope.query.status = 50;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 2;
                    $("#searchSelect").get(0).options[1].selected = true;
                    $scope.orderTableParams.reload(); 
                }
            };

            //交易完成
            $scope.tradeFinish = function () {
                $scope.$loaded = false;
                // $scope.hasTradeFinishCount = 0;
                $scope.querySaved.status = 60;
                $scope.query.status = 60;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 3;
                    $("#searchSelect").get(0).options[2].selected = true;
                    $scope.orderTableParams.reload();
                }
            };

            //全部
            $scope.allOrders = function () {
                $scope.$loaded = false;
                // $scope.hasAllOrdersCount = 0;
                $scope.querySaved.status = null;
                $scope.query.status = null;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 4;
                    $("#searchSelect").get(0).options[3].selected = true;
                    $scope.orderTableParams.reload();
                    $scope.hasAllOrdersLoaded = true;
                }
            };


            //打印订单
            $scope.printDeliverList = function (orderNumber) {
                //激活发货按钮
                $scope.orderNumberForCanDeliver = orderNumber;
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
            $scope.openDeliverModal = function (orderShipmentNumber, orderStatus, orderNumber) {
                //变量初始化
                $scope.deliverInfoForModal = {};
                //将错误移除
                angular.element('#deliverModalForm').scope().deliverModalForm.$setPristine(true);

                $scope.orderNumberForModal = orderShipmentNumber;
                $scope.orderStatusForModal = orderStatus;
                $scope.orderNumberForDeliver = orderNumber;
                //发货模态框的收货信息
                orderService.getReceiveInfo({"orderNumber": orderShipmentNumber}).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.receiveInfo = resp.model;
                        $('#deliverModal').modal('show');
                    } else {
                        //alert("获取数据出错，原因："+resp.message);
                        $('#deliverModal').modal('hide');
                    }
                });
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                $scope.isDeliver = true;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var trackingNo = deliverInfo.trackingNo;
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
                                //跳至配送中Tab
                                $scope.distributing();
                                return;
                            }
                            $scope.closeDeliverModalTime--;
                            var clearTimeOut = $timeout(tick, 1000);
                        })();
                    }else{
                        alert(resp.remark);
                    }
                });
            };

            //关闭模态框
            $scope.closeDeliverModal = function () {
                $('#deliverModal').modal('hide');
                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                $scope.isDeliver = false;
                //跳至配送中Tab
                $scope.distributing();
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

                $('#orderListPage').hide();
                $('#orderDetailPage').slideDown("slow");
            };

            //在发货对话框中打开订单详情
            $scope.checkOrderDetail4DeliverModal = function (orderNumberForModal) {
                //关闭模态框
                $scope.closeDeliverModal();
                //打开详情
                $scope.checkOrderDetail(orderNumberForModal);
            };

            //从详情中返回订单列表时要重新加载订单列表
            $scope.$on("loadOrderTable", function () {
                $scope.orderTableParams.reload();
            });

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
            /*格式化订单日期结束*/

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

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };


            //-- =======================================初始化===========================================

            $scope.$changeCurrMenuByCode('mvo_order_list');

            //获取物流公司
            $scope.listLogisticsCompanies();

            //加载订单
            $scope.orderTableParams = new TableParams({
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
                    postData.status = $filter('orderTypes')($scope.currentTab);
                    //table区域重新加载，选择的订单需要重置
                    $scope.selectedItemsForAll = [];
                    $scope.selectedItems = [];
                    //查询
                    orderService.query(postData).$promise.then(function (resp) {
                        if (resp.success) {
                            params.total(resp.query.totalRecord);
                            //处理是否退款标识
                            for(var i = 0,len = resp.models.length; i<len; i++){
                                var o = resp.models[i];
                                if((o.flagGather.toString()).charAt(1) == '1' ){
                                    resp.models[i].flagGather = true;
                                }
                                else{
                                    resp.models[i].flagGather = false;
                                }
                            }

                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            $('#orderSearchForm #searchBtn').button('reset');
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