/**
 * @name: 订单批量发货
 * @description:
 * @author: patrick.he
 * @create : 2014/12/24.
 */
angular.module('flymvo.order.orderMultiDeliverCtrl', [])
    .controller('orderMultiDeliverCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedMultiDeliver = false;

            //用于标识是否提交过
            $scope.hasCommit = false;

            //发货模型
            $scope.deliverInfoForModal = {};

            //-- =======================================函数===========================================
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

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //获得要发货的订单列表
            $scope.retrieveDeliverOrderArray = function (numbers) {
                orderService.queryDeliver({number: numbers}).$promise.then(function (resp) {
                    if (!resp.success) {
                        $window.alert(resp.message);
                    }
                    $scope.$deliverOrderArray = resp.models;
                    $scope.$loadedMultiDeliver = true;

                });
            };


            //批量发货确认
            $scope.multiOrderDeliver = function (deliverInfo, deliverInfoNumber) {
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#multiDeliverPage :input.ng-invalid');
                var flag = true;
                if (fields.length > 0) {
                    fields.each(function (index, value) {
                        if (!flag)return;
                        if ($(this).parents(".ng-hide").length === 0) {
                            //找到非隐藏状态的input
                            $(this).focus();
                            console.log('fail to validate ' + $(this).attr("name"));
                            flag = false;
                        }
                    });

                }

                if (!flag) {
                    console.log('validate form, fail!!!');
                    return;
                }

                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var deliverObj = [];
                var trackingNo = "";

                for (var i = 0, len = deliverInfoNumber.length; i < len; i++) {
                    trackingNo = deliverInfoNumber[i].deliverInfoForNumber.replace(/\s+/g, "");
                    deliverObj.push({"orderNo": deliverInfoNumber[i].number, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName});
                }
                //console.log(deliverObj);
                orderService.multiDeliver(angular.toJson(deliverObj)).$promise.then(function (resp) {
                    if (resp.result === 1) {
                        $window.alert("发货成功");
                        $scope.backToList();
                    } else {
                        $window.alert(resp.remark);
                    }
                });
            };


            //-- =======================================初始化===========================================
            if (angular.isDefined($stateParams.orderNumbers) && $stateParams.orderNumbers !== null) {
                //获取orderNumbers，如果直接从URL中过来，则从urlpath中获得
                $scope.$orderNumbers = $stateParams.orderNumbers;

                if ($globalSetting.isMockEnv) {
                    $scope.$orderNumbers = "1000";
                }
            }

            //-- 获得发货订单列表
            $scope.retrieveDeliverOrderArray($scope.$orderNumbers);

            //-- 获取物流公司
            if (!$scope.$logisticsCompanies) {
                $scope.listLogisticsCompanies();
            }


        }
    ]);