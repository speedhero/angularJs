/**
 * @name: 发货单打印控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/12.
 */
angular.module("flymvo.order.orderPrintListCtrl", [])
    .controller("orderPrintListCtrl", [
        '$scope',
        'orderService',
        '$location',
        '$window',
        '$stateParams',
        '$globalSetting',
        function ($scope, orderService, $location, $window, $stateParams, $globalSetting) {
            //-- =======================================常量===========================================
            $scope.SKU_GROUP_SIZE = 6;
            //-- =======================================变量===========================================

            //-- =======================================初始化===========================================
            //获取要打印的清单信息
            var url = $location.absUrl();
            var orderNumbers = "";

            url = url.split("?")[1];
            orderNumbers = url.split("=")[1];
            if ($globalSetting.isMockEnv) {
                orderNumbers = "1000";
            }
            orderService.multiShoppingList(angular.toJson(
                orderNumbers.split(",")
            )).$promise.then(function (resp) {
                    if(resp.success) {
                        $scope.models = resp.models;
                        //由于商品清单每6个就要分开多一张A4纸打印
//                        console.log($scope.models);
                        angular.forEach($scope.models, function(model,modelIndex){
                            var i = 1;
                            angular.forEach(model.shoppingListProductDOs, function(item,index){
                                item.index = i;
                                i += 1;
                            });
                            model.productGroupList = [];
                            while(model.shoppingListProductDOs.length > 0){
                                model.productGroupList.push(model.shoppingListProductDOs.splice(0, $scope.SKU_GROUP_SIZE));
                            }
                        });


                    } else {
                        $window.alert("请求数据出错，原因:" + resp.message);
                    }
                });


        }]);