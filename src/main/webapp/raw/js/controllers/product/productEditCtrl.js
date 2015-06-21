/**
 * @name: 商品编辑控制器
 * @description: 此控制器兼容从列表跳入详细页，也兼容直接从url获得页面
 * @author: Patrick
 * @create : 2014/9/23.
 */

angular.module('flymvo.product.productEditCtrl', [])
    .controller('productEditCtrl', [
        '$compile',
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$stateParams',
        '$upload',
        '$globalSetting',
        'ngTableParams',
        'productConstants',
        'productService',
        'categoryService',
        'logisticsService',
        'fileService',
        function ($compile, $scope, $filter, $timeout, $window, $stateParams, $upload, $globalSetting, TableParams, productConstants, productService,categoryService, logisticsService, fileService) {
            //-- =======================================常量===========================================
            $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT = productConstants.MAX_UPLOAD_SKU_IMAGE_LIMIT;
            $scope.MAX_UPLOAD_DESC_GROUP_LIMIT = productConstants.MAX_UPLOAD_DESC_GROUP_LIMIT;
            $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT = productConstants.MAX_UPLOAD_DESC_IMAGE_LIMIT;
            $scope.MAX_SKU_NUM_LIMIT = productConstants.MAX_SKU_NUM_LIMIT;

            //-- =======================================变量===========================================

            //--tabs
            $scope.tabs = [
                {
                    id: 'basicInfoTab',
                    label :"基本信息",
                    icon : "glyphicon glyphicon-file",
                    viewModeTemplate : '/html/product/include/viewProductTab4Basic.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Basic.html?tag='+$globalSetting.version
                },
                {
                    id: 'specsTab',
                    label :"销售规格与物流",
                    icon : "glyphicon glyphicon-th-large",
                    viewModeTemplate : '/html/product/include/viewProductTab4Specs.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Specs.html?tag='+$globalSetting.version
                },
                {
                    id: 'descTab',
                    label :"详情描述",
                    icon : "glyphicon glyphicon-picture",
                    viewModeTemplate : '/html/product/include/viewProductTab4Desc.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Desc.html?tag='+$globalSetting.version
                },
                {
                    id: 'packAfterSaleInfo',
                    label :"包装售后",
                    icon :"glyphicon glyphicon-gift",
                    viewModeTemplate : '/html/product/include/viewProductTab4PackAfterSale.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4PackAfterSale.html?tag='+$globalSetting.version
                }
            ];


            //-- html模板
            $scope.templates = {
                productEditPage : '/html/product/editProduct.html?tag='+$globalSetting.version,
                //简要
                brief: '/html/product/include/viewProduct4Brief.html?tag='+$globalSetting.version,
                //基本信息(查看模式)
                basicInfoSection4ViewMode: '/html/product/include/viewProduct4BasicInfo.html?tag='+$globalSetting.version,
                //基本信息(编辑模式)
                basicInfoSection4EditMode: '/html/product/include/editProduct4BasicInfo.html?tag='+$globalSetting.version,
                //商品属性(查看模式)
                attributeSection4ViewMode: '/html/product/include/viewProduct4Attribute.html?tag='+$globalSetting.version,
                //商品属性(编辑模式)
                attributeSection4EditMode: '/html/product/include/editProduct4Attribute.html?tag='+$globalSetting.version,
                //包装(查看模式)
                packSection4ViewMode: '/html/product/include/viewProduct4Pack.html?tag='+$globalSetting.version,
                //包装(编辑模式)
                packSection4EditMode: '/html/product/include/editProduct4Pack.html?tag='+$globalSetting.version,
                //售后(查看模式)
                afterSaleSection4ViewMode: '/html/product/include/viewProduct4AfterSale.html?tag='+$globalSetting.version,
                //售后(编辑模式)
                afterSaleSection4EditMode: '/html/product/include/editProduct4AfterSale.html?tag='+$globalSetting.version,
                //详细描述(查看模式)
                descSection4ViewMode: '/html/product/include/viewProduct4Desc.html?tag='+$globalSetting.version,
                //详细描述(编辑模式)
                descSection4EditMode: '/html/product/include/editProduct4Desc.html?tag='+$globalSetting.version,

                //规格信息(查看模式)
                specSection4ViewMode: '/html/product/include/viewProduct4Spec.html?tag='+$globalSetting.version,
                //规格-普通商品(查看模式)
                specSection4SingleSku4ViewMode: '/html/product/include/viewProduct4SpecSingleSku.html?tag='+$globalSetting.version,
                //规格-多规格商品(查看模式)
                specSection4MultiSku4ViewMode: '/html/product/include/viewProduct4SpecMultiSku.html?tag='+$globalSetting.version,


                //规格信息(编辑模式)
                specSection4EditMode: '/html/product/include/editProduct4Spec.html?tag='+$globalSetting.version,
                //规格-普通商品(编辑模式)
                specSection4SingleSku4EditMode: '/html/product/include/editProduct4SpecSingleSku.html?tag='+$globalSetting.version,
                //规格-多规格商品(编辑模式)
                specSection4MultiSku4EditMode: '/html/product/include/editProduct4SpecMultiSku.html?tag='+$globalSetting.version,
                //规格-多规格商品（规格栏）(编辑模式)
                specSection4MultiSku4Specs4EditMode: '/html/product/include/editProduct4SpecMultiSku4Specs.html?tag='+$globalSetting.version,

                //商品图(查看模式)
                imageSection4ViewMode: '/html/product/include/viewProduct4Image.html?tag='+$globalSetting.version,
                //商品图(编辑模式)
                imageSection4EditMode: '/html/product/include/editProduct4Image.html?tag='+$globalSetting.version,

                //物流配送(查看模式)
                logisticsSection4ViewMode: '/html/product/include/viewProduct4Logistics.html?tag='+$globalSetting.version,
                //物流配送(编辑模式)
                logisticsSection4EditMode: '/html/product/include/editProduct4Logistics.html?tag='+$globalSetting.version,

                //图片库选取sku图(编辑模式)
                imageRepoModal4SkuImage: '/html/product/include/imageRepoModal4SkuImage.html?tag='+$globalSetting.version,
                //图片库选取详情图(编辑模式)
                imageRepoModal4DescImage: '/html/product/include/imageRepoModal4DescImage.html?tag='+$globalSetting.version,
                //添加物流模板modal
                addLogisticsTemplateModal: '/html/product/include/addLogisticsTemplateModal.html?tag='+$globalSetting.version,
                //物流模板body
                logisticsTemplatePageBody: '/html/logistics/createLogistics.html?tag=' + $globalSetting.version

            };


            $scope.initVariables = function(){
                //-- 商品(只读用) 含义：readonly product
                $scope.roPro = {};
                $scope.resetBasic();
                $scope.resetSpecs();
                $scope.resetDesc();
                $scope.resetPackAfterSale();
                //-- 商品(修改用)
                $scope.product = {};
                //当前类目
                $scope.category = null;
                //当前品牌
                $scope.brand = null;

                //用户定义的所有运费模板
                $scope.logisticsTemplates = [];

                //当前类目的所有属性
                $scope.catAttrs = [];

                //用于标识是否提交过
                $scope.hasCommit = false;

                //当前类目的所有规格
                $scope.specs = [];
                //保存当前类目的所有规格初始状态
                $scope.specsOrigin = [];

                //获得售后类型常量列表 value 0=没选中，1=选中，2=强制选中不能修改
                $scope.afterSaleEnumList = [];

                //将每个tab的当前template 设置为只读模式
                angular.forEach($scope.tabs, function(tab){
                    tab.currTemplate = tab.viewModeTemplate;
                    if(angular.isDefined(tab.loaded)){
                        delete tab.loaded;
                    }
                });
                //当前激活的tab
                $scope.actvieTab = $scope.tabs[0];


                //用于记录当前选取的sku index，暂时for 图库
                $scope.currentSkuIndex = null;

                //用于记录当前选取的详情图片组index，暂时for 图库
                $scope.currentDescImageGroupIndex = null;

                //货品图片库分页对象
                $scope.imageTableParams4Sku = null;
                $scope.imageRepoList4Sku = [];

                //详情图片库分页对象
                $scope.imageTableParams4Desc = null;
                $scope.imageRepoList4Desc = [];



            };

            //接收productListCtrl的改变商品事件
            $scope.$on('productChangeEven', function (e, module) {
                $scope.changeProduct();
            });


            //-- =======================================函数===========================================

            //改变商品函数
            $scope.changeProduct = function(){
                if($scope.$currProductId !== null){
                    $scope.initVariables();
                    //-- 设置菜单
                    $scope.$changeCurrMenuByCode('mvo_product_list');
                    //-- 激活第一个tab
                    $scope.setActiveTab($scope.tabs[0]);
                }
            };

            //--单选属性取消选择
            $scope.cancelAttrSingleSelect = function(attrId){
                delete $scope.product.attrs[''+attrId];
            };

            //获得sku图片路径
            $scope.getSkuImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_150_150_90" +image.substring(index);
                    }
                }
                return result;
            };

            //获得desc图片路径
            $scope.getDescImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_150_150_90" +image.substring(index);
                    }
                }
                return result;
            };


            //-- 从options中获得optonId对应的optionName
            $scope.getSingleNameFromOptions = function(optionId, options){
                var result = "";
                var keepGoing = true;
                angular.forEach(options, function(option){
                    if(keepGoing){
                        if(option.optionId == optionId){
                            result = option.optionName;
                            keepGoing = false;
                        }
                    }
                });
                return result;
            };

            //-- 从options中获得optionIdArray对应的optionNames
            $scope.getMultiNamesFromOptions = function(optionIdArray, options){
                var result = [];
                angular.forEach(optionIdArray, function(optionId){
                    angular.forEach(options, function(option){
                        if(option.optionId == optionId){
                            result.push(option.optionName);
                        }
                    });
                });
                return result.join(" , ");
            };


            //tab激活样式
            $scope.tabClass = function(tabId) {
                if ($scope.actvieTab.id == tabId) {
                    return "active";
                } else {
                    return "";
                }
            };

            //tab content激活样式
            $scope.tabContentClass = function(tabId) {
                if ($scope.actvieTab.id == tabId) {
                    return "active in";
                } else {
                    return "";
                }
            };
            //根据新的属性列表将商品旧的不匹配的属性过滤掉
            function filterOldAttrs(){
                var deleteKeys = [];
                angular.forEach($scope.roPro.attrs, function(value, key){
                    var flag = false;
                    angular.forEach($scope.catAttrs, function(catAttr, index){
                        if(flag)return;
                        if(key == catAttr.id){
                            flag = true;
                        }
                    });
                    if(!flag){
                        deleteKeys.push(key);
                    }
                });
                angular.forEach(deleteKeys, function(value, index){
                    delete $scope.roPro.attrs[value];
                });
            }

            //选择tab
            $scope.setActiveTab = function(tab){
                $scope.actvieTab = tab;

                if((tab.id === $scope.tabs[0].id) && !$scope.tabs[0].loaded){
                    //【打开商品基本信息tab】
                    $scope.tabs[0].loaded = true;
                    //-- 1.获得商品基本信息
                    productService.getProductBasic({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeBasic(resp.model);

                        //-- 2.获得当前目录
                        productService.getCategory({id: $scope.roPro.categoryId}).$promise.then(function (resp) {
                            $scope.category = resp.model;

                            //-- 3.获得类目的所有属性
                            categoryService.listAttrs({categoryId: $scope.category.id}).$promise.then(function (resp) {
                                $scope.catAttrs = resp.models;
                                //根据新的属性将旧的属性去掉
                                filterOldAttrs();
                                //模拟商品属性数据
                                mockAttrValues();
                            });
                        });

                        //-- 2-b 获得当前品牌
                        productService.getBrand({id: $scope.roPro.brandId}).$promise.then(function (resp) {
                            $scope.brand = resp.model;
                        });

                    });

                }else if((tab.id === $scope.tabs[1].id) && !$scope.tabs[1].loaded) {
                    //【打开规格与物流描述tab】
                    $scope.tabs[1].loaded = true;

                    //-- 1.获得商品规格与物流信息
                    productService.getSpecsAndLogistics({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeSpecs(resp.model);

                        //-- 2.获得类目的所有规格
                        categoryService.listSpecs({categoryId: $scope.roPro.categoryId}).$promise.then(function (resp) {
                            $scope.specs = resp.models;
                            //1.模拟商品规格数据
                            mockSkuSpecs();
                            //2.初始化specs别名
                            initSpecOptionNameAlias4RoPro();
                            //3.备份specs
                            $scope.specsOrigin = angular.copy($scope.specs);

                            //刷新$product.roPro.specs
                            refreshSpecsByRoProSkus();
                        });

                    });

                    //-- 1-b 获得用户定义的所有运费模板
                    logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                        $scope.logisticsTemplates = resp.models;
                        //模拟商品物流数据
                        mockLogistics();
                    });


                }else if((tab.id === $scope.tabs[2].id) && !$scope.tabs[2].loaded) {
                    //【打开详细描述tab】
                    $scope.tabs[2].loaded = true;

                    productService.getProductDesc({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeDesc(resp.model);
                    });

                }else if((tab.id === $scope.tabs[3].id) && !$scope.tabs[3].loaded) {
                    //【打开商品包装和售后信息tab】
                    $scope.tabs[3].loaded = true;
                    //-- 1.获得商品打包与售后信息
                    productService.getPackAndAfterSale({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changePackAfterSale(resp.model);

                        //-- 2.获得所有售后保证项列表
                        productService.listProdEnumByType({type : 1}).$promise.then(function (resp) {
                            $scope.afterSaleEnumList = resp.models;
                            //模拟退换货承诺
                            mockPromiseIds();
                            //将强制选中不能修改的加入到roPro里面的promiseIds
                            perfectPromiseIds();
                        });

                    });
                }

            };


            //-- =======================================START: 基本信息Tab部分===========================================

            //basic Tab进入编辑模式
            $scope.editBasic = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象

                $scope.product.id = $scope.$currProductId;
                $scope.product.categoryId = $scope.roPro.categoryId;
                $scope.product.productName = $scope.roPro.productName;
                $scope.product.feature = $scope.roPro.feature;
                $scope.product.keywords = $scope.roPro.keywords;
                $scope.product.subheading = $scope.roPro.subheading;
                $scope.product.attrs = angular.copy($scope.roPro.attrs);
            };

            //初始化属性数组
            $scope.initAttr4MultiSelect = function(attrId){
                if(angular.isUndefined($scope.product.attrs[''+attrId])){
                    $scope.product.attrs[''+attrId] = [];
                }
            };

            //重置roPro basic部分
            $scope.resetBasic = function(){
                $scope.roPro.productName = '';
                $scope.roPro.feature = '';
                $scope.roPro.keywords = '';
                $scope.roPro.subheading = '';
                $scope.roPro.attrs = {};
            };

            //获取basic数据
            $scope.changeBasic = function(model){
                $scope.roPro.id = $scope.$currProductId;
                $scope.roPro.brandId = model.brandId;
                $scope.roPro.categoryId = model.categoryId;
                $scope.roPro.productName = model.productName;
                $scope.roPro.feature = model.feature;
                $scope.roPro.keywords = model.keywords;
                $scope.roPro.subheading = model.subheading;
                $scope.roPro.attrs = model.attrs;
            };

            //basic Tab进入只读模式
            $scope.viewBasic = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存basic Tab
            $scope.saveBasic = function(){
                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#basicForm :input.ng-invalid');
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

                //2.检查风格是否最多选择了两个
                var styleAttrId = null;
                angular.forEach($scope.catAttrs, function(attr,index){
                    if(attr.name === "风格"){
                        styleAttrId = attr.id;
                    }
                });
                if(styleAttrId !== null && $scope.product.attrs[''+styleAttrId].length > 2){
                    $('#attr-'+styleAttrId+" input:checked:last").popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,风格最多只能选择两个。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#attr-'+styleAttrId+" input:checked:last").popover('show');
                    $('#attr-'+styleAttrId+" input:checked:last").focus();
                    return;
                }

                if (!flag) {
                    console.log('validate form, fail!!!');
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#saveBasicBtn').button('loading');
                console.log($scope.product);
                productService.saveProductBasic(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getProductBasic({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeBasic(resp.model);
                            //再次模拟数据
                            if ($globalSetting.isMockEnv) {
                                categoryService.listAttrs({categoryId: $scope.category.id}).$promise.then(function (resp) {
                                    $scope.catAttrs = resp.models;
                                    mockAttrValues();
                                });
                            }

                            $scope.viewBasic();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveBasicBtn').button('reset');
                    }

                });
            };

            //-- 模拟测试数据
            function mockAttrValues(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的attr. 因为rap无法模拟
                    $scope.roPro.attrs = {};
                    angular.forEach($scope.catAttrs, function(attr){
                        if(attr.inputType == 3){
                            //输入框
                            $scope.roPro.attrs[''+attr.id] = "测试商品属性值"+ _.random(1,99);
                        }else if(attr.inputType == 1){
                            //单选,随机从options中取一个
                            $scope.roPro.attrs[''+attr.id] = _.sample(attr.options).optionId;
                        }else if(attr.inputType == 2){
                            //多选,随机从options中取3个
                            $scope.roPro.attrs[''+attr.id] = _.pluck(_.sample(attr.options, 2), 'optionId');
                        }
                    });

                }
            }

            //-- =======================================END  : 基本信息Tab部分===========================================

            //-- =======================================START:包装和售后信息Tab部分======================================
            //包装和售后信息Tab 进入编辑模式
            $scope.editPackAfterSale = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.packInfo = $scope.roPro.packInfo;
                $scope.product.hasWarranty = $scope.roPro.hasWarranty;
                $scope.product.warrantyPeriod = $scope.roPro.warrantyPeriod;
                $scope.product.promiseIds = angular.copy($scope.roPro.promiseIds);
                $scope.product.afterSaleDesc = $scope.roPro.afterSaleDesc;
                if(!$scope.product.promiseIds){
                    $scope.product.promiseIds = [];
                }
            };

            //重置roPro 打包和售后部分
            $scope.resetPackAfterSale = function(){
                $scope.roPro.packInfo = '';
                $scope.roPro.hasWarranty = 0;
                $scope.roPro.warrantyPeriod = '';
                $scope.roPro.promiseIds =  [];
                $scope.roPro.afterSaleDesc = '';
            };

            //重置roPro 打包和售后部分
            $scope.changePackAfterSale = function(model){
                $scope.roPro.packInfo = model.packInfo;
                $scope.roPro.hasWarranty = model.hasWarranty;
                $scope.roPro.warrantyPeriod = model.warrantyPeriod;
                $scope.roPro.promiseIds =  model.promiseIds;
                if(!$scope.roPro.promiseIds){
                    $scope.roPro.promiseIds = [];
                }
                $scope.roPro.afterSaleDesc = model.afterSaleDesc;
            };

            //包装和售后信息Tab进入只读模式
            $scope.viewPackAfterSale = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存包装和售后信息Tab
            $scope.savePackAfterSale = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#packAfterSaleForm :input.ng-invalid');
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

                //提交service
                console.log('validate form, success');
                $('#savePackAfterSaleBtn').button('loading');
                console.log($scope.product);
                productService.savePackAndAfterSale(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getPackAndAfterSale({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changePackAfterSale(resp.model);
                            //模拟退换货承诺数据
                            mockPromiseIds();
                            //将强制选中不能修改的加入到roPro里面的promiseIds
                            perfectPromiseIds();

                            $scope.viewPackAfterSale();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#savePackAfterSaleBtn').button('reset');
                    }

                });
            };

            //-- 模拟测试数据
            function mockPromiseIds(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的promiseIds
                    $scope.roPro.promiseIds = _.pluck( _.sample($scope.afterSaleEnumList, 3), 'id');
                }
            }

            //将强制选中不能修改的加入到roPro里面的promiseIds
            function perfectPromiseIds(){
                angular.forEach($scope.afterSaleEnumList, function(promise, index){
                    if(promise.value == 2 && $scope.roPro.promiseIds.indexOf(promise.id)== -1){
                        $scope.roPro.promiseIds.push(promise.id);
                    }
                });
            }

            //-- =======================================END:  包装和售后信息Tab部分======================================

            //-- =======================================START: 详情描述Tab部分===========================================
            //详情描述Tab 进入编辑模式
            $scope.editDesc = function(){
                //获取图库列表for详情图
                buildImageTableParams4Desc();

                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.descImages = angular.copy($scope.roPro.descImages);

            };

            //重置roPro desc部分
            $scope.resetDesc = function(){
                $scope.roPro.descImages = [];
            };

            //设置roPro desc部分
            $scope.changeDesc = function(model){
                $scope.roPro.descImages = model.descImages;
            };

            //详情描述Tab进入只读模式
            $scope.viewDesc = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存详情描述Tab
            $scope.saveDesc = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#descForm :input.ng-invalid');
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

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //2. 检查是否至少有一个图片组
                if ($scope.product.descImages.length === 0) {
                    console.log('fail to validate image group length');
                    $('#addFirstImageGroupBtn').popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,务必至少新建一个图片组，并上传至少一幅商品详情图。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#addFirstImageGroupBtn').popover('show');
                    $('#addFirstImageGroupBtn').focus();
                    return;
                }

                //3.检查每个图片组是否至少上传了一幅商品详细描述图
                var i;
                for (i = 0; i < $scope.product.descImages.length; i++) {
                    if ($scope.product.descImages[i].items.length === 0) {
                        //show popover tip
                        console.log('fail to validate desc image item length');

                        $('#uploadFirstDescImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅商品详情图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstDescImageBtn-' + i).popover('show');
                        $('#uploadFirstDescImageBtn-' + i).focus();
                        return;
                    }
                }

                //提交service
                console.log('validate form, success');
                $('#saveDescBtn').button('loading');
                console.log($scope.product);
                productService.saveProductDesc(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getProductDesc({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeDesc(resp.model);
                            $scope.viewDesc();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveDescBtn').button('reset');
                    }

                });
            };


            //上传单个描述图
            function uploadSingleDescImage(file,groupIndex){
                if(file.size >= 1024*1024){
                    $window.alert("文件'"+file.name+"'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png","image/gif"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.descImages[groupIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 101
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.descImages[groupIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.descImages[groupIndex].items.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    });
            }

            //-- 上传详细描述图片
            $scope.uploadDescImage = function ($files, groupIndex) {
                var remainLen = $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT - $scope.product.descImages[groupIndex].items.length;
                if($files.length > remainLen){
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传"+ remainLen + "幅");
                    return;
                }else{
                    if($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function(file, index){
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.descImages[groupIndex].items.push(resp.model);
                            });
                        });
                    }else{
                        angular.forEach($files, function(file, index){
                            uploadSingleDescImage(file, groupIndex);
                        });
                    }

                }

            };


            //-- 删除详细描述图片
            $scope.deleteDescImage = function (groupIndex, index) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.descImages[groupIndex].items.splice(index, 1);
                }
            };

            //-- 移动详细描述图片
            $scope.moveDescImage = function (groupIndex, oldIndex, newIndex) {
                $scope.product.descImages[groupIndex].items.move(oldIndex, newIndex);
            };

            //添加图片组
            $scope.addImageGroup = function () {
                $scope.product.descImages.push({
                    id : null,
                    tag: null,
                    uploading: false,
                    items: []
                });
            };

            //移动图片组
            $scope.moveImageGroup = function (oldGroupIndex, newGroupIndex) {
                $scope.product.descImages.move(oldGroupIndex, newGroupIndex);
            };

            //删除图片组
            $scope.deleteImageGroup = function (groupIndex) {
                if ($window.confirm("你确认删除这个图片组吗？")) {
                    $scope.product.descImages.splice(groupIndex, 1);
                }
            };

            //-- =======================================END: 详情描述Tab部分=============================================


            //-- =======================================START:规格与物流信息Tab部分======================================
            //规格与物流信息Tab 进入编辑模式
            $scope.editSpecs = function(){
                //获取图库列表for SKU
                buildImageTableParams4Sku();

                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.skuType = $scope.roPro.skuType;
                $scope.product.skus = angular.copy($scope.roPro.skus);
                $scope.product.logisticsTemplateId = $scope.roPro.logisticsTemplateId;
                $scope.product.whoPayCarriage = $scope.roPro.whoPayCarriage;
                $scope.product.shipRegionRemark = $scope.roPro.shipRegionRemark;

                //根据sku的规格状态更新specs
                refreshSpecsBySkus();
            };


            //重置roPro specs部分
            $scope.resetSpecs = function(){
                $scope.roPro.skuType = 0;
                $scope.roPro.skus =  [];
                $scope.roPro.logisticsTemplateId = null;
                $scope.roPro.whoPayCarriage = 1;
                $scope.roPro.shipRegionRemark = '';
            };

            //设置roPro specs部分
            $scope.changeSpecs = function(model){
                $scope.roPro.skuType = model.skuType;
                $scope.roPro.skus =  model.skus;
                $scope.roPro.logisticsTemplateId = model.logisticsTemplateId;
                $scope.roPro.whoPayCarriage = model.whoPayCarriage;
                if(!$scope.roPro.whoPayCarriage){
                    //如果没有whoPayCarriage，默认卖家承担运费
                    $scope.roPro.whoPayCarriage = 1;
                }
                $scope.roPro.shipRegionRemark = model.shipRegionRemark;
            };


            //规格与物流信息Tab进入只读模式
            $scope.viewSpecs = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存规格与物流信息Tab
            $scope.saveSpecs = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#specsForm :input.ng-invalid');
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

                //2. 检查货品数量
                if(isSkuNumExceedLimit()){
                    return;
                }

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //3.检查每个SKU是否至少上传了一幅商品图
                for (i = 0; i < $scope.product.skus.length; i++) {
                    if ($scope.product.skus[i].images.length === 0) {
                        //show popover tip
                        console.log('fail to validate sku images length');
                        $('#uploadFirstSkuImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅货品图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstSkuImageBtn-' + i).popover('show');
                        $('#uploadFirstSkuImageBtn-' + i).focus();
                        return;
                    }
                }

                //提交service
                console.log('validate form, success');
                $('#saveSpecsBtn').button('loading');
                console.log($scope.product);

                var postJson = angular.copy($scope.product);
                //清除掉多余的规格值别名
                angular.forEach(postJson.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(value.optionName == value.optionNameAlias){
                            delete postJson.skus[index].specs[key].optionNameAlias;
                        }
                    });
                });

                productService.saveSpecsAndLogistics(angular.toJson(postJson)).$promise.then(function (resp) {
                    if(resp.success){
                        //1.重新再读取一次并且将其设置为只读模式
                        productService.getSpecsAndLogistics({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeSpecs(resp.model);

                            //-- 2.获得类目的所有规格
                            categoryService.listSpecs({categoryId: $scope.roPro.categoryId}).$promise.then(function (resp) {
                                $scope.specs = resp.models;
                                //1.模拟规格数据
                                mockSkuSpecs();
                                //2.模拟物流数据
                                mockLogistics();
                                //3.设置别名
                                initSpecOptionNameAlias4RoPro();
                                //4.备份初始specs
                                $scope.specsOrigin = angular.copy($scope.specs);
                                //5.刷新specs
                                refreshSpecsByRoProSkus();
                                $scope.viewSpecs();
                            });

                        });
                    }else{
                        $window.alert(resp.message);
                        $('#saveSpecsBtn').button('reset');
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveSpecsBtn').button('reset');
                    }

                });
            };

            //上传单幅SKU图片
            function uploadSingleSkuImage(file, skuIndex){
                if(file.size >= 1024*1024){
                    $window.alert("文件'"+file.name+"'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.skus[skuIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.skus[skuIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.skus[skuIndex].images.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    });
            }

            //-- 上传SKU图片
            $scope.uploadSkuImage = function ($files,skuIndex) {
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[skuIndex].images.length;
                if($files.length > remainLen){
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传"+ remainLen + "幅");
                    return;
                }else{
                    if($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function(file, index){
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.skus[skuIndex].images.push(resp.model);
                            });
                        });
                    }else{
                        angular.forEach($files, function(file, index){
                            uploadSingleSkuImage(file, skuIndex);
                        });
                    }
                }

            };

            //-- 删除SKU图片
            $scope.deleteSkuImage = function (skuIndex, imgIndex) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.skus[skuIndex].images.splice(imgIndex, 1);
                }
            };

            //-- 移动SKU图片
            $scope.moveSkuImage = function (skuIndex, oldImgIndex, newImgIndex) {
                $scope.product.skus[skuIndex].images.move(oldImgIndex, newImgIndex);
            };

            //应用到所有相同的input
            $scope.applyToAllSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function(sku, index){
                    sku[nameSelector] = value;
                });
            };
            //应用到所有相同但未填的input
            $scope.applyToNotInputSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function(sku, index){
                    if (angular.isUndefined(sku[nameSelector]) || $.trim(sku[nameSelector]) === "") {
                        sku[nameSelector] = value;
                    }
                });
            };

            //-- 判断sku在skuList 是否存在(通过规格与规格值判断)
            function existsInList(skuList, sku) {
                var flag = false;
                angular.forEach(skuList, function (item, itemIndex) {
                    if (!flag) {
                        flag = isSpecsEqual(item.specs, sku.specs);
                    }
                });
                return flag;
            }

            //-- 判断规格是否相等
            function isSpecsEqual(spec1, spec2){
                var result = true;
                var len1 = 0;
                var len2 = 0;
                angular.forEach(spec1, function (value, key) {
                    if(angular.isUndefined(spec2[key]) || (spec2[key].optionId != value.optionId)){
                        result = false;
                    }
                    len1++;
                });
                angular.forEach(spec2, function (value, key) {
                    len2++;
                });
                if(len1 != len2 || len1 === 0){
                    result = false;
                }
                return result;
            }



            //-- 在多规格选项卡中选择规格 （修改商品版本与创建页面的不同：不能删除已有规格）
            $scope.secondChooseSpec = function ($event, specId, option) {
                //是否已有此规格
                var hasThisSpec;
                //提示信息
                var tip;
                //是否改变了sku
                var hasChangeSku = false;

                //第一步，改变$scope.product.skus [diff]
                if (!option.checked || option.deleteForbidden) {
                    //首先检查货品数量
                    if(isSkuNumExceedLimit()){
                        //还原checkbox状态
                        $event.preventDefault();
                        return;
                    }
                    //==========增加规格值
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (!hasThisSpec) {
                        //情况1-a, 增加一个新的规格的规格值
                        //在编辑页面不存在此情况
                        console.log("error,1-a");
                    } else {
                        //情况1-b, 此规格已存在，只是单纯增加一个新的规格值
                        //【方法思维：循环检查每个sku，复制一个新的sku，此sku的规格对应的规格值是新值，最终模拟出互不相同的若干个sku，把它们添加到skus即可】
                        //要增加的sku list
                        var toAddList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //假设增加一个sku
                            var mockSku = angular.copy(sku);
                            //[diff]
                            if(angular.isDefined(mockSku.id)){
                                //重要，去掉skuid
                                delete mockSku.id;
                            }
                            mockSku.specs[specId + ""] = {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            };
                            if (!existsInList(toAddList, mockSku) && !existsInList($scope.product.skus, mockSku) ) {
                                toAddList.push(mockSku);
                            }
                        });
                        if(toAddList.length !== 0){
                            angular.forEach(toAddList, function (sku, skuIndex) {
                                $scope.product.skus.push(sku);
                            });
                            hasChangeSku = true;
                        }

                        if(option.deleteForbidden){
                            //还原checkbox状态
                            $event.preventDefault();
                        }

                    }

                } else {
                    //============减少规格值
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (hasThisSpec) {
                        //情况2, 删除一个规格值【方法思维：用一个数组将可以保留下来的sku保存下来，过滤掉那些匹配的规格值
                        var toRetainList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //[diff]
                            if (sku.specs[specId + ""].optionId != option.optionId || angular.isDefined(sku.id)) {
                                toRetainList.push(angular.copy(sku));
                            }
                        });
                        if (toRetainList.length === 0) {
                            //在编辑页面不存在此情况
                            console.log("error,2-a");
                        } else {
                            if (($scope.product.skus.length - toRetainList.length) > 0) {
                                //情况2-b,至少有一个货品的规格值不是optionId
                                tip = "您将删除" + ($scope.product.skus.length - toRetainList.length) + "个货品，";
                                tip += "这些货品的数据及相关图片将删除。\r\n【此操作不可逆，是否确认转换？】";
                                if ($window.confirm(tip)) {
                                    $scope.product.skus.splice(0, $scope.product.skus.length);
                                    angular.forEach(toRetainList, function (sku, skuIndex) {
                                        $scope.product.skus.push(sku);
                                    });
                                    hasChangeSku = true;

                                }else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            } else {
                                //do nothing
                            }
                        }

                    } else {
                        //do nothing
                    }
                }

                if(hasChangeSku){
                    //根据sku的规格状态更新specs
                    refreshSpecsBySkus();
                }
                //自检程序
                checkSkusSpecPerfect();

            };

            $scope.isSkuExist = function(sku){
                return angular.isDefined(sku.id) && sku.id !== null;
            };

            //-- 判断规格是否激活
            $scope.isSpecChecked = function (spec) {
                return spec.checked || false;
            };


            //-- 设置为默认SKU
            $scope.setDefaultSku = function ($event, skuIndex) {
                $scope.product.skus.move(skuIndex, 0);
            };

            //-- 删除SKU
            $scope.deleteSku = function (skuIndex) {
                var sku = $scope.product.skus[skuIndex];
                var tip = "";
                if ($scope.product.skus.length === 1) {
                    //已经是最后一个sku
                    tip = "这是最后一个规格货品，删除后商品会自动转换为“普通商品”，是否确认删除并转换？";
                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skuType = 0;
                        $scope.product.skus[0].specs = {};
                        $scope.specs = angular.copy($scope.specsOrigin);
                    }
                } else {
                    tip = "您是否确认删除此规格货品？";
                    if (sku.images.length > 0) {
                        tip += "注意：此货品已上传了" + sku.images.length + "张图片，这些图片将会一并被删除。";
                    }

                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skus.splice(skuIndex, 1);
                        //根据sku的规格状态更新specs
                        refreshSpecsBySkus();


                    }
                }

                checkSkusSpecPerfect();

            };

            //--根据product.skus的规格状态更新specs
            function refreshSpecsBySkus() {

                angular.forEach($scope.specs, function (spec, specIndex) {
                    spec.checked = false;
                    angular.forEach(spec.options, function (option, optionIndex) {
                        option.checked = false;
                    });
                });

                angular.forEach($scope.specs, function (spec, specIndex) {
                    angular.forEach(spec.options, function (option, optionIndex) {
                        //对于每个规格值检查是否在sku中
                        var flag = false;
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            if (flag)return;
                            if (sku.specs[spec.id + ""] && sku.specs[spec.id + ""].optionId == option.optionId) {
                                flag = true;
                                if(angular.isDefined(sku.id) && sku.id!==null){
                                    //[重要：此option标识为不能被删除]
                                    option.deleteForbidden = true;
                                }
                            }
                        });
                        if (flag) {
                            spec.checked = true;
                            option.checked = true;
                        }
                    });
                });
            }

            //--根据roPro.skus的规格状态更新specs,基本等同于方法refreshSpecsBySkus
            function refreshSpecsByRoProSkus() {
                $scope.specs = angular.copy($scope.specsOrigin);

                angular.forEach($scope.specs, function (spec, specIndex) {
                    angular.forEach(spec.options, function (option, optionIndex) {
                        //对于每个规格值检查是否在sku中
                        var flag = false;
                        angular.forEach($scope.roPro.skus, function (sku, skuIndex) {
                            if (flag)return;
                            if (sku.specs[spec.id + ""] && sku.specs[spec.id + ""].optionId == option.optionId) {
                                flag = true;
                            }
                        });
                        if (flag) {
                            spec.checked = true;
                            option.checked = true;
                        }
                    });
                });
            }


            //-- 这是一个用来检测商品规格生成是否有问题的程序，其原理比较，为每个sku的规格及规格值的序列值
            function checkSkusSpecPerfect() {
                if ($scope.product.skuType == 1) {
                    var seriNumArray = [];
                    var hasAlert = false;
                    var tip = "亲，如果你见到这个提示，表示即使程序猿加班加点的工作，测试猿十分认真的检查，但是Ta的代码仍发生异常了，十分抱歉，本页面将重新加载，请把发生异常的情景转告给我们的客服人员";
                    angular.forEach($scope.product.skus, function (sku, skuIndex) {
                        var seriNum = "";
                        angular.forEach(sku.specs, function (option, specId) {
                            seriNum += "|" + specId + ":" + option.optionId;
                        });

                        if(hasAlert)return;

                        if (_.contains(seriNumArray, seriNum)) {
                            hasAlert = true;
                            $window.alert(tip);
                            $window.location.reload();
                        } else {
                            seriNumArray.push(seriNum);
                        }
                    });
                    if(hasAlert)return;
                    if (seriNumArray.length !== $scope.product.skus.length) {
                        $window.alert(tip);
                        $window.location.reload();
                    }
                }

            }

            $scope.getLogisticsTemplateName = function(){
                var result = "";
                angular.forEach($scope.logisticsTemplates, function(value, index){
                   if(value.transFeeTempId == $scope.roPro.logisticsTemplateId){
                       result = value.transFeeTempName;
                   }
                });
                return result;
            };

            function isSkuNumExceedLimit(){
                //首先检查货品数量是否超过
                if($scope.product.skus.length >= $scope.MAX_SKU_NUM_LIMIT){
                    tip = "亲，你的货品数量"+ $scope.product.skus.length;
                    tip += "已超过限定值"+$scope.MAX_SKU_NUM_LIMIT+ "，无法添加/保存，请删除部分货品。";
                    $window.alert(tip);
                    return true;

                }
                return false;
            }

            //计算multisku 表格的样式
            $scope.getMultiSkuTableStyle = function(){
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width' : (2380 + 200*specsChecked.length)+'px',
                    'min-width': '2380px'
                };
            };

            //计算物流重量表格的样式
            $scope.getLogisticsTableStyle = function(){
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width' : (230 + 100*specsChecked.length)+'px'
                };
            };

            //-- 模拟规格数据
            function mockSkuSpecs(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的sku.specs. 因为rap无法模拟
                    if($scope.roPro.skuType === 0){
                        //去掉多余的sku
                        $scope.roPro.skus.splice(1, $scope.roPro.skus.length-1);
                    }else{
                        //方法：rap固定返回4个sku,随机取规格列表中的其中两个，每个sku取这两个的随机值.缺陷：有可能导致出现相同规格选项的skus
                        var specsSelected = _.sample($scope.specs,2);
                        angular.forEach($scope.roPro.skus, function(sku){
                            sku.specs = {};
                            angular.forEach(specsSelected, function(spec){
                                sku.specs[spec.id + ""] = angular.copy(_.sample(spec.options));
                                var alias = _.random(0, 100);
                                if(alias <= 50){
                                    //随机赋予一个别名
                                    sku.specs[spec.id + ""].optionNameAlias = "别名"+ alias;
                                }
                            });
                        });
                    }

                }
            }

            //-- 模拟物流模板数据
            function mockLogistics(){
                if ($globalSetting.isMockEnv) {
                    if(angular.isDefined($scope.logisticsTemplates)){
                        $scope.roPro.logisticsTemplateId = _.sample($scope.logisticsTemplates).transFeeTempId;
                    }
                }

            }


            //设置别名，主要为了方便editable-text修改
            function initSpecOptionNameAlias4RoPro(){
                                angular.forEach($scope.specs, function(spec, index){
                    angular.forEach(spec.options, function(option, index){
                        option.optionNameAlias = option.optionName;
                    });
                });
                //根据sku中的别名设置specs中的规格别名
                angular.forEach($scope.roPro.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(angular.isDefined(value.optionNameAlias) && (value.optionNameAlias !==null) && (value.optionNameAlias !=="")){
                            //找到有需要别名的规格与规格项，重新赋予名称
                            angular.forEach($scope.specs, function(spec, index){
                                if(key == spec.id){
                                    angular.forEach(spec.options, function(option, index){
                                        if(value.optionId == option.optionId){
                                            option.optionName = value.optionNameAlias;
                                            option.optionNameAlias = value.optionNameAlias;
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
                
            }

            //获得规格别名,如果有别名用别名
            $scope.getOptionRealName = function(option){
                if(angular.isDefined(option)){
                    if(angular.isDefined(option.optionNameAlias)  && (option.optionNameAlias !==null) && (option.optionNameAlias !=="")){
                        return option.optionNameAlias;
                    }else{
                        return option.optionName;
                    }
                }

            };


            //重命名规格别名,需要对已生成的sku的规格的别名重新设置
            $scope.renameOptionName4Full = function(specId, option, data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                //对sku的规格的名称进行更改
                angular.forEach($scope.product.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(key == specId && value.optionId == option.optionId){
                            value.optionNameAlias = data;
                        }
                    });
                });
                return true;
            };

            //打开添加物流模板窗口
            $scope.showAddLogisticsTemplateModal = function(){
                $('#addLogisticsTemplateModal .modal-dialog').html("");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                $('#addLogisticsTemplateModal .modal-dialog').attr("ng-include","templates.addLogisticsTemplateModal");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                //此变量用于logisticsCreateCtrl.js
                $scope.$fromProduct = true;
                $('#addLogisticsTemplateModal').modal('show');
            };

            //接收完成添加物流模板事件
            $scope.$on('finishAddLogisticsTemplateEvent',function(e, transFeeTempId){
                $('#addLogisticsTemplateModal').modal('hide');
                //-- 重新获得用户定义的所有运费模板
                logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                    $scope.logisticsTemplates = resp.models;
                    if(transFeeTempId){
                        //使得用户不需要再选择一次
                        $scope.product.logisticsTemplateId = parseInt(transFeeTempId);
                    }
                });
            });

            //-- =======================================END  :规格与物流信息Tab部分======================================

            //-- =======================================START:图库部分======================================

            //-- 获取图库列表for详情图
            function buildImageTableParams4Desc(){
                //-- ngTable对象构造
                $scope.imageTableParams4Desc = new TableParams({
                    page: 1,
                    count: 12
                }, {
                    counts: [12],
                    total: 0,
                    $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                    getData: function ($defer, params) {

                        //=========构造查询条件 start =========
                        var postData = {};
                        //商品id
                        postData.id = $scope.$currProductId;
                        //类型
                        postData.type = 2;
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

                        productService.getImageRepoList(postData).$promise.then(function (resp) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.imageRepoList4Desc = list;
                            $defer.resolve(list);
                        });


                    }
                });
            }


            //打开选取详情图Modal
            $scope.showModal4SelectImages4Desc = function(descImageGroupIndex){
                $('#imageRepoModal4Desc').modal('show');
                $scope.currentDescImageGroupIndex = descImageGroupIndex;
            };

            //确认选取详情图
            $scope.confirmSelectImages4Desc = function(url){
                var remainLen = $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT - $scope.product.descImages[$scope.currentDescImageGroupIndex].items.length;
                if(remainLen <= 0){
                    $window.alert("亲，该图片组图片已满，不能再增加了");
                    return;
                }else{
                    $scope.product.descImages[$scope.currentDescImageGroupIndex].items.push({
                        id : null,
                        url : url
                    });
                }
            };

            //取消选取详情图
            $scope.cancelSelectImages4Desc = function(){
                $('#imageRepoModal4Desc').modal('hide');
            };

            //判断图片组中是否已包含此url
            $scope.containDescImageUrl = function(url){
                var flag = false;
                if($scope.currentDescImageGroupIndex !== null){
                    angular.forEach($scope.product.descImages[$scope.currentDescImageGroupIndex].items, function(item, index){
                        if(flag)return;
                        if(item.url == url){
                            flag = true;
                        }
                    });
                }
                return flag;
            };



            //-- 获取图库列表forSKU图
            function buildImageTableParams4Sku(){
                //-- ngTable对象构造
                $scope.imageTableParams4Sku = new TableParams({
                    page: 1,
                    count: 12
                }, {
                    counts: [12],
                    total: 0,
                    $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                    getData: function ($defer, params) {

                        //=========构造查询条件 start =========
                        var postData = {};
                        //商品id
                        postData.id = $scope.$currProductId;
                        //类型
                        postData.type = 1;
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

                        productService.getImageRepoList(postData).$promise.then(function (resp) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.imageRepoList4Sku = list;
                            $defer.resolve(list);
                        });


                    }
                });
            }


            //打开选取SKU图Modal
            $scope.showModal4SelectImages4Sku = function(skuIndex){
                $('#imageRepoModal4Sku').modal('show');
                $scope.currentSkuIndex = skuIndex;
            };

            //确认选取详情图
            $scope.confirmSelectImages4Sku = function(url){
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[$scope.currentSkuIndex].images.length;
                if(remainLen <= 0){
                    $window.alert("亲，该规格描述图片已满，不能再增加了");
                    return;
                }else{
                    $scope.product.skus[$scope.currentSkuIndex].images.push({
                        id : null,
                        url : url
                    });
                }
            };

            //取消选取详情图
            $scope.cancelSelectImages4Sku = function(){
                $('#imageRepoModal4Sku').modal('hide');
            };

            //判断图片组中是否已包含此url
            $scope.containSkuImageUrl = function(url){
                var flag = false;
                if($scope.currentSkuIndex !== null){
                    angular.forEach($scope.product.skus[$scope.currentSkuIndex].images, function(item, index){
                        if(flag)return;
                        if(item.url == url){
                            flag = true;
                        }
                    });
                }
                return flag;
            };
            //-- =======================================END  :图库部分======================================

            //-- =======================================初始化===========================================
            $scope.initVariables();

            if(angular.isDefined($stateParams.productId) && $stateParams.productId!==null){
                //获取商品id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currProductId = $stateParams.productId;
                $scope.changeProduct();
            }
        }



    ]);
