/**
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productCreateCtrl', [])
    .controller('productCreateCtrl', [
        '$compile',
        '$window',
        '$scope',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$upload',
        '$globalSetting',
        'productConstants',
        'commonConstants',
        'productService',
        'fileService',
        'logisticsService',
        'categoryService',
        function ($compile, $window, $scope, $filter, $timeout, $state, $stateParams, $upload, $globalSetting, productConstants, commonConstants, productService, fileService, logisticsService, categoryService) {
            //-- =======================================常量===========================================
            $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT = productConstants.MAX_UPLOAD_SKU_IMAGE_LIMIT;
            $scope.MAX_UPLOAD_DESC_GROUP_LIMIT = productConstants.MAX_UPLOAD_DESC_GROUP_LIMIT;
            $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT = productConstants.MAX_UPLOAD_DESC_IMAGE_LIMIT;
            $scope.MAX_SKU_NUM_LIMIT = productConstants.MAX_SKU_NUM_LIMIT;

            //-- =======================================变量===========================================
            //-- 初始化模型
            $scope.product = {
                //目录
                categoryId: $stateParams.categoryId,
                //品牌
                brandId: $stateParams.brandId,
                //是否有保修, 1=有，0=没有
                hasWarranty: 0,
                //保修期
                warrantyPeriod: "",
                //谁承担运费,1=卖家，2=买家
                whoPayCarriage: 1,
                //运费模板
                logisticsTemplateId: null,
                //商品属性
                /**
                 * 商品属性
                 * key: attrId
                 * value : optionId
                 * 例如 {'100':10000, '200':20000, '300':[30001,30002], '400':"some text"}
                 */
                attrs: {},
                //商品类型,0= 普通商品, 1=多规格商品
                skuType: 0,
                //详细图组
                descImages: [],
                //退换货承诺
                promiseIds: [],
                //货品
                skus: [
                    {
                        //市场价
                        marketPrice: "",
                        //飞飞价
                        price: "",
                        //库存
                        quantityOnHand: "",
                        //重量
                        weight: "",
                        //长
                        length: "",
                        //宽
                        width: "",
                        //高
                        height: "",
                        //物流重量
                        carriage: null,
                        //条形码
                        barCode: '',
                        //商品型号
                        model: '',
                        /**
                         * sku规格json
                         * key: specId 规格id
                         * value : optionId 规格值id, optionValue 规格值的值
                         * 例如 {'101':{optionId:10000, optionValue:'#fff', optionName:'白'}, '201':{optionId:10001, optionValue:'#000', optionName:'黑'}}
                         */
                        specs: {},
                        //商品图片
                        images: []
                    }
                ]
                //--end skus

            };

            if ($globalSetting.isMockEnv) {
                //-- ====================================Start: Mock==============================================
                $scope.product = {
                    //商品名称
                    productName: "简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯",
                    //商品特色
                    feature: "美式乡村复古全铜",
                    //商品副标题
                    subheading: "真正的纯铜，够分量",
                    //商品副标题
                    keywords: "灯,吊灯,欧式,简约,全铜",
                    //目录
                    categoryId: $stateParams.categoryId,
                    //品牌
                    brandId: $stateParams.brandId,

                    //是否有保修, 1=有，0=没有
                    hasWarranty: 0,

                    //保修期
                    warrantyPeriod: "",

                    //退换货承诺id列表
                    promiseIds: [],

                    //谁承担运费,1=卖家，2=买家
                    whoPayCarriage: 2,

                    //配送地区备注
                    shipRegionRemark: "这是个备注",

                    //运费模板
                    logisticsTemplateId: null,

                    //包装信息
                    packInfo: "灯泡*2 灯架*1 底座*1 灯罩*1 保修卡*1 说明书*1",

                    //售后说明
                    afterSaleDesc: "这是售后说明",

                    //商品类型,0= 普通商品, 1=多规格商品
                    skuType: 0,

                    /**
                     *详细描述图片
                     * each item is {
                  *     id :图片id,
                  *     url: 上传图片的url
                  * }
                     */

                    descImages: [
                        {
                            id: null,
                            tag: '商品情景',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/432081&text=Eric"},
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        },
                        {
                            id: null,
                            tag: '商品参数',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/d274f8&text=Patrick" },
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        },
                        {
                            id: null,
                            tag: '建议搭配',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        }
                    ],

                    skus: [
                        {
                            //市场价
                            marketPrice: 150.80,
                            //飞飞价
                            price: 100,
                            //库存
                            quantityOnHand: 888,
                            //重量
                            weight: 0.68,
                            //长
                            length: 15,
                            //宽
                            width: 25,
                            //高
                            height: 35,
                            //运输重量
                            carriage: 21,
                            //条形码
                            barCode: '6901294179888',
                            //商品型号
                            model: 'M780',
                            //商家编码
                            mftProductCode: 'ERT397',
                            //规格
                            specs: {},
                            //商品图片
                            images: [
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/17d578&text=Larry"
                                },
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/9c9464&text=Anthony"
                                },
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/48743d&text=Helen"
                                }
                            ]
                        }
                    ]
                    //--end skus
                };
                //-- ====================================End:   Mock==============================================
            }

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


            //-- html模板
            $scope.templates = {
                //基本信息
                basicInfoSection: '/html/product/include/createProduct4BasicInfo.html?tag=' + $globalSetting.version,
                //商品属性
                attributeSection: '/html/product/include/createProduct4Attribute.html?tag=' + $globalSetting.version,
                //规格
                specSection: '/html/product/include/createProduct4Spec.html?tag=' + $globalSetting.version,
                //规格-普通商品
                specSection4SingleSku: '/html/product/include/createProduct4SpecSingleSku.html?tag=' + $globalSetting.version,
                //规格-多规格商品
                specSection4MultiSku: '/html/product/include/createProduct4SpecMultiSku.html?tag=' + $globalSetting.version,
                //规格-多规格商品（规格栏）
                specSection4MultiSku4Specs: '/html/product/include/createProduct4SpecMultiSku4Specs.html?tag=' + $globalSetting.version,
                //详细描述
                descSection: '/html/product/include/createProduct4Desc.html?tag=' + $globalSetting.version,
                //商品图
                imageSection: '/html/product/include/createProduct4Image.html?tag=' + $globalSetting.version,
                //物流配送
                logisticsSection: '/html/product/include/createProduct4Logistics.html?tag=' + $globalSetting.version,
                //包装
                packSection: '/html/product/include/createProduct4Pack.html?tag=' + $globalSetting.version,
                //售后
                afterSaleSection: '/html/product/include/createProduct4AfterSale.html?tag=' + $globalSetting.version,
                //选择规格与规格值
                chooseSpecsModal: '/html/product/include/createProduct4ChooseSpecsModal.html?tag=' + $globalSetting.version,
                //添加物流模板modal
                addLogisticsTemplateModal: '/html/product/include/addLogisticsTemplateModal.html?tag=' + $globalSetting.version,
                //物流模板body
                logisticsTemplatePageBody: '/html/logistics/createLogistics.html?tag=' + $globalSetting.version
            };

            //-- =======================================服务获得数据===========================================

            //-- 获得当前目录
            productService.getCategory({id: $scope.product.categoryId}).$promise.then(function (resp) {
                $scope.category = resp.model;
            });

            //-- 获得当前品牌
            productService.getBrand({id: $scope.product.brandId}).$promise.then(function (resp) {
                $scope.brand = resp.model;
            });

            //-- 获得用户定义的所有运费模板
            logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                $scope.logisticsTemplates = resp.models;
            });

            //-- 获得类目的所有属性
            categoryService.listAttrs({categoryId: $stateParams.categoryId}).$promise.then(function (resp) {
                $scope.catAttrs = resp.models;
            });

            //-- 获得类目的所有规格
            categoryService.listSpecs({categoryId: $stateParams.categoryId}).$promise.then(function (resp) {
                $scope.specs = resp.models;
                initSpecOptionNameAlias();
                $scope.specsOrigin = angular.copy($scope.specs);
            });

            //-- 获得所有售后保证项列表
            productService.listProdEnumByType({type: 1}).$promise.then(function (resp) {
                $scope.afterSaleEnumList = resp.models;
                angular.forEach($scope.afterSaleEnumList, function (promise) {
                    if (promise.value == 1 || promise.value == 2) {
                        $scope.product.promiseIds.push(promise.id);
                    }
                });

            });


            //-- =======================================函数===========================================

            //--单选属性取消选择
            $scope.cancelAttrSingleSelect = function (attrId) {
                delete $scope.product.attrs['' + attrId];
            };

            //上传单个描述图
            function uploadSingleDescImage(file, groupIndex) {
                if (file.size >= 1024 * 1024) {
                    $window.alert("文件'" + file.name + "'的大小超过1024KB，不能上传。");
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
                if ($files.length > remainLen) {
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传" + remainLen + "幅");
                    return;
                } else {
                    if ($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function (file, index) {
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.descImages[groupIndex].items.push(resp.model);
                            });
                        });
                    } else {
                        angular.forEach($files, function (file, index) {
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
                    id: null,
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

            //上传单幅SKU图片
            function uploadSingleSkuImage(file, skuIndex) {
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
            $scope.uploadSkuImage = function ($files, skuIndex) {
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[skuIndex].images.length;
                if ($files.length > remainLen) {
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传" + remainLen + "幅");
                    return;
                } else {
                    if ($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function (file, index) {
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.skus[skuIndex].images.push(resp.model);
                            });
                        });
                    } else {
                        angular.forEach($files, function (file, index) {
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
                angular.forEach($scope.product.skus, function (sku, index) {
                    sku[nameSelector] = value;
                });
            };
            //应用到所有相同但未填的input
            $scope.applyToNotInputSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function (sku, index) {
                    if (angular.isUndefined(sku[nameSelector]) || $.trim(sku[nameSelector]) === "") {
                        sku[nameSelector] = value;
                    }
                });
            };

            //切换到普通商品
            $scope.toggleToSingleSku = function ($event) {
                if ($scope.product.skuType === 0) {
                    //已经是普通商品
                    return;
                }
                var tip = "您是否确认将多规格商品切换为普通商品，你目前已生成" + $scope.product.skus.length + "个货品，";
                tip += "非默认货品的所有数据及相关图片将删除。\r\n【此操作不可逆，是否确认转换？】";
                if ($window.confirm(tip)) {
                    $scope.product.skuType = 0;
                    $scope.product.skus.splice(1, $scope.product.skus.length - 1);
                    $scope.product.skus[0].specs = {};
                    $scope.specs = angular.copy($scope.specsOrigin);
                } else {
                    //还原checkbox状态
                    $event.preventDefault();
                }


            };

            //切换到多规格商品
            $scope.toggleToMultiSku = function ($event) {
                //还原checkbox状态
                $event.preventDefault();

                if ($scope.product.skuType == 1) {
                    //已经是多规格
                    return;
                }
                //弹出规格选择框
                //生成规格项临时变量
                $scope.specsToGen = angular.copy($scope.specsOrigin);
                $('#chooseSpecsModal').modal('show');

            };

            /**
             *增加(乘以)一个维度的规格
             * specId 是规格id，
             * options是要增加规格值数组：[{optionId, optionValue, optionName}]
             */

            function multipleSpec(specId, options) {
                if (options.length === 0)return;

                var newArray = [];
                angular.forEach($scope.product.skus, function (sku, skuIndex) {
                    angular.forEach(options, function (option, optionIndex) {
                        var newSku = angular.copy(sku);
                        if (!newSku.specs)newSku.specs = {};
                        newSku.specs[specId + ''] = {
                            optionId: option.optionId,
                            optionValue: option.optionValue,
                            optionName: option.optionName,
                            optionNameAlias: option.optionNameAlias
                        };
                        newArray.push(newSku);

                    });
                });
                $scope.product.skus.splice(0, $scope.product.skus.length);
                angular.forEach(newArray, function (array, arrayIndex) {
                    $scope.product.skus.push(array);
                });

            }


            //-- 生成多货品
            $scope.generateSkus = function () {
                var canGen = false;
                angular.forEach($scope.specsToGen, function (spec, specIndex) {
                    if (spec.checked) {
                        canGen = true;
                    }
                });
                if (!canGen) {
                    $window.alert("请至少选择一个规格值哦");
                    return;
                }
                $('#chooseSpecsModal').modal('hide');
                //可以生成
                $scope.specs = $scope.specsToGen;
                $scope.product.skuType = 1;
                angular.forEach($scope.specs, function (spec, specIndex) {
                    if (spec.checked) {
                        optionsChecked = _.filter($scope.specs[specIndex].options, function (option) {
                            return option.checked;
                        });
                        multipleSpec($scope.specs[specIndex].id, optionsChecked);
                    }
                });

            };

            //-- 在规格生成对话框中选择规格
            $scope.chooseSpecInDialog = function (specId, optionId) {
                angular.forEach($scope.specsToGen, function (spec, specIndex) {
                    if (spec.id == specId) {
                        var noOptionChecked = true;
                        angular.forEach(spec.options, function (option, optionIndex) {
                            if (option.optionId == optionId) {
                                option.checked = !option.checked;
                            }
                            if (option.checked) {
                                noOptionChecked = false;
                            }
                        });
                        spec.checked = !noOptionChecked;
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
            function isSpecsEqual(spec1, spec2) {
                var result = true;
                var len1 = 0;
                var len2 = 0;
                angular.forEach(spec1, function (value, key) {
                    if (angular.isUndefined(spec2[key]) || (spec2[key].optionId != value.optionId)) {
                        result = false;
                    }
                    len1++;
                });
                angular.forEach(spec2, function (value, key) {
                    len2++;
                });
                if (len1 != len2 || len1 === 0) {
                    result = false;
                }
                return result;
            }

            //-- 在多规格选项卡中选择规格
            $scope.secondChooseSpec = function ($event, specId, option) {
                //是否已有此规格
                var hasThisSpec;
                //提示信息
                var tip;
                //是否改变了sku
                var hasChangeSku = false;

                //第一步，改变$scope.product.skus
                if (!option.checked) {
                    //首先检查货品数量
                    if (isSkuNumExceedLimit()) {
                        //还原checkbox状态
                        $event.preventDefault();
                        return;
                    }
                    //=============================增加规格值=======================================
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (!hasThisSpec) {
                        //情况1-a, 增加一个新的规格的规格值 【方法思维：只需要将现有的skus乘以一个规格即可】
                        multipleSpec(specId, [
                            {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            }
                        ]);
                        hasChangeSku = true;

                    } else {
                        //情况1-b, 此规格已存在，只是单纯增加一个新的规格值
                        //【方法思维：循环检查每个sku，复制一个新的sku，此sku的规格对应的规格值是新值，最终模拟出互不相同的若干个sku，把它们添加到skus即可】
                        var toAddList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //假设增加一个sku
                            var mockSku = angular.copy(sku);
                            mockSku.specs[specId + ""] = {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            };
                            if (!existsInList(toAddList, mockSku) && !existsInList($scope.product.skus, mockSku)) {
                                toAddList.push(mockSku);
                            }
                        });
                        if (toAddList.length !== 0) {
                            angular.forEach(toAddList, function (sku, skuIndex) {
                                $scope.product.skus.push(sku);
                            });
                            hasChangeSku = true;
                        }

                    }

                } else {
                    //=============================减少规格值=======================================
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (hasThisSpec) {
                        //情况2, 删除一个规格值 【方法思维：用一个数组将可以保留下来的sku保存下来，过滤掉那些匹配的规格值】
                        var toRetainList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            if (sku.specs[specId + ""].optionId != option.optionId) {
                                toRetainList.push(angular.copy(sku));
                            }
                        });
                        if (toRetainList.length === 0) {
                            //情况2-a，可能每个sku都去掉一个规格，也可能变为普通商品
                            if (Object.keys($scope.product.skus[0].specs).length > 1) {
                                //情况A, 这种情况表示去掉某个规格的最后一个值
                                angular.forEach($scope.product.skus, function (sku, skuIndex) {
                                    delete sku.specs[specId + ""];
                                });
                                hasChangeSku = true;
                            } else {
                                //情况B,删掉最后一个规格的最后一个规格值，则表示会转换为普通商品
                                tip = "删除此规格值，将会导致多规格商品切换为普通商品";
                                tip += "\r\n【此操作不可逆，是否确认转换？】";
                                if ($window.confirm(tip)) {
                                    $scope.product.skuType = 0;
                                    $scope.product.skus.splice(1, $scope.product.skus.length - 1);
                                    $scope.product.skus[0].specs = {};
                                    hasChangeSku = true;

                                } else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            }
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

                                } else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            } else {
                                //do nothing
                            }
                        }
                    } else {
                        //不可能存在该情况，do nothing
                    }
                }

                if (hasChangeSku) {
                    //根据sku的规格状态更新specs
                    refreshSpecsBySkus();
                }
                //自检程序
                checkSkusSpecPerfect();

            };

            //-- 判断货品数量是否超过规定，如果超过则否则警告并返回false
            function isSkuNumExceedLimit() {
                if ($scope.product.skus.length >= $scope.MAX_SKU_NUM_LIMIT) {
                    tip = "亲，你的货品数量" + $scope.product.skus.length;
                    tip += "已超过限定值" + $scope.MAX_SKU_NUM_LIMIT + "，无法添加/保存，请删除部分货品。";
                    $window.alert(tip);
                    return true;

                }
                return false;
            }

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
                //自检程序
                checkSkusSpecPerfect();

            };

            //--根据sku的规格状态更新specs
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

                        if (hasAlert)return;

                        if (_.contains(seriNumArray, seriNum)) {
                            hasAlert = true;
                            $window.alert(tip);
                            $window.location.reload();
                        } else {
                            seriNumArray.push(seriNum);
                        }
                    });
                    if (hasAlert)return;
                    if (seriNumArray.length !== $scope.product.skus.length) {
                        $window.alert(tip);
                        $window.location.reload();
                    }
                }

            }

            //计算multisku 表格的样式
            $scope.getMultiSkuTableStyle = function () {
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width': (2380 + 200 * specsChecked.length) + 'px',
                    'min-width': '2380px'
                };
            };

            //计算物流重量表格的样式
            $scope.getLogisticsTableStyle = function () {
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width': (230 + 100 * specsChecked.length) + 'px'
                };
            };

            //设置别名，主要为了方便editable-text修改
            function initSpecOptionNameAlias() {
                angular.forEach($scope.specs, function (spec, index) {
                    angular.forEach(spec.options, function (option, index) {
                        option.optionNameAlias = option.optionName;
                    });
                });
            }

            //获得规格别名,如果有别名用别名
            $scope.getOptionRealName = function (option) {
                if (angular.isDefined(option)) {
                    if (angular.isDefined(option.optionNameAlias) && (option.optionNameAlias !== null) && (option.optionNameAlias !== "")) {
                        return option.optionNameAlias;
                    } else {
                        return option.optionName;
                    }
                }
            };


            //重命名规格别名
            $scope.renameOptionName = function (specId, option, data) {
                if ($.trim(data) === "") {
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                return true;
            };


            //重命名规格别名,需要对已生成的sku的规格的别名重新设置
            $scope.renameOptionName4Full = function (specId, option, data) {
                if ($.trim(data) === "") {
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                //对sku的规格的名称进行更改
                angular.forEach($scope.product.skus, function (sku, index) {
                    angular.forEach(sku.specs, function (value, key) {
                        if (key == specId && value.optionId == option.optionId) {
                            value.optionNameAlias = data;
                        }
                    });
                });
                return true;
            };

            //打开添加物流模板窗口
            $scope.showAddLogisticsTemplateModal = function () {
                $('#addLogisticsTemplateModal .modal-dialog').html("");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                $('#addLogisticsTemplateModal .modal-dialog').attr("ng-include", "templates.addLogisticsTemplateModal");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                //此变量用于logisticsCreateCtrl.js
                $scope.$fromProduct = true;
                $('#addLogisticsTemplateModal').modal('show');
            };

            //接收完成添加物流模板事件
            $scope.$on('finishAddLogisticsTemplateEvent', function (e, transFeeTempId) {
                $('#addLogisticsTemplateModal').modal('hide');
                //-- 重新获得用户定义的所有运费模板
                logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                    $scope.logisticsTemplates = resp.models;
                    if (transFeeTempId) {
                        //使得用户不需要再选择一次
                        $scope.product.logisticsTemplateId = parseInt(transFeeTempId);
                    }
                });
            });


            //-- event:提交Form
            $scope.create = function () {
                function _destoryPopover() {
                    $(this).popover('destroy');
                }


                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#productCreateForm :input.ng-invalid');
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
                if (isSkuNumExceedLimit()) {
                    return;
                }


                //3. 检查图片组数量
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

                //4.检查每个图片组是否至少上传了一幅商品详细描述图
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

                //5.检查每个SKU是否至少上传了一幅商品图
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

                //6.检查风格是否最多选择了两个
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

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.product);

                var postJson = angular.copy($scope.product);
                //清除掉多余的规格值别名
                angular.forEach(postJson.skus, function (sku, index) {
                    angular.forEach(sku.specs, function (value, key) {
                        if (value.optionName == value.optionNameAlias) {
                            delete postJson.skus[index].specs[key].optionNameAlias;
                        }
                    });
                });
                productService.createProduct(angular.toJson(postJson)).$promise.then(function (resp) {
                    if (resp.success) {
                        $state.go('main.products', $stateParams);
                    } else {
                        $window.alert(resp.message);
                    }
                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });

            };


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_add');


        }



    ]);
