/**
 * @name: 运单号修改控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.trackingNoUpdateCtrl', [])
    .controller('trackingNoUpdateCtrl', [
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

            //模板
            $scope.templates = {
            };

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


            //修改运单号modal确认
            $scope.updateTrackingNo = function (trackingNoInfo) {
                var postData = {
                    logisticsCompanyOrig : trackingNoInfo.logisticsCompanyOrig,
                    logisticsCompany:    trackingNoInfo.carrier.code,
                    logisticsCompanyName:    trackingNoInfo.carrier.name,
                    orderNo:         trackingNoInfo.orderNo,
                    trackingNo:  trackingNoInfo.trackingNo,
                    trackingNoOrig: trackingNoInfo.trackingNoOrig
                };
                if(trackingNoInfo.tmsAbnormalOrderReportId){
                    postData.tmsAbnormalOrderReportId = trackingNoInfo.tmsAbnormalOrderReportId;
                }
                orderService.updateTrackingNo(angular.toJson(postData)).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $window.alert("修改成功");
                        $('#updateTrackingNoModal').modal('hide');
                        $scope.reloadList();
                    } else {
                        $window.alert(resp.message);
                        $('#updateTrackingNoModal').modal('hide');
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


            //-- 获取物流公司
            if(!$scope.$logisticsCompanies){
                $scope.listLogisticsCompanies();
            }

        }
    ]);