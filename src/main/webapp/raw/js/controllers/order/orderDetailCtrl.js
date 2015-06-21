/**
 * @name orderDetailCtrl
 * @author patrick
 * @time 2014/12/23
 **/
angular.module("flymvo.order.orderDetailCtrl", [])
    .controller("orderDetailCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService) {

            //-- =======================================常量===========================================

            //-- =======================================变量===========================================
            //订单信息模板
            $scope.orderDetailTemplates = {
                //进度显示
                orderProgress: '/html/order/include/orderProgress.html?tag=' + $globalSetting.version,
                //订单追踪（待发货）
                trackOrderWaitForDeliver: '/html/order/include/trackOrderWaitForDeliver.html?tag=' + $globalSetting.version,
                //订单追踪（配送中）
                trackOrderDistributing: '/html/order/include/trackOrderDistributing.html?tag=' + $globalSetting.version,
                //订单追踪（已取消）
                trackOrderCancel: '/html/order/include/trackOrderCancel.html?tag=' + $globalSetting.version,
                //订单信息
                orderInfo: '/html/order/include/orderInfo.html?tag=' + $globalSetting.version
            };

            //-- =======================================函数===========================================
            //加载进度条
            $scope.loadProgressBar = function () {
                if ($scope.orderDetail) {
                    $scope.orderProgress = {};
                    var active, content;
                    active = 0;
                    content = [];
                    if ($scope.orderDetail.cancelTime > 0) {
                        content = [
                            {text: "消费者下单", time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                            {text: "消费者付款", time: $scope.orderDetail.payTime > 0 ? $scope.orderDetail.payTime : ""},
                            {text: "订单已取消", time: $scope.orderDetail.cancelTime > 0 ? $scope.orderDetail.cancelTime : ""}
                        ];
                    } else {
                        content = [
                            {text: "消费者下单", time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                            {text: "消费者付款", time: $scope.orderDetail.payTime > 0 ? $scope.orderDetail.payTime : ""},
                            {text: "制造商发货", time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                            {text: "消费者签收", time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        ];

                        //}else{
                        //    if($scope.orderDetail.orderReturnDTO){
                        //        content = [
                        //            {text: "消费者下单",time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                        //            {text: "消费者已申请退款",time: $scope.orderDetail.orderReturnDTO.createTime > 0 ? $scope.orderDetail.orderReturnDTO.createTime : ""},
                        //            {text: "制造商发货",time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                        //            {text: "消费者签收",time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        //        ];
                        //    }
                        //    else{
                        //        content = [
                        //            {text: "消费者下单",time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                        //            {text: "消费者已申请退款",time: ""},
                        //            {text: "制造商发货",time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                        //            {text: "消费者签收",time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        //        ];
                        //    }
                        //
                        //}

                    }
                    $scope.orderProgress.content = content;
                    if ($scope.orderDetail.acceptTime > 0) {
                        active = 4;//签收
                    } else if ($scope.orderDetail.sendTime > 0) {
                        active = 3;//发货
                    } else if ($scope.orderDetail.payTime > 0) {
                        active = 2;//付款
                    } else if ($scope.orderDetail.orderTime > 0) {
                        active = 1;//下单
                    } else if ($scope.orderDetail.cancelTime > 0) {
                        active = 2;//已取消
                    } else {
                        active = 0;//默认
                    }
                    $scope.orderProgress.active = active;
                }
            };


            //返回订单列表
            $scope.backToOrderList = function (orderNumber) {
                //隐藏orderDetail.html
                $("#orderDetailPage").hide();
                if ($scope.$backTo === 1) {
                    //展开orderList.html
                    $("#orderListPage").slideDown("slow");
                    //加载订单列表
                    $scope.$emit("loadOrderTable");
                } else if ($scope.$backTo === 2) {
                    $("#deliverListPage").slideDown("slow");
                    $scope.$emit("loadDeliverTable");
                } else if($scope.$backTo === 3) {
                    $("#errTrackingNoListPage").slideDown("slow");
                    $scope.$emit("loadErrTrackingNoTable");
                }else if($scope.$backTo === 4) {
                    $("#pendTrackingNoListPage").slideDown("slow");
                    $scope.$emit("loadPendTrackingNoTable");
                }else if($scope.$backTo === 5) {
                    $("#trackingNoLogListPage").slideDown("slow");
                    $scope.$emit("loadTrackingNoLogTable");
                }
            };

            //获得订单明细
            $scope.retrieveOrderDetail = function (isAfterDeliverSuccess, deliverInfo) {
                orderService.getOrderDetailInfo({"orderNumber": $scope.$orderNumber}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.orderDetail = resp.model;
                        //处理是否退款字段
                        if (($scope.orderDetail.flagGather.toString()).charAt(1) == '1') {
                            $scope.orderDetail.flagGather = true;
                        }
                        else {
                            $scope.orderDetail.flagGather = false;
                        }

                        $scope.loadProgressBar();

                        if(isAfterDeliverSuccess){
                            if (!$scope.orderDetail.trackingInfo) {
                                $scope.trackingInfoCarrier = deliverInfo.logisticsCompanyName.name;
                                $scope.trackingInfoTrackingNo = deliverInfo.trackingNo;
                            }
                            mockDeliverSuccess();
                        }
                    }
                });
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                var trackingNo = deliverInfo.trackingNo;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                orderService.deliver(angular.toJson({"orderNo": $scope.orderDetail.number, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName})).$promise.then(function (resp) {
                    if (resp.result == 1) {
                        $scope.retrieveOrderDetail(true, deliverInfo);
                    } else {
                        alert("发货失败，原因：" + resp.remark);
                    }
                });
            };

            //模拟修改订单发货后的状态
            function mockDeliverSuccess(){
                if ($globalSetting.isMockEnv) {
                    $scope.orderDetail.status = 60;
                }
            }

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
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

            //-- =======================================初始化===========================================
            if(angular.isDefined($stateParams.orderNumber) && $stateParams.orderNumber!==null){
                //获取orderNumber，如果直接从URL中过来，则从urlpath中获得
                $scope.$orderNumber = $stateParams.orderNumber;
            }

            //-- 获得订单详情
            $scope.retrieveOrderDetail();

            //-- 获取物流公司
            if(!$scope.$logisticsCompanies){
                $scope.listLogisticsCompanies();
            }


        }
    ]);