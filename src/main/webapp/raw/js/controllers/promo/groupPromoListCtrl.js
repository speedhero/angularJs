/**
 * @name: 推荐组合列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoListCtrl', [])
    .controller('groupPromoListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'promoService',
        '$stateParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, promoService, $stateParams) {

            //-- =======================================常量===========================================


            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedGroupPromos = false;
            //-- 初始化模型
            $scope.models = [];

            //-- 当前激活的促销组合index
            $scope.activeGroupPromoIndex = 0;

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

            //显示某组合促销
            $scope.showGroupPromo = function(index){
                $scope.activeGroupPromoIndex = index;
            };

            //移动组合促销
            $scope.moveGroupPromo = function(oldIndex, newIndex){
                $scope.models.move(oldIndex, newIndex);
                $scope.activeGroupPromoIndex = newIndex;

                var idsArray = _.pluck($scope.models, 'id');
                promoService.sortGroupPromos({ids : idsArray.join(",")}).$promise.then(function (resp) {
                    if(resp.success){
                        console.log("sort success");
                    }else{
                        console.log(resp.message);
                    }
                });
            };

            //删除推荐组合
            $scope.removePromoGroup = function(promoGroupId, index){
                if($window.confirm("亲，你确认删除此推荐组合吗？")){
                    promoService.deleteGroupPromo({id : promoGroupId}).$promise.then(function (resp) {
                        if(resp.success){
                            $scope.models.splice(index,1);
                            if($scope.models.length >= 1){
                                $scope.activeGroupPromoIndex = 0;
                            }else{
                                //需要重新load某一条sku的状态
                                $scope.backToListAfterSingleUpsert($scope.$currSkuId, 0);
                            }
                        }else{
                            $window.alert(resp.message);
                        }
                    });
                }
            };

            //-- =======================================初始化===========================================
            if(angular.isDefined($stateParams.skuId) && $stateParams.skuId!==null){
                //获取id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currSkuId = $stateParams.skuId;
            }
            promoService.listGroupPromoBySku({id : $scope.$currSkuId}).$promise.then(function (resp) {
                $scope.models = resp.models;
                if($scope.$focusGroupPromoId){
                    if($scope.$focusGroupPromoId === -1){
                        //激活最后一个tab
                        $scope.activeGroupPromoIndex = $scope.models.length -1;
                    }else{
                        //激活某个tab （模拟环境无法测试）
                        angular.forEach($scope.models, function(item, index){
                           if(item.id == $scope.$focusGroupPromoId){
                               $scope.activeGroupPromoIndex = index;
                           }
                        });
                    }
                }
                $scope.$loadedGroupPromos = true;
            });
        }

    ]);
