/**
 * @name: 搭配组合列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/30.
 */
angular.module('flymvo.promo.bundlingListCtrl', [])
    .controller('bundlingListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.bundlingStatuses;

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
            $scope.backToList = function(){
                $scope.tableParams.reload();
                $('#listPage').show();
                $('#detailPage').hide();
            };

            //-- 创建/编辑详细
            $scope.upsertDetail = function(item){
                if(item){
                    // 设置当前id
                    $scope.$currBundlingId = item.id;
                }
                $('#detailPage').empty().append('<div ng-controller="bundlingUpsertCtrl" ng-include="\'/html/promo/upsertBundling.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 是否可以上架
            $scope.canShelve = function(item){
                return (item.status === 0) || (item.status === 2);
            };
            //-- 是否可以下架
            $scope.canOffShelve = function(item){
                return (item.status === 1);
            };
            //-- 是否可以删除
            $scope.canRemove = function(item){
                return (item.status === 0) || (item.status === 2);
            };
            //-- 是否可以编辑
            $scope.canEdit = function(item){
                return (item.status === 1);
            };

            //-- 删除
            $scope.remove = function(item){
                if($window.confirm("您确认删除'"+item.name+"'吗？")){
                    promoService.deleteBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };

            //-- 上架
            $scope.shelve = function(item){
                if($window.confirm("您确认上架'"+item.name+"'吗？")){
                    promoService.shelveBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };

            //-- 下架
            $scope.offShelve = function(item){
                if($window.confirm("您确认下架'"+item.name+"'吗？")){
                    promoService.offshelveBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };





            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_bundling_list');

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

                    promoService.queryBundling(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.currList = list;
                        $defer.resolve(list);
                        $scope.$loaded = true;
                    });

                }
            });

        }

    ]);
