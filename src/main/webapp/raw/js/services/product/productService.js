/**
 * @name: 商品模块服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.product.service', [])
    .factory('productService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/products/search', {},
                {
                    // 搜索商品
                    'query': {method: 'POST', isArray: false},
                    // 根据ids获得商品列表（简要）
                    'listProducts': {url :'/data/products/list' ,method: 'POST', isArray: false},
                    // 根据ids获得商品列表（复杂）
                    'listFullProducts': {url :'/data/products/listFull' ,method: 'POST', isArray: false},
                    // 获得供应商可用目录
                    'listSupplierCategories': {url :'/data/category/supplierCategories' ,method: 'GET', isArray: false},
                    // 获得供应商可用品牌
                    'listSupplierBrands': {url :'/data/brand/supplierBrands' ,method: 'GET', isArray: false},
                    // 获得类目信息
                    'getCategory': {url :'/data/category/:id/$' ,method: 'GET', isArray: false},
                    // 获得品牌信息
                    'getBrand': {url :'/data/brand/:id/$' ,method: 'GET', isArray: false},
                    // 创建商品
                    'createProduct': {url :'/data/product/create' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 上架商品
                    'shelve': {url :'/data/product/shelve' ,method: 'POST', isArray: false},
                    // 下架商品
                    'offShelve': {url :'/data/product/offShelve' ,method: 'POST', isArray: false},
                    // 删除商品（移动到回收站）
                    'moveToRecycleBin': {url :'/data/product/moveToRecycleBin' ,method: 'POST', isArray: false},
                    // 申请上架商品
                    'applyOnShelve': {url :'/data/product/applyOnShelve' ,method: 'POST', isArray: false},
                    // 修改sku价格
                    'changePrice': {url :'/data/product/changePrice' ,method: 'POST', isArray: false},
                    // 修改sku库存
                    'changeQuantityOnHand': {url :'/data/product/changeQuantityOnHand' ,method: 'POST', isArray: false},
                    // 获得商品常量
                    'listProdEnumByType': {url :'/data/product/enum' ,method: 'GET', isArray: false},

                    // 获得商品基本信息和属性信息
                    'getProductBasic': {url :'/data/product/:id/getBasic' ,method: 'GET', isArray: false},
                    // 保存商品基本信息和属性信息
                    'saveProductBasic': {url :'/data/product/saveBasic' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品包装信息和售后信息
                    'getPackAndAfterSale': {url :'/data/product/:id/getPackAndAfterSale' ,method: 'GET', isArray: false},
                    // 保存商品包装信息和售后信息
                    'savePackAndAfterSale': {url :'/data/product/savePackAndAfterSale' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品详情信息
                    'getProductDesc': {url :'/data/product/:id/getDesc' ,method: 'GET', isArray: false},
                    // 保存商品详情信息
                    'saveProductDesc': {url :'/data/product/saveDesc' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品规格与物流信息
                    'getSpecsAndLogistics': {url :'/data/product/:id/getSpecsAndLogistics' ,method: 'GET', isArray: false},
                    // 保存商品规格与物流信息
                    'saveSpecsAndLogistics': {url :'/data/product/saveSpecsAndLogistics' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    // 获得商品图库列表
                    'getImageRepoList': {url :'/data/product/:id/getImageRepoList' ,method: 'GET', isArray: false}

                }
            );
            return service;
        }]);
