/**
 * @name: 推荐组合创建/修改控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoUpsertCtrl', [])
    .controller('groupPromoUpsertCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'hourOptions',
        'promoConstants',
        'productService',
        'promoService',
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, productService, promoService, skuSelector) {

            //-- =======================================常量===========================================
            $scope.MAX_LIST_ITEM = 3;
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;
            //-- 是否显示主商品
            $scope.showSourceList = false;

            //当前核心模型（创建时候/编辑未初始化的时候）
            $scope.model ={
                //主sku列表
                sourceList : [],
                //推荐的sku列表
                list : []
            };


            //-- =======================================函数===========================================
            //显示/隐藏主商品信息
            $scope.toggleSourceList = function(){
                $scope.showSourceList = !$scope.showSourceList;
            };
            // 是否显示主商品信息
            $scope.isShowSourceList = function(){
                return $scope.showSourceList;
            };

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

            //-- 获得组合促销
            $scope.retrieveGroupPromo = function(){
                promoService.getGroupPromo({id:$scope.$currGroupPromoId}).$promise.then(function (resp) {
                    $scope.model = resp.model;
                    $scope.model.sourceList = [];
                    $scope.model.sourceList.push($scope.model.mainSku);
                    $scope.showSourceList = true;
                    $scope.$loaded = true;
                });
            };

            //移动推荐组合内的商品
            $scope.moveGroupItem = function (oldIndex, newIndex) {
                $scope.model.list.move(oldIndex, newIndex);
            };

            //是否加载完成
            $scope.isLoadSuccess = function(){
                return $scope.model.sourceList.length > 0;
            };

            //删除推荐组合内的商品
            $scope.deleteGroupItem = function (index) {
                if ($window.confirm("你确认删除这个商品吗？")) {
                    $scope.model.list.splice(index, 1);
                }
            };

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };

            //打开安装服务选择器
            $scope.openInstallServiceSelector = function(){
                $scope.installServiceSelector.open();
            };

            //货品选择器确认
            $scope.selectMultiSkus = function(skus){
                if(skus.length === 0)return;
                var idList = _.pluck($scope.model.list,'id');
                var mockArray = angular.copy($scope.model.list);
                angular.forEach(skus, function(item, index){
                    if(idList.indexOf(item.id) == -1){
                        item.promoPrice = item.price;
                        item.type = 1;
                        mockArray.push(item);
                    }
                });
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配推荐商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了，请删除部分商品再点击确定。");
                    return false;
                }else{
                    $scope.model.list = mockArray;
                    $scope.skuSelector.emptySkus();
                    return true;
                }

            };

            //货品选择器是否可用
            $scope.canOpenSkuSelector = function(){
                return $scope.model.list.length < $scope.MAX_LIST_ITEM;
            };

            //安装服务选择器确认
            $scope.selectInstallService = function(sku){
                if(!sku)return;
                var idList = _.pluck($scope.model.list,'id');

                var mockArray = angular.copy($scope.model.list);
                if(idList.indexOf(sku.id) == -1){
                    sku.type = 2;
                    mockArray.push(sku);
                }
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配推荐商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了。");
                    return true;
                }else{
                    $scope.model.list = mockArray;
                    return true;
                }

            };


            //安装服务选择器是否可用
            $scope.canOpenInstallServiceSelector = function(){
                var flag = $scope.model.list.length <= $scope.MAX_LIST_ITEM;
                if(flag){
                    angular.forEach($scope.model.list, function(item, index){
                        if(item.type === 2){
                            flag = false;
                        }
                    });
                }
                return flag;
            };


            //-- event:提交Form
            $scope.submit = function () {

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#groupPromoForm :input.ng-invalid');
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

                //2.检查商品数量下限
                if ($scope.model.list.length === 0) {
                    console.log('fail to validate sku length');
                    $('#skuSelectorBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择一个商品或者安装服务。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#skuSelectorBtn').popover('show');
                    $('#skuSelectorBtn').focus();
                    return;
                }

                //3.检查商品数量上限（不存在，仅为安全检查）
                if($scope.model.list.length > $scope.MAX_LIST_ITEM ){
                    $window.alert("亲，无法提交。最多只能选择3个搭配推荐商品哦，请删掉部分商品。");
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                //--start: 构造提交数据
                var postJson = {
                    mainSkus : [],
                    list:[]
                };
                angular.forEach($scope.model.sourceList, function(item, index){
                    postJson.mainSkus.push({
                        id: item.id,
                        promoPrice: item.promoPrice
                    });
                });
                angular.forEach($scope.model.list, function(item, index){
                    postJson.list.push({
                        id: item.id,
                        promoPrice: item.promoPrice,
                        type: item.type
                    });
                });
                if($scope.model.id){
                    postJson.id = $scope.model.id;
                }

                //--end: 构造提交数据

                promoService.upsertGroupPromo(angular.toJson(postJson)).$promise.then(function (resp) {
                    if (resp.success) {
                        if($scope.$currGroupPromoId){
                            //编辑成功
                            $scope.backToListAfterSingleUpsert($scope.$currSkuIds, $scope.$currGroupPromoId);
                        }else if($scope.$currSkuIds){
                            if(($scope.$currSkuIds+"").indexOf(",") === -1){
                                //添加单个成功
                                $scope.backToListAfterSingleUpsert($scope.$currSkuIds, -1);
                            }else{
                                //添加多个个成功
                                $scope.backToListAfterMultiCreate();
                            }

                        }
                    } else {
                        $window.alert(resp.message);
                    }

                    $('#submitBtn').button('reset');

                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });
            };

            //-- =======================================初始化===========================================

            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_group_promo_sku_list');


            if(angular.isDefined($stateParams.id) && $stateParams.id!==null){
                //【编辑】
                $scope.$currGroupPromoId = $stateParams.id;
            }else  if(angular.isDefined($stateParams.skuIds) && $stateParams.skuIds!==null){
                //【创建】
                $scope.$currSkuIds = $stateParams.skuIds;
            }

            if($scope.$currGroupPromoId){
                //【编辑】
                //获得组合
                $scope.retrieveGroupPromo();

            }else if($scope.$currSkuIds){
                //【创建】
                //获得主商品
                productService.listFullProducts({ids : $scope.$currSkuIds}).$promise.then(function (resp) {
                    //批量修改被屏蔽，所以必定返回一个
                    //$scope.model.sourceList = resp.models;
                    $scope.model.sourceList.push(resp.models[0]);
                    angular.forEach($scope.model.sourceList, function(item, index){
                        item.promoPrice = item.price;
                    });
                    $scope.$loaded = true;
                });
            }
            //-- 初始化多个货品选择器
            $scope.skuSelector = skuSelector({
                maxNum : 3,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);

            //-- 初始化单个安装服务选择器
            $scope.installServiceSelector = skuSelector({
                multi: false,
                onSelect: 'selectInstallService',
                isInstallService : true
            }, $scope);


        }
    ]);
