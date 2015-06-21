/**
 * @name: 促销价列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/18.
 */

angular.module('flymvo.promo.promoPriceListCtrl', [])
    .controller('promoPriceListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'promoConstants',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $globalSetting, promoConstants, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.promoPriceStatuses;
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
                multiDisableModal : '/html/promo/include/multiDisableModal.html?tag='+$globalSetting.version
            };

            //-- 用于记录选择的条目的recordNo
            $scope.selectedItems = [];
            //-- 用于记录全部的条目的recordNo
            $scope.selectedItems4All = [];

            //用于记录当前促销价列表
            $scope.promoPriceList = [];
            //用于记录需要批量失效的recordNo
            $scope.recordNoArray4Disable = [];


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

            //-- 是否可以设置为失效
            $scope.canDisable = function(item){
                return (item.promotionalStatus === 1 ||  item.promotionalStatus === 4);
            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 将促销开始时间变为规定格式
            $scope.$watch("query.startTimeMin", function () {
                if($scope.query.startTimeMin){
                    $scope.query.startTimeMin = moment($scope.query.startTimeMin).format(dateFormat);
                }
            });

            //-- 将促销结束时间变为规定格式
            $scope.$watch("query.endTimeMax", function () {
                if($scope.query.endTimeMax){
                    $scope.query.endTimeMax = moment($scope.query.endTimeMax).format(dateFormat);
                }
            });


            //--根据recordNoArray获得itemArray
            function getPromoPriceArrayByRecordNo(recordNoArray){
                var list = [];
                angular.forEach($scope.promoPriceList, function(item, index){
                    if(recordNoArray.indexOf(item.recordNo) != -1){
                        list.push(item);
                    }
                });
                return list;
            }


            //-- 显示批量设置失效Modal
            $scope.showModal4MultiDisable = function(item){
                if(item){
                    $scope.recordNoArray4Disable = [];
                    $scope.recordNoArray4Disable.push(item.recordNo);
                    //show modal
                    $('#multiDisableModal .content').html("您确认设置失效'"+ item.productName + "'吗？");
                    $('#multiDisableModal').modal('show');

                }else{
                    //check if item selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiDisableBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何条目,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDisableBtn').popover('destroy');
                        });
                        $('#multiDisableBtn').popover('show');
                        return;
                    }
                    var promoPriceArray = getPromoPriceArrayByRecordNo($scope.selectedItems);
                    promoPriceArray = $filter('filter')(promoPriceArray, $scope.canDisable);
                    //check if item can disable
                    if(promoPriceArray.length === 0){
                        //show popover tip
                        $('#multiDisableBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的条目中没有可以设置失效的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDisableBtn').popover('destroy');
                        });
                        $('#multiDisableBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(promoPriceArray,function(item, index){
                            names += "<li>"+item.productName+"</li>";
                        });
                        $('#multiDisableModal .content').html("您确认设置失效以下"+promoPriceArray.length+"个条目吗？<ul>"+names+"</ul>");
                        $('#multiDisableModal').modal('show');

                        $scope.recordNoArray4Disable = _.pluck(promoPriceArray, 'recordNo');
                    }

                }
            };

            //-- 批量失效确认
            $scope.multiDisable = function(){
                $('#multiDisableModal').modal('hide');
                promoService.multiDisablePromoPrices({recordNos: $scope.recordNoArray4Disable}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.tableParams.reload();

                });
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_price_list');

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

                    if(postData.startTimeMin){
                        postData.startTimeMin += " 00:00:00";
                    }
                    if(postData.endTimeMax){
                        postData.endTimeMax += " 23:59:59";
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

                    promoService.queryPromoPrices(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.promoPriceList = list;
                        $defer.resolve(list);

                        $scope.$loaded = true;
                    });


                }
            });

        }

    ]);
