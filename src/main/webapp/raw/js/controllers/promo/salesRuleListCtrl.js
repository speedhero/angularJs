/**
 * @name: 店铺优惠列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/18.
 */
angular.module('flymvo.promo.salesRuleListCtrl', [])
    .controller('salesRuleListCtrl', [
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
            $scope._statuses = promoConstants.salesRuleStatuses;
            $scope._salesRuleRangeTypes = promoConstants.salesRuleRangeTypes;
            //日期格式
            var dateFormat = "YYYY-MM-DD";

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

            //-- 编辑详细
            $scope.editDetail = function(item){
                // 设置当前id
                $scope.$currSalesRuleId = item.id;
                $('#detailPage').empty().append('<div ng-controller="salesRuleUpsertCtrl" ng-include="\'/html/promo/upsertSalesRule.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 查看详细
            $scope.viewDetail = function(item){
                // 设置当前id
                $scope.$currSalesRuleId = item.id;
                $('#detailPage').empty().append('<div ng-controller="salesRuleViewCtrl" ng-include="\'/html/promo/salesRuleDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 将开始时间变为规定格式
            $scope.$watch("query.startTime", function () {
                if($scope.query.startTime){
                    $scope.query.startTime = moment($scope.query.startTime).format(dateFormat);
                }
            });

            //-- 将结束时间变为规定格式
            $scope.$watch("query.endTime", function () {
                if($scope.query.endTime){
                    $scope.query.endTime = moment($scope.query.endTime).format(dateFormat);
                }
            });


            //-- 是否可以撤销
            $scope.canCancel = function(item){
                return (item.status === 2);
            };
            //-- 是否可以删除
            $scope.canDelete = function(item){
                return (item.status === 1);
            };
            //-- 是否可以编辑
            $scope.canEdit = function(item){
                return (item.status === 1);
            };

            //-- 删除
            $scope.remove = function(item){
                if($window.confirm("您确认删除'"+item.title+"'吗？")){
                    promoService.deleteSalesRule({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };



            //-- 撤销
            $scope.cancel = function(item){
                if($window.confirm("您确认撤销'"+item.title+"'吗？")){
                    promoService.cancelSalesRule({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };


            //-- 是否满赠
            $scope.isKindOfGift = function(model){
                return model.type === "gift";
            };

            //-- 是否不封顶满减
            $scope.isKindOfNoCapMinus = function(model){
                return model.type === "minus" && model.noCap === 1;
            };

            //-- 是否阶梯满减
            $scope.isKindOfStepMinus = function(model){
                return model.type === "minus" && model.noCap === 0;
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_sales_rule_list');

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

                    if(postData.startTime){
                        postData.startTime += " 00:00:00";
                    }
                    if(postData.endTime){
                        postData.endTime += " 23:59:59";
                    }
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

                    promoService.querySalesRules(postData).$promise.then(function (resp) {
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
