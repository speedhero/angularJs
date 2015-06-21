/**
 * @name: 测试货品选择器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.test.testSkuSelectorCtrl', [])
    .controller('testSkuSelectorCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $globalSetting, skuSelector) {
            $scope.selectSingleSku = function(result){
                $window.alert("已选择"+result.productName);
            };

            $scope.selectMultiSkus = function(result){
                $window.alert("已选择个数"+result.length);
            };

            //多个货品
            $scope.skuSelector1 = skuSelector({
                maxNum : 50,
                multi: true,
                onSelect: 'selectMultiSkus',
                skuIds : '1,2,3'
            }, $scope);

            //多个货品
            $scope.skuSelector2 = skuSelector({
                maxNum : 25,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);

            //单个货品
            $scope.skuSelector3 = skuSelector({
                onSelect: 'selectSingleSku'
            }, $scope);

            $scope.openSkuSelector1 = function(){
                $scope.skuSelector1.open();
            };
            $scope.openSkuSelector2 = function(){
                $scope.skuSelector2.open();
            };
            $scope.openSkuSelector3 = function(){
                $scope.skuSelector3.open();
            };

            $scope.removeSingleSkuByExternal = function(){
                var array = $scope.skuSelector1.getSkus();
                $scope.skuSelector1.removeSingleSkuByExternal(array[0]);
            };



        }

    ]);
