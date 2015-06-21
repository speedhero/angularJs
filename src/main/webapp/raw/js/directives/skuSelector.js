/**
 * @description: 货品选择器
 * @author: Patrick
 **/

angular.module('flymvo.product.directives', [])
    .factory('skuSelector', ['$rootScope', '$compile', '$globalSetting', function($rootScope, $compile, $globalSetting){
        function SkuSelector(options, scope){
            var defaults = {
                //最多选择个数
                maxNum : 30,
                //是否允许多选
                multi : false,
                //确认选择货品后回调函数
                onSelect : null,
                //需要初始加载选择的货品ids字符串，用逗号分隔
                skuIds : "",
                //需要初始加载选择的货品完成回调函数，配合skuIds使用
                onInitLoaded : null,
                //如果此参数等于true表示查询的都是安装服务，默认false
                isInstallService : false
            };
            this.options = {};
            $.extend(this.options, defaults, options);

            var html = '<div><div sku-selector max-num="'+ this.options.maxNum;
            html += '" multi="'+ this.options.multi;
            html += '" on-select="'+ this.options.onSelect + "(result)";
            html += '" on-init-loaded="'+ this.options.onInitLoaded + "(result)";
            html += '" sku-ids="'+ this.options.skuIds;
            html += '" is-install-service="'+ this.options.isInstallService;
            html += '"></div></div>';
            this.rootElement = $(html);
            $('body').append(this.rootElement);
            $compile(this.rootElement.contents())(scope);

            //打开选择器
            this.open = function(){
                this.rootElement.find('.modal').modal('show');
                return this;
            };

            //获取选择的sku列表
            this.getSkus = function(){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                return scope.getSkus();
            };

            // 清空当前选择的sku列表
            this.emptySkus = function(){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                return scope.emptySkus();
            };

            //外部(控件外)删除sku
            this.removeSingleSkuByExternal = function(sku){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                scope.removeSingleSkuByExternal(sku);
                return this;
            };

            return this;
        }

        return function(options, scope){
            return new SkuSelector(options, scope);
        };

    }])
    .controller('skuSelectorCtrl', [
        '$scope',
        '$window',
        '$element',
        '$filter',
        '$timeout',
        '$globalSetting',
        'productConstants',
        'productService',
        'ngTableParams',function($scope, $window, $element, $filter, $timeout, $globalSetting, productConstants, productService, TableParams) {
            //-- =======================================变量===========================================
            var jModal = $($element).find('.modal');
            var jSearchForm = $($element).find('#productSearchForm');

            //初始化是否允许多选
            if(!$scope.multi){
                $scope.multi = false;
            }else{
                $scope.multi = ($scope.multi === "true");
            }

            //初始化是否查询安装服务
            if(!$scope.isInstallService){
                $scope.isInstallService = false;
            }else{
                $scope.isInstallService = ($scope.isInstallService === "true");
            }

            //-- 初始化常量
            $scope._productTypes = productConstants.productTypes;

            //-- html模板
            $scope.templates = {
                searchArea : '/html/template/sku-selector/searchArea.html?tag='+$globalSetting.version,
                listArea : '/html/template/sku-selector/listArea.html?tag='+$globalSetting.version,
                resultArea : '/html/template/sku-selector/resultArea.html?tag='+$globalSetting.version
            };

            //-- 初始化模型
            $scope.query = {
                //商品类型
                productTypes : [],
                //只能选择上架的商品
                shelvesStatuses: [1]
            };

            //-- 用于记录选择的sku id
            $scope.selectedItems = [];

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            $scope.skuList = [];

            //-- 用于记录已选择的sku列表
            $scope.selectedSkuArray = [];
            //-- 用于记录已选择的sku列表 (操作开始和结束状态)
            $scope.selectedSkuArraySaved = [];



            //-- =======================================函数===========================================
            //--  查询函数
            $scope.search = function(){
                //validate form first
                var productSearchForm = angular.element('#productSearchForm').scope().productSearchForm;
                if(productSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    jSearchForm.find(':input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    jSearchForm.find('#searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.productTableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                var productSearchForm = angular.element('#productSearchForm').scope().productSearchForm;
                //将错误移除
                productSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

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

            // 获取当前选择的sku列表
            $scope.getSkus = function(){
                return $scope.selectedSkuArray;
            };

            // 清空当前选择的sku列表
            $scope.emptySkus = function(){
                $scope.selectedSkuArray = [];
            };

            /**
             * 添加单个sku
             * 返回值：
             * 1 ：添加成功
             * -1 ： 添加的sku数量已达到，不能再添加
             */

            $scope.addSingleSku = function(sku){
                var flag;
                if($scope.indexOfSku(sku) == -1){
                    if($scope.selectedSkuArray.length < $scope.maxNum){
                        var item = angular.copy(sku);
                        $scope.selectedSkuArray.push(item);
                        flag = 1;
                    }else{
                        $window.alert("最多允许添加"+$scope.maxNum+"个货品");
                        flag = -1;
                    }
                }else{
                    flag =  -2;
                }
                return flag;
            };

            //移除单个sku
            $scope.removeSingleSku = function(sku){
                var index = $scope.indexOfSku(sku);
                if(index != -1){
                    $scope.selectedSkuArray.splice(index, 1);
                }
            };
            //外部移除单个sku
            $scope.removeSingleSkuByExternal = function(sku){
                var index = $scope.indexOfSku(sku);
                if(index != -1){
                    $scope.selectedSkuArray.splice(index, 1);
                    $scope.selectedSkuArraySaved.splice(index, 1);
                }
            };

            //清空已选择区
            $scope.removeAll = function(){
                if($window.confirm("你确认清空吗？")){
                    $scope.selectedSkuArray = [];
                }
            };

            $scope.addMultiSku = function(sku){
                var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                var flag = 1;
                angular.forEach(skuArray, function(item, itemIndex){
                    if(flag != -1){
                        flag = $scope.addSingleSku(item);
                    }
                    //如果flag不为1，则循环的剩下部分不会继续执行
                });
            };

            //找到目标sku所在的顺序值
            $scope.indexOfSku = function(sku){
                var index = -1;
                angular.forEach($scope.selectedSkuArray, function(item, itemIndex){
                    if(index == -1){
                        if(item.id == sku.id){
                            index = itemIndex;
                        }
                    }
                });
                return index;
            };

            //是否包含目标sku
            $scope.isContainSku = function(sku){
                return $scope.indexOfSku(sku) != -1;
            };

            //--根据skuIdArray获得skuArray
            function getSkuArrayBySkuId(skuIdArray){
                var list = [];
                angular.forEach($scope.skuList, function(sku, index){
                    if(skuIdArray.indexOf(sku.id) != -1){
                        list.push(sku);
                    }
                });
                return list;
            }

            //确认选择多个货品
            $scope.selectSkus = function(){
                $scope.selectedSkuArraySaved = angular.copy($scope.selectedSkuArray);
                if($scope.onSelect({'result': angular.copy($scope.selectedSkuArray)}) !== false){
                    //如果执行回调函数不是返回false,则自动关闭窗口
                    jModal.modal('hide');
                }
            };

            //选择单个货品
            $scope.selectSku = function(sku){
                if($scope.onSelect({'result':angular.copy(sku)}) !== false){
                    jModal.modal('hide');
                }
            };

            //取消选择
            $scope.cancelSelect = function(){
                //将所有临时的去掉
                if($scope.multi){
                    $scope.selectedSkuArray = angular.copy($scope.selectedSkuArraySaved);
                }
                jModal.modal('hide');
            };




            //-- =======================================初始化===========================================
            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.productTableParams = new TableParams({
                page: 1,
                count: 4
            }, {
                counts: [4, 10, 20],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();

                    if($scope.isInstallService){
                        postData.isInstallService = 1;
                    }

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序field
                        //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    productService.query(postData).$promise.then(function (resp) {
                        jSearchForm.find('#searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.skuList = list;
                        $defer.resolve(list);
                    });


                }
            });

            //初始化加载的货品列表
            if($scope.skuIds){
                productService.listProducts({ids : $scope.skuIds}).$promise.then(function (resp) {
                    $scope.selectedSkuArray = resp.models;
                    $scope.selectedSkuArraySaved = angular.copy($scope.selectedSkuArray);

                    if($scope.onInitLoaded){
                        $scope.onInitLoaded({'result':angular.copy($scope.selectedSkuArray)});
                    }
                });
            }


    }])
    .directive('skuSelector', ['$globalSetting',function ($globalSetting) {
        return {
            restrict: 'A',
            scope: {
                //确认选择货品后回调函数
                onSelect : '&',
                //最多选择货品数量，例如：10
                maxNum : '@',
                //是否允许选择多个，默认否，例如false
                multi : '@',
                //初始已选择的货品条目， ids， 多个sku id拼接，用半角逗号分隔
                skuIds : '@',
                //需要初始加载选择的货品完成回调函数
                onInitLoaded : '&',
                //如果此参数等于true表示查询的都是安装服务，默认false
                isInstallService : '@'
            },
            replace: false,
            templateUrl: '/html/template/sku-selector/index.html?tag='+$globalSetting.version,
            link: function (scope, element, attrs) {
            }
        };
    }]);
