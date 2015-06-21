angular.module('flymvo.refund.refundDetailCtrl', [])
    .controller('refundDetailCtrl', [
        '$scope',
        '$filter',
        '$state',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'ngDialog',
        function ($scope, $filter, $state, $stateParams, $globalSetting, refundConstants, refundService, ngDialog) {
            "use strict";
            //-- =======================================变量===========================================
            //售后信息模板
            $scope.template = {
                //物流信息
                refundLogistics: 'html/refund/info/logistics.html?tag=' + $globalSetting.version,
                //补发重发
                redeliver: 'html/refund/info/redeliver.html?tag=' + $globalSetting.version,
                //回收地址
                recycleAddress: 'html/refund/info/recycleAddress.html?tag=' + $globalSetting.version,
                //退货回收地址
                returnAddress: 'html/refund/info/refundReturnAddress.html?tag=' + $globalSetting.version,
                //是否需要回收商品Dialog
                isNeedReceive: 'html/template/isNeedReceive.html?tag=' + $globalSetting.version,
                //详细信息
                refundInfoTemplate: '/html/refund/info/refundInfo.html?tag=' + $globalSetting.version
            };

            //获取售后状态
            $scope.refund = {};

            //-- =======================================函数===========================================
            //获取详情
            $scope.loadRefundDetail = function () {
                refundService.get({
                    refundId: $scope.$returnNo
                }).$promise.then(function (resp) {
                        $scope.refund = resp.model;
                        console.log($scope.refund);
                        $scope.refundType = $filter('refundTypeRevers')($scope.refund.resolution);
                        $scope.refundStatus = $filter('refundStatusRevers')($scope.refund.resolution, $scope.refund.foregroundStatusDesc);

                        /*** 重要
                         * 类型与状态二维表（x,y轴均从1开始）
                         退货： 待受理 待退货 退货中 退款中 完成 取消
                         换货： 待受理 待退货 退货中 待重发 重发中 完成 取消
                         退款： 待受理 退款中 完成 取消
                         补发： 待受理 待补发 配送中 完成 取消
                         例如：
                         refundType = 2 表示换货
                         refundStatus = 4 表示待重发
                         可以直接写类型与状态进行测试
                         //测试设定，待删除 TODO
                         $scope.refundType =2;
                         $scope.refundStatus =4;
                         */
                        console.log($scope.refundType);
                        console.log($scope.refundStatus);
                        // if($scope.refundStatus == null)
                        //   return;

                        $scope.refundConstants = angular.copy(_.findWhere(refundConstants.refundType, {
                            value: "" + $scope.refundType
                        }));

                        //合并进度条设定
                        _.extend($scope.refundConstants.progress, _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).progress);

                        //合并计时器
                        _.extend($scope.refundConstants.timer, _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).timer);

                        //处理信息模板
                        var tmp = _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).template;
                        if (!_.isUndefined(tmp)) {
                            $scope.refundConstants.template = tmp;
                        }


                        //运单号类型
                        tmp = _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).trackingType;
                        if (!_.isUndefined(tmp)) {
                            $scope.refundConstants.trackingType = tmp;
                        }

                        //进度条设定
                        $scope.progressBar = {};
                        $scope.progressBar = $scope.refundConstants.progress;
                        _.each($scope.refund.refundProgress, function (item, index) {
                            $scope.progressBar.content[index].time = item;
                        });

                        //计时器设定
                        $scope.timeCounter = $scope.refundConstants.timer;
                        $scope.timeCounter.start = $scope.refund.createTime;

                        //处理信息模板
                        $scope.handleTemplate = $scope.refundConstants.template;
                        console.log($scope.progressBar);

                    });


                refundService.queryAddress(angular.toJson({
                    pageIndex: 1,
                    pageSize: 10
                })).$promise.then(function (resp) {
                        $scope.recycleAddress = resp.models;
                        for (var i = 0; i < resp.models.length; i++) {
                            if (resp.models[i].defaultFlag === true) {
                                $scope.recycleDefaultAddress = resp.models[i];
                                break;
                            }
                        }
                    });
            };

            //同意
            $scope.agree = function () {
                console.log($scope.refund.returnNo);
                console.log($scope.refund.resolution);
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 1
                }).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("操作成功");
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };

            //回收
            $scope.recycle = function () {
                console.log($scope.refund.returnNo);
                refundService.recycle({
                    "returnNo": $scope.refund.returnNo
                }).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("操作成功");
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };


            //打开dialog
            $scope.openIsNeedReceiveDialog = function () {
                $scope.currentReturnNo = $scope.refund.returnNo;
 
                ngDialog.open({
                    template: $scope.template.isNeedReceive, 
                    scope: $scope,
                    placement: "top"
                });
            };
            //重新发货

            //获取物流公司
            refundService.getLogisticsCompany().$promise.then(function (resp) {
                if (resp.success === true) {
                    $scope.logisticsCompany = resp.models;
                }
            });

            //重新发货
            $scope.deliver = function(deliverInfo) {  
              var returnNo = $scope.refund.returnNo;
              var trackingNo = deliverInfo.trackingNo;
              var carrier = deliverInfo.logisticsCompany.code; 
              var carrierName = deliverInfo.logisticsCompany.name; 
              refundService.deliver(angular.toJson({
                "orderReturnNo": returnNo,
                "trackingNo": trackingNo,
                "carrier": carrier,
                "carrierName": carrierName 
              })).$promise.then(function(resp) {
                if (resp.success === true) {
                  alert("发货成功！");
                  //重刷页面
                  $scope.loadRefundDetail();
                } else {
                  alert("发货失败！");
                }
              });
            };

            //打开需要回收商品
            $scope.openIsNeedReceiveDialog = function (returnNo) {
                $scope.currentReturnNo = returnNo; 
                ngDialog.open({
                    template: $scope.template.isNeedReceive, 
                    scope: $scope,
                    placement: "top"
                });
            };

            //回收商品
            $scope.isNeedReceive = function (isNeedReceive) {
                $scope.agreeNeedReceive($scope.currentReturnNo, isNeedReceive);
            };

            //退货中的同意，不需要回收商品
            $scope.agreeApply = function () {
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 0
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            $scope.showDetail();
                            //重新刷新表单
                        } else {
                            alert("操作失败");
                        }
                    });
            };

            //需要回收商品
            $scope.agreeNeedReceive = function (returnNo, isNeedReceive) {
                console.log(isNeedReceive);
                console.log(returnNo);
                refundService.agree({
                    "returnNo": returnNo,
                    "isNeedReceive": isNeedReceive
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                             $scope.showDetail();
                            if (isNeedReceive === 1) {
                                //重刷页面
                                $scope.showDetail();
                            }
                        } else {
                            alert("操作失败");
                        }
                        ngDialog.close();
                    });
            };


            //退货里的同意，不需要回收商品
            $scope.agreeDontNeedReceive = function () {
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 0
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            //重新刷新表单
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };
            //监听物流地址的变化
            $scope.$on("setDefault",function(){
                $scope.showDetail();            
            });

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };


            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_refund_list');

            if(angular.isDefined($stateParams.productId) && $stateParams.productId!==null){
                //获取售后单号，如果直接从URL中过来，则从urlpath中获得
                $scope.$returnNo = $stateParams.returnNo;
            }

            $scope.loadRefundDetail();

        }
    ]);