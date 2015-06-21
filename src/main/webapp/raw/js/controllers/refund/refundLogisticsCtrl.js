/**
 *  name：refundLogisticsCtrl
 *  author: Allen
 *  date: 2014/10/21
 */
angular.module('flymvo.refund.refundLogisticsCtrl', [])
    .controller('refundLogisticsCtrl', [
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
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, TableParams, $rootScope, $state) {
            "use strict";
            //-- =======================================函数===========================================
            $scope.logistics = {};
            //获取物流信息
            var trackingType = $scope.refundConstants.trackingType;

            var trackingNo = 0;
            if (trackingType == 1) {
                trackingNo = $scope.refund.receiveTrackingCode;
            } else if (trackingType == 2) {
                trackingNo = $scope.refund.resendTrackingCode;
            }

            if (!(trackingType && trackingNo)) return;

            refundService.getLogistics({trackingNo: trackingNo}).$promise.then(function (resp) {
                $scope.logistics = resp.model;
                console.log($scope.logistics);
            });

        }

    ]);
