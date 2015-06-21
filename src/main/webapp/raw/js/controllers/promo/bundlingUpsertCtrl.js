/**
 * @name: 搭配组合创建/修改控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/30.
 */
angular.module('flymvo.promo.bundlingUpsertCtrl', [])
    .controller('bundlingUpsertCtrl', [
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
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, promoService, skuSelector) {

            //-- =======================================常量===========================================
            $scope.MAX_LIST_ITEM = 5;
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //当前核心模型（创建时候/编辑未初始化的时候）
            $scope.model ={
                //包含的skus
                skus : []
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

            //-- 获得搭配组合
            $scope.retrieveBundling = function(){
                promoService.getBundling({id:$scope.$currBundlingId}).$promise.then(function (resp) {
                    $scope.model = resp.model;
                    $scope.$loaded = true;
                });
            };

            //移动搭配组合内的商品
            $scope.moveBundlingItem = function (oldIndex, newIndex) {
                $scope.model.skus.move(oldIndex, newIndex);
            };

            //是否可以提交
            $scope.canSubmit = function(){
                return $scope.model.skus.length >= 2;
            };

            //删除搭配组合内的商品
            $scope.deleteBundlingItem = function (index) {
                if ($window.confirm("你确认删除这个商品吗？")) {
                    $scope.model.skus.splice(index, 1);
                }
            };

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };


            //货品选择器确认
            $scope.selectMultiSkus = function(skus){
                if(skus.length === 0)return;
                var idList = _.pluck($scope.model.skus,'id');
                var mockArray = angular.copy($scope.model.skus);
                angular.forEach(skus, function(item, index){
                    if(idList.indexOf(item.id) == -1){
                        item.promoPrice = item.price;
                        mockArray.push(item);
                    }
                });
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了，请删除部分商品再点击确定。");
                    return false;
                }else{
                    $scope.model.skus = mockArray;
                    $scope.skuSelector.emptySkus();
                    return true;
                }

            };

            //货品选择器是否可用
            $scope.canOpenSkuSelector = function(){
                return $scope.model.skus.length < $scope.MAX_LIST_ITEM;
            };


            //-- event:提交Form
            $scope.submit = function () {

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#bundlingForm :input.ng-invalid');
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

                //2.检查商品数量下限（界面不发生，仅为安全检查）
                if ($scope.model.skus.length === 0) {
                    console.log('fail to validate sku length');
                    $('#skuSelectorBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择两个商品。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#skuSelectorBtn').popover('show');
                    $('#skuSelectorBtn').focus();
                    return;
                }

                //3.检查商品数量上限（界面不发生，仅为安全检查）
                if($scope.model.skus.length > $scope.MAX_LIST_ITEM ){
                    $window.alert("亲，无法提交。最多只能选择5个搭配商品哦，请删掉部分商品。");
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                //--start: 构造提交数据
                var postJson = {
                    name : $scope.model.name,
                    skus : []
                };
                angular.forEach($scope.model.skus, function(item, index){
                    postJson.skus.push({
                        id: item.id,
                        promoPrice: item.promoPrice
                    });

                    if(item.failTip){
                        delete item.failTip;
                    }
                });
                if($scope.model.id){
                    postJson.id = $scope.model.id;
                }

                //--end: 构造提交数据

                promoService.upsertBundling(angular.toJson(postJson)).$promise.then(function (resp) {
                    //mockErrorResponse(resp);

                    if (resp.success) {
                       $scope.backToList();
                    } else {
                        handleErrorResponse(resp);
                    }

                    $('#submitBtn').button('reset');

                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });
            };

            //处理提交失败的请求
            function handleErrorResponse(resp){
                var failModels = resp.models;
                angular.forEach(failModels, function(failModel, failId){
                    angular.forEach($scope.model.skus, function(sku, skuIndex){
                        if(sku.id === failModel.id){
                            sku.failTip = "此商品已参与名为 '"+failModel.name+"' 的搭配组合，无法再参加此搭配组合,请删除此商品。";
                        }
                    });
                });

            }


            //模拟业务请求失败
            function mockErrorResponse(resp){
                if ($globalSetting.isMockEnv){
                    var failModels = [];
                    //随机抽取1条失败的
                    var randomList = _.sample($scope.model.skus, 1);
                    angular.forEach(randomList,function(item){
                        failModels.push({
                            id :item.id,
                            name: "活动"+item.id
                        });
                    });
                    resp.success = false;
                    resp.models = failModels;
                }
            }

            //-- =======================================初始化===========================================

            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_bundling_list');


            if(angular.isDefined($stateParams.id) && $stateParams.id!==null){
                //【编辑】
                $scope.$currBundlingId = $stateParams.id;
            }

            if($scope.$currBundlingId){
                //【编辑】
                //获得搭配
                $scope.retrieveBundling();

            }
            //-- 初始化多个货品选择器
            $scope.skuSelector = skuSelector({
                maxNum : 5,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);


        }
    ]);
