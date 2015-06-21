/**
 * @name: 商品列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productListCtrl', [])
    .controller('productListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'productConstants',
        'productService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $globalSetting, productConstants, productService, TableParams) {

            //-- =======================================变量===========================================

            //-- 初始化常量
            $scope._productTypes = productConstants.productTypes;
            $scope._shelvesStatuses = productConstants.shelvesStatuses;
            $scope._watchStatuses = productConstants.watchStatuses;

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {

                //商品类型
                productTypes : [],
                //上架状态
                shelvesStatuses : [],
                //监控状态
                watchStatuses : []
            };
            //-- 用于记录选择的商品id
            $scope.selectedItems = [];
            //-- 用于记录全部的商品id
            $scope.selectedItems4All = [];

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //-- 用于记录当前选择的productId
            $scope.$currProductId = null;

            //-- 用于记录当前需要上架的skus
            $scope.skuIdArray4Shelve = [];
            //-- 用于记录当前需要下架的skus
            $scope.skuIdArray4OffShelve = [];
            //-- 用于记录当前需要删除的skus
            $scope.skuIdArray4Delete = [];
            //-- 用于记录当前需要申请上架的sku
            $scope.skuId4ApplyOnShelve = null;

            //-- 记录当前table的list
            $scope.skuList = [];


            //-- html模板
            $scope.templates = {
                multiShelveModal : '/html/product/include/multiShelveModal.html?tag='+$globalSetting.version,
                multiOffShelveModal : '/html/product/include/multiOffShelveModal.html?tag='+$globalSetting.version,
                multiDeleteModal : '/html/product/include/multiDeleteModal.html?tag='+$globalSetting.version,
                applyOnShelveModal : '/html/product/include/applyOnShelveModal.html?tag='+$globalSetting.version,
                noProductSelectAlert : '/html/product/include/noProductSelectAlert.html?tag='+$globalSetting.version
            };


            //-- =======================================函数===========================================

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.productSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#productSearchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#productSearchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.productTableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){

                //将错误移除
                $scope.productSearchForm.$setPristine(true);
                //处理验证的field
                $scope.productSearchForm.minPrice.$setViewValue("");
                $scope.productSearchForm.maxPrice.$setViewValue("");
                $scope.productSearchForm.minQuantityOnHand.$setViewValue("");
                $scope.productSearchForm.maxQuantityOnHand.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //-- 显示详细商品
            $scope.showDetail = function(productId){
                $('#productListPage').hide();
                $('#productEditPage').slideDown("slow");
                // 设置当前商品id
                $scope.$currProductId = productId;
                //发送商品改变事件
                $scope.$broadcast('productChangeEven', true);
            };

            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.productTableParams.reload();
                $('#productListPage').show();
                $('#productEditPage').hide();
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


            //-- 显示批量上架Modal
            $scope.showModal4MultiShelve = function(sku){
                if(sku){
                    $scope.skuIdArray4Shelve = [];
                    $scope.skuIdArray4Shelve.push(sku.id);
                    //show modal
                    $('#multiShelveModal .content').html("您确认上架商品'"+ sku.productName + "'吗？");
                    $('#multiShelveModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiShelveBtn').popover('destroy');
                        });
                        $('#multiShelveBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canShelve);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以上架的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiShelveBtn').popover('destroy');
                        });
                        $('#multiShelveBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiShelveModal .content').html("您确认上架以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiShelveModal').modal('show');

                        $scope.skuIdArray4Shelve = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量上架确认
            $scope.multiShelve = function(){
                $('#multiShelveModal').modal('hide');
                productService.shelve({ids: $scope.skuIdArray4Shelve}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();

                });
            };


            //-- 显示批量下架Modal
            $scope.showModal4MultiOffShelve = function(sku){
                if(sku){
                    $scope.skuIdArray4OffShelve = [];
                    $scope.skuIdArray4OffShelve.push(sku.id);
                    //show modal
                    $('#multiOffShelveModal .content').html("您确认下架商品'"+ sku.productName + "'吗？");
                    $('#multiOffShelveModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiOffShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiOffShelveBtn').popover('destroy');
                        });
                        $('#multiOffShelveBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canOffShelve);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiOffShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以下架的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiOffShelveBtn').popover('destroy');
                        });
                        $('#multiOffShelveBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiOffShelveModal .content').html("您确认下架以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiOffShelveModal').modal('show');

                        $scope.skuIdArray4OffShelve = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量下架确认
            $scope.multiOffShelve = function(){
                $('#multiOffShelveModal').modal('hide');
                productService.offShelve({ids: $scope.skuIdArray4OffShelve}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();
                });
            };


            //-- 显示批量删除Modal
            $scope.showModal4MultiDelete = function(sku){
                if(sku){
                    $scope.skuIdArray4Delete = [];
                    $scope.skuIdArray4Delete.push(sku.id);
                    //show modal
                    $('#multiDeleteModal .content').html("您确认删除商品'"+ sku.productName + "'吗？");
                    $('#multiDeleteModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiDeleteBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDeleteBtn').popover('destroy');
                        });
                        $('#multiDeleteBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canDelete);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiDeleteBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以删除的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDeleteBtn').popover('destroy');
                        });
                        $('#multiDeleteBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiDeleteModal .content').html("您确认删除以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiDeleteModal').modal('show');

                        $scope.skuIdArray4Delete = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量删除确认（移动到回收站）
            $scope.multiDelete = function(){
                $('#multiDeleteModal').modal('hide');
                productService.moveToRecycleBin({ids: $scope.skuIdArray4Delete}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();

                });
            };


            //-- 显示申请上架Modal
            $scope.showModal4ApplyOnShelve = function(sku){
                $scope.skuId4ApplyOnShelve = sku.id;
                //show modal
                $('#applyOnShelveModal .content').html("您确认申请上架商品'"+ sku.productName + "'吗？");
                $('#applyOnShelveModal').modal('show');
            };

            //-- 申请上架确认
            $scope.applyOnShelve = function(){
                $('#applyOnShelveModal').modal('hide');
                productService.applyOnShelve({id: $scope.skuId4ApplyOnShelve}).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
            };


            //-- 是否可以上架
            $scope.canShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 0 || (sku.status === 2 && sku.watchStatus !== 2));
            };
            //-- 是否可以下架
            $scope.canOffShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 1);
            };
            //-- 是否可以申请上架
            $scope.canApplyOnShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 2 &&  sku.watchStatus === 2);
            };
            //-- 是否可以删除
            $scope.canDelete = function(sku){
                return (sku.status === 0 ||  sku.status === 2);
            };
            //-- 是否可以预览
            $scope.canPreview = function(sku){
                return (sku.pushStatus === 3) ;
            };

            //-- 保存价格
            $scope.savePrice = function(skuId,data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (! (FLOAT_REGEXP.test(data) && (parseFloat(data)>0)) ){
                    return "请输入大于0的有效的正浮点数(最多两位小数)";
                }
                var postData = {
                    id: skuId,
                    price: data
                };
                productService.changePrice(postData).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
                //必须返回false不执行修改，等异步请求后将结果输出
                return false;

            };
            //-- 保存库存
            $scope.saveQuantityOnHand = function(skuId, data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (!INTEGER_REGEXP.test(data)) {
                    return "请输入有效的整数";
                }

                var postData = {
                    id: skuId,
                    quantityOnHand: data
                };
                productService.changeQuantityOnHand(postData).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
                //必须返回false不执行修改，等异步请求后将结果输出
                return false;

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


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_list');

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.productTableParams = new TableParams({
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
                        //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    productService.query(postData).$promise.then(function (resp) {
                        $('#productSearchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.skuList = list;
                        $defer.resolve(list);
                        $scope.$loaded = true;
                    });


                }
            });

        }

    ]);
