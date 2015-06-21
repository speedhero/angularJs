/**
 * name:refundInfoCtrl
 * author:caibin
 * date:2014/10/20
 */
angular.module("flymvo.refund.refundInfoCtrl",[])
    .controller("refundInfoCtrl",[
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'orderService',
        'ngTableParams',
        '$rootScope',
        '$state',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, orderService, TableParams, $rootScope, $state){

            //-- =======================================变量===========================================
           /* //模拟数据，真实数据来自上层controller 的$scope
            $scope.item = {
                resolution:"1",
                refundMoney:"200",
                reasonType:"1",
                returnNo:"10000",
                submitTime:1413775330119,
                reason:"漏液",
                picture:[
                    {id:1,src:"/img/weixinfuwu.jpg"},
                    {id:2,src:"/img/weixinfuwu.jpg"},
                    {id:3,src:"/img/weixinfuwu.jpg"}
                ],
                product:{
                    image:"/img/weixindingyue.jpg",
                    title:"舒肤佳活力运动劲能活力沐浴露",
                    productId:"12321"
                },
                salesOrderNo:"111111"
            };
           */

            $scope.item = {};
            $scope.logisticsCompany = null;

            //-- =======================================函数===========================================

            //获取售后信息
            $scope.$watch('refund', function(newVal, oldVal) {
              $scope.item = $scope.refund;
            });
            //refundService.get().$promise.then(function(resp) {
                //$scope.item = resp.model;
            //});

            //获取物流公司
            refundService.getLogisticsCompany().$promise.then(function(resp){
                if(resp.success === true){
                    $scope.logisticsCompany = resp.models; 
                }
            }); 
 
            //重新发货
            $scope.deliver = function(salesOrderNo,deliverInfo){
                var trackingNo = deliverInfo.trackingNo;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                refundService.deliver(angular.toJson({"orderNo":salesOrderNo,"trackingNo":trackingNo,"logisticsCompany":logisticsCompany,"logisticsCompanyName":logisticsCompanyName})).$promise.then(function (resp) {
                    if(resp.result === true){
                        alert("发货成功！");
                    }else{
                        alert("发货失败！");
                    }
                });
            };

        }
    ]);
