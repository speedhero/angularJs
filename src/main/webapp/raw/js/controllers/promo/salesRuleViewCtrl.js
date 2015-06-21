/**
 * @name: 店铺优惠查看控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/20.
 */
angular.module('flymvo.promo.salesRuleViewCtrl', [])
    .controller('salesRuleViewCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'hourOptions',
        'promoConstants',
        'promoService',
        'productService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, promoService, productService, TableParams) {

            //-- =======================================变量===========================================

            $scope.model = {
                skus :[]
            };
            //-- =======================================函数===========================================
            //获得sku图片路径
            $scope.getProdImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_100_100_90" +image.substring(index);
                    }
                }
                return result;
            };

            //-- 获得店铺优惠
            $scope.retrieveSalesRule = function(){
                promoService.getSalesRule({id:$scope.$currSalesRuleId}).$promise.then(function (resp) {
                    var data = resp.model;
                    data.skus = [];
                    $scope.model = data;
                    var skuIds = "";
                    var giftIds = "";
                    if($scope.model.rangeType+"" === "2"){
                        skuIds = data.skuList.join(",");

                        //获取商品列表
                        productService.listFullProducts({ids : skuIds}).$promise.then(function (resp) {
                            $scope.model.skus = resp.models;

                            //构造分页对象
                            $scope.tableParams.reload();
                        });


                    }
                    if($scope.model.type === 'gift'){
                        giftIds = data.giftList.join(",");
                        //获取赠品列表
                        productService.listFullProducts({ids : giftIds}).$promise.then(function (resp) {
                            $scope.model.gifts = resp.models;
                        });
                    }
                });
            };


            //-- 是否满赠
            $scope.isKindOfGift = function(){
                return $scope.model.type === "gift";
            };

            //-- 是否不封顶满减
            $scope.isKindOfNoCapMinus = function(){
                return $scope.model.type === "minus" && $scope.model.noCap === 1;
            };

            //-- 是否阶梯满减
            $scope.isKindOfStepMinus = function(){
                return $scope.model.type === "minus" && $scope.model.noCap === 0;
            };


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_sales_rule_list');


            if(angular.isDefined($stateParams.salesRuleId) && $stateParams.salesRuleId!==null){
                //获取id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currSalesRuleId = $stateParams.salesRuleId;
            }
            //获取店铺优惠
            $scope.retrieveSalesRule();

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    var list = $scope.model.skus;
                    params.total(list.length);
                    list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(list);
                }
            });



        }
    ]);
