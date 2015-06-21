/**
 *  name：refundListCtrl
 *  author: caibin
 *  date: 2014/10/18
 */
angular.module('flymvo.refund.refundListCtrl', [])
    .controller('refundListCtrl', [
        '$compile',
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'ngTableParams',
        '$rootScope',
        '$state',
        '$window',
        'ngPopover',
        'ngDialog',
        function ($compile, $scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, TableParams, $rootScope, $state, $window, ngPopover, ngDialog) {
            "use strict";

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;
            //表格模板
            $scope.templates = {
                //退货表格
                refundReturnTable: '/html/refund/include/refundReturnTable.html?tag=' + $globalSetting.version,
                //换货表格
                refundExchangeTable: '/html/refund/include/refundExchangeTable.html?tag=' + $globalSetting.version,
                //退款表格
                refundChargeBackTable: '/html/refund/include/refundChargeBackTable.html?tag=' + $globalSetting.version,
                //补发表格
                refundRedeliverTable: '/html/refund/include/refundRedeliverTable.html?tag=' + $globalSetting.version,

                //重发货
                redeliver: '/html/refund/info/redeliver.html?tag=' + $globalSetting.version,
                //是否需要回收商品
                "isNeedReceive": 'html/template/isNeedReceive.html?tag=' + $globalSetting.version,
                //售后单详情
                "detail" : 'html/refund/refundDetail.html?tag=' + $globalSetting.version,
                //重发货/补发 模态框
                reDeliverModal : '/html/refund/include/redeliverModal.html?tag=' + $globalSetting.version
            };

            //初始化查询条件
            $scope.query = {};

            //当前选择的标签页 - 退货
            $scope.currentTab = 1;
            $scope.listTemplate = $scope.templates.refundReturnTable;

            //下拉状态
            $scope.foregroundStatusDesc = null;

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);

            $scope._refundConstants = refundConstants;


            //-- =======================================函数===========================================
            //退货
            $scope.returnGoods = function () {
                $scope.currentTab = 1;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundReturnTable;
                $scope.$loaded = false;
            };
            //换货
            $scope.exchangeGoods = function () {
                $scope.currentTab = 2;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundExchangeTable;
                $scope.$loaded = false;
            };
            //退款
            $scope.refund = function () {
                $scope.currentTab = 3;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundChargeBackTable;
                $scope.$loaded = false;
            };
            //补发
            $scope.supplyAgain = function () {
                $scope.currentTab = 4;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundRedeliverTable;
                $scope.$loaded = false;
            };

            //重新加载列表
            $scope.reloadList = function(){
                $scope.refundTableParams.reload();
            };

            //搜索
            $scope.search = function () {
                //validate form first
                if($scope.refundSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#refundSearchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $("#refundSearchForm #refundSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.refundTableParams.reload();
                }
            };

            //重置
            $scope.resetForm = function () {
                $scope.query.orderReturnNo = "";
                $scope.query.orderNo = "";
                $scope.query.createTimeGEStr = null;
                $scope.query.createTimeLEStr = null;
                $scope.query.skuName = "";
                $scope.query.skuNumber = "";
                $scope.query.totalAmountS = null;
                $scope.query.totalAmountE = null;

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

            //时间转换
            $scope.$watch("query.createTimeLEStr", function () {
                if ($scope.query.createTimeLEStr) {
                    $scope.query.createTimeLEStr = moment($scope.query.createTimeLEStr).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.createTimeGEStr", function () {
                if ($scope.query.createTimeGEStr) {
                    $scope.query.createTimeGEStr = moment($scope.query.createTimeGEStr).format("YYYY-MM-DD");
                }
            });


            //-- 显示详细
            $scope.showDetail = function(returnNo){
                $('#refundListPage').hide();
                $('#refundDetailPage').slideDown("slow");
                // 设置当前售后单号
                if(returnNo){
                    $scope.$returnNo = returnNo;
                }else{
                    //表示更新detail
                }

                // 设置当前订单号（多个）
                $('#refundDetailPage').empty().append('<div ng-controller="refundDetailCtrl" ng-include="\'/html/refund/refundDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#refundDetailPage').contents())($scope);

                $('#refundListPage').hide();
                $('#refundDetailPage').slideDown("slow");

            };


            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.reloadList();
                $('#refundListPage').show();
                $('#refundDetailPage').hide();
            };

            //-- =======================================表格内函数===========================================
            //下拉框状态改变时，重新加载tab
            $scope.statusChange = function (selectedStatus) {
                if (selectedStatus) {
                    $scope.foregroundStatusDesc = selectedStatus.label;
                } else {
                    $scope.foregroundStatusDesc = "";
                }
                $scope.reloadList();
            };


            //打开发货模态框，保存当前salesOrderNo，resendAddressDTO
            $scope.openDeliverModal = function (resendAddressDTO, returnNo) {
                $scope.resendAddressDTO = resendAddressDTO;
                $scope.salesOrderNoForModal = returnNo;
                //获取物流公司列表
                refundService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.logisticsCompany = resp.models;
                    }
                });
            };

            //重发货--补发
            $scope.redeliver = function (deliverInfo) { 
                var returnNo  = $scope.salesOrderNoForModal;
                var trackingNo = deliverInfo.trackingNo;
                var carrier = deliverInfo.logisticsCompany.code; 
                var carrierName = deliverInfo.logisticsCompany.name;
                refundService.deliver(
                    angular.toJson({
                        "orderReturnNo": returnNo,
                        "trackingNo": trackingNo,
                        "carrier": carrier,
                        "carrierName": carrierName
                    })
                ).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("发货成功！");

                            $scope.reloadList();
                            $('#reDeliverModal').modal('hide');
                            $scope.deliverInfo = null;
                            //刷新页面
                        } else {
                            alert("发货失败,请检查参数");
                        }
                    });
            };

            //已回收
            $scope.recycle = function (returnNo) {
                if($window.confirm("您确认回收此单商品吗？")){
                    refundService.recycle({"returnNo": returnNo}).$promise.then(function (resp) {
                        if (resp.success) {
                            $window.alert("操作成功");
                            //重新刷新
                            $scope.reloadList();
                        }
                        else {
                            $window.alert("操作失败");
                        }
                    });
                }

            };

            // //已补发
            // $scope.reSupply = function (returnNo) {
            //     refundService.reSupply({"returnNo": returnNo}).$promise.then(function (resp) {
            //         if (resp.success) {
            //             alert("操作成功");
            //             //重新刷新
            //             $scope.reloadList();
            //         }
            //         else {
            //             alert("操作失败");
            //         }
            //     });
            // };

            //打开dialog
            $scope.openIsNeedReceiveDialog = function (returnNo) {
                $scope.currentReturnNo = returnNo;  
                ngDialog.open(
                    {
                        template: $scope.templates.isNeedReceive,
                        //controller: "refundListCtrl",
                        scope: $scope
                    });
            };

            //回收商品
            $scope.isNeedReceive = function (isNeedReceive) {
                $scope.agree($scope.currentReturnNo, isNeedReceive);
            };

            //退款里的 同意
            $scope.agree = function (returnNo, isNeedReceive) {
                if($window.confirm("您确认同意此单退款吗？")){
                    refundService.agree({"returnNo": returnNo, "isNeedReceive": isNeedReceive}).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");

                            $scope.reloadList();
                            if (isNeedReceive === 1) {
                                //需要回收商品，跳转到退货Tab
                                $scope.returnGoods();

                            } else if (isNeedReceive === 0) {
                                //不需要回收商品，刷新退款Tab
                                $scope.refund();
                            }
                            ngDialog.close();

                        }
                        else {
                            alert("操作失败");
                            ngDialog.close();
                        }
                    });
                }

            };

            //退货或补发里面的同意，不需要回收商品
            $scope.agreeDontNeedReceive = function (returnNo) {
                if($window.confirm("您确认同意此单的受理申请吗？")){
                    refundService.agree({"returnNo": returnNo, "isNeedReceive": 0}).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            //重新刷新表单
                            $scope.reloadList();
                        }
                        else {
                            alert("操作失败");
                        }
                    });
                }
            };

            //提醒发货
            $scope.remindShipment = function (returnNo) {

                refundService.remindShipment({"returnNo": returnNo}).$promise.then(function (resp) {
                    if (resp.success) {
                        alert("操作成功");
                    }
                    else {
                        alert("操作失败");
                    }
                });
            };

            //退货原因 详情
            $scope.checkReturnReason = function (description, imgUrls, event) {
                $scope.returnReason = {};
                $scope.returnReason.description = description;
                $scope.returnReason.imgUrls = [];
                if (imgUrls && imgUrls.length > 0) {
                    for (var i = 0, len = imgUrls.length; i < len; i++) {
                        $scope.returnReason.imgUrls.push({url: imgUrls[i]});
                    }
                }
                ngPopover.open(
                    event.toElement,  //element
                    $scope,  //scope
                    {  //options
                        template: '/html/refund/include/resolutionPopover.html?tag=' + $globalSetting.version,
                        placement: 'bottom',
                        maxwidth: 440
                    }
                );
            };


            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_refund_list');

            //ngTable对象构造
            $scope.refundTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer, params) { 
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);     

                    if (postData.createTimeLEStr) {
                        postData.createTimeLEStr = moment(postData.createTimeLEStr).format("YYYY-MM-DD") + " 00:00:00";
                    }
                    if (postData.createTimeGEStr) {
                        postData.createTimeGEStr = moment(postData.createTimeGEStr).format("YYYY-MM-DD") + " 23:59:59";
                    }
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();
                    //查询类型
                    postData.resolution = $filter('refundType')($scope.currentTab);
                    //下拉状态
                    postData.foregroundStatusDesc = $scope.foregroundStatusDesc;

                    if (params.sorting() && (params.orderBy().length > 0)) {
                        var str = params.orderBy()[0];
                        //排序field
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0, 1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    refundService.query(angular.toJson(postData)).$promise.then(function (resp) {
                        $('#refundSearchForm #searchBtn').button('reset');
                        if (resp.models) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $("#refundSearchForm #refundSearchBtn").button("reset");
                            $defer.resolve(list);
                            $scope.$loaded = true;

                        }
                    });
                }
            });
        }
    ]); 
