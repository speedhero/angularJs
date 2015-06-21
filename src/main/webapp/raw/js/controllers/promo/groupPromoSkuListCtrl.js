/**
 * @name: 推荐组合sku列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoSkuListCtrl', [])
    .controller('groupPromoSkuListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'productService',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, productService, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.groupPromoStatuses;

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);


            //-- html模板
            $scope.templates = {
            };

            //-- 用于记录选择的条目的id
            $scope.selectedItems = [];
            //-- 用于记录全部的条目的id
            $scope.selectedItems4All = [];

            //用于记录当前列表
            $scope.currList = [];

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

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.searchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#searchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#searchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.tableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 返回显示列表
            $scope.backToList = function(skuId){
                $('#listPage').show();
                $('#detailPage').hide();
            };
            //-- 返回显示列表,有过多个增加操作
            $scope.backToListAfterMultiCreate = function(){
                $scope.tableParams.reload();
                $('#listPage').show();
                $('#detailPage').hide();
            };
            //-- 返回显示列表,有过单个增加/修改操作
            $scope.backToListAfterSingleUpsert = function(skuId, focusGroupPromoId){
                //如果skuId存在表示对某sku的推荐组合做了增加/修改操作
                if(skuId){
                    promoService.queryGroupPromoSkus({ids:skuId}).$promise.then(function (resp) {
                        //重新加载具体sku
                        var newSku = resp.models[0];
                        angular.forEach($scope.currList, function(item,index){
                            if(item.id == skuId){
                                //更新状态
                                item.productName = newSku.productName;
                                item.status = newSku.status;
                            }
                        });
                    });
                    //重新加载促销组合列表
                    $scope.showPromoList(skuId, focusGroupPromoId);
                }
                $('#listPage').show();
                $('#detailPage').hide();
            };


            //-- 是否可以增加促销组合
            $scope.canAdd = function(item){
                return true;
            };
            //-- 是否可以查看促销组合列表
            $scope.canViewList = function(item){
                return (item.status === 1);
            };

            //批量创建新促销组合
            $scope.multiCreate = function(){
                if($scope.selectedItems.length === 0){
                    //show popover tip
                    $('#multiCreateBtn').popover({
                        container : 'body',
                        placement : 'top',
                        content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                        trigger : 'focus'
                    }).on('hidden.bs.popover', function () {
                        $('#multiCreateBtn').popover('destroy');
                    });
                    $('#multiCreateBtn').popover('show');
                    return;
                }

                var skuIds= $scope.selectedItems.join(",");
                $scope.upsertPromoGroup(skuIds, null);
            };

            //创建新促销组合
            $scope.createNew = function(skuId){
                $scope.upsertPromoGroup(skuId, null);
            };
            //编辑促销组合
            $scope.editDetail = function(skuId, groupPromoId){
                $scope.upsertPromoGroup(skuId, groupPromoId);
            };

            //-- 创建/编辑详细
            $scope.upsertPromoGroup = function(skuIds, groupPromoId){
                var newScope = $scope.$new();
                if(skuIds)newScope.$currSkuIds = skuIds;
                if(groupPromoId)newScope.$currGroupPromoId = groupPromoId;
                $('#detailPage').empty().append('<div ng-controller="groupPromoUpsertCtrl" ng-include="\'/html/promo/upsertGroupPromo.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())(newScope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };

            //查看/隐藏促销组合列表
            $scope.togglePromoList = function(skuId){
                if(!$scope.isPromoListShow(skuId)){
                    $scope.showPromoList(skuId);
                }else{
                    $('#skuTd-'+skuId).next('tr.list').remove();
                    $scope['isShowPromoList-'+skuId] = false;
                }
            };

            /**
             * 显示组合促销列表
             * skuId :skuId
             * focusGroupPromoId: 促销组合加载后focus在哪个id,特别地如果focusGroupPromoId==-1表示focus在最后一个item
             */
            $scope.showPromoList = function(skuId, focusGroupPromoId){
                $('#skuTd-'+skuId).next('tr.list').remove();
                var jDom = $('<tr class="list"><td class="full" colspan="7"><div ng-controller="groupPromoListCtrl" ng-include="\'/html/promo/groupPromoList.html?tag=' + $globalSetting.version+'\'"></div></td></tr>');
                jDom.insertAfter($('#skuTd-'+skuId));
                $scope['isShowPromoList-'+skuId] = true;

                var newScope = $scope.$new();
                newScope.$currSkuId = skuId;
                newScope.$focusGroupPromoId = focusGroupPromoId;
                $compile(jDom.contents())(newScope);
            };

            $scope.isPromoListShow = function(skuId){
                return $scope['isShowPromoList-'+skuId];
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_group_promo_sku_list');

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序field
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    promoService.queryGroupPromoSkus(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.currList = list;
                        $defer.resolve($scope.currList);

                        $scope.$loaded = true;
                    });
                }
            });
        }
    ]);
