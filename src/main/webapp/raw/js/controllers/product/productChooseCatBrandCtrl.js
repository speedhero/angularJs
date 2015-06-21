/**
 * @name: 商品选择品牌类目控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productChooseCatBrandCtrl', [])
    .controller('productChooseCatBrandCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'productConstants',
        'productService',
        function ($scope, $filter, $timeout, $state, $stateParams,  $globalSetting, productConstants, productService) {

            //-- =======================================变量===========================================
            //-- 初始化模型
            $scope.product = {
                //选中的目录
                categoryId : null,
                categoryName : null,
                //选中的品牌
                brandId : null,
                brandName : null
            };
            //-- 供应商可用目录
            $scope.supplierCategories = [];
            //-- 供应商可用品牌
            $scope.supplierBrands = [];

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- 获得供应商可用品牌
            productService.listSupplierBrands().$promise.then(function (resp) {
                $scope.supplierBrands = resp.models;
            });

            //-- =======================================函数===========================================
            //-- 选择目录
            $scope.selectCategory = function(categoryId, categoryName){
                $scope.product.categoryId = categoryId;
                $scope.product.categoryName = categoryName;
            };

            //-- 选择品牌
            $scope.selectBrand = function(brandId, brandName){
                $scope.product.brandId = brandId;
                $scope.product.brandName = brandName;
            };

            //-- 进入步骤2
            $scope.gotoStep2 = function(){
                var tip = "";
                var flag = true;
                if(flag && !$scope.product.categoryId){
                    tip = "请选择类目";
                    flag = false;
                }
                if(flag && !$scope.product.brandId){
                    tip = "请选择品牌";
                    flag = false;
                }
                if(flag){
                    $stateParams.categoryId = $scope.product.categoryId;
                    $stateParams.brandId = $scope.product.brandId;
                    $state.go('main.createProduct', $stateParams);
                }else{
                    //show popover tip
                    $('#gotoStep2Btn').popover({
                        container : 'body',
                        placement : 'left',
                        content : tip,
                        trigger : 'focus'
                    }).on('hidden.bs.popover', function () {
                        $('#gotoStep2Btn').popover('destroy');
                    });
                    $('#gotoStep2Btn').popover('show');
                }
            };


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_add');


        }
    ]);
