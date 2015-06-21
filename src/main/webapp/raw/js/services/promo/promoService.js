/**
 * @name: 促销模块服务
 * @author: Patrick
 * @creat on: 2014/11/18.
 */
angular.module('flymvo.promo.service', [])
    .factory('promoService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {},
                {
                    //-- ===========================商品促销价===========================
                    // 查询促销价列表
                    'queryPromoPrices': {url :'/data/promotionalprice/search' ,method: 'POST', isArray: false},
                    // 批量设置商品促销价失效
                    'multiDisablePromoPrices': {url :'/data/promotionalprice/invalid' ,method: 'POST', isArray: false},
                    // 添加商品促销价
                    'addPromoPrices': {url :'/data/promotionalprice/add' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================店铺优惠===========================
                    // 查询店铺优惠列表
                    'querySalesRules': {url :'/data/salesRule/search' ,method: 'POST', isArray: false},
                    // 删除店铺优惠
                    'deleteSalesRule': {url :'/data/salesRule/delete' ,method: 'POST', isArray: false},
                    // 撤销店铺优惠
                    'cancelSalesRule': {url :'/data/salesRule/cancel' ,method: 'POST', isArray: false},
                    // 获得店铺优惠
                    'getSalesRule': {url :'/data/salseRule/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑店铺优惠
                    'upsertSalesRule': {url :'/data/salesRule/upsert' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================推荐组合/飞荐不可===========================
                    // 查询推荐组合sku列表
                    'queryGroupPromoSkus': {url :'/data/groupPromo/searchSkus' ,method: 'POST', isArray: false},
                    // 根据sku获得推荐组合列表
                    'listGroupPromoBySku': {url :'/data/groupPromo/listBySku/:id/$' ,method: 'GET', isArray: false},
                    // 删除推荐组合
                    'deleteGroupPromo': {url :'/data/groupPromo/delete' ,method: 'POST', isArray: false},
                    // 排序推荐组合
                    'sortGroupPromos': {url :'/data/groupPromo/sort' ,method: 'POST', isArray: false},
                    // 上架推荐组合(已取消)
                    //'shelveGroupPromo': {url :'/data/groupPromo/shelve' ,method: 'POST', isArray: false},
                    // 下架推荐组合(已取消)
                    //'offshelveGroupPromo': {url :'/data/groupPromo/offshelve' ,method: 'POST', isArray: false},
                    // 获得推荐组合
                    'getGroupPromo': {url :'/data/groupPromo/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑推荐组合
                    'upsertGroupPromo': {url :'/data/groupPromo/save' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================搭配组合/非常优惠===========================
                    // 查询搭配组合
                    'queryBundling': {url :'/data/bundling/search' ,method: 'POST', isArray: false},
                    // 上架搭配组合
                    'shelveBundling': {url :'/data/bundling/shelve' ,method: 'POST', isArray: false},
                    // 下架搭配组合
                    'offshelveBundling': {url :'/data/bundling/offshelve' ,method: 'POST', isArray: false},
                    // 删除搭配组合
                    'deleteBundling': {url :'/data/bundling/delete' ,method: 'POST', isArray: false},
                    // 获得捆绑组合列表
                    'getBundlingSkus': {url :'/data/bundling/skus/:id/$' ,method: 'POST', isArray: false},
                    // 获得搭配组合
                    'getBundling': {url :'/data/bundling/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑搭配组合
                    'upsertBundling': {url :'/data/bundling/save' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 检查sku是否参与了其他搭配
                    'checkBundlingSkus': {url :'/data/bundling/checkSkus' ,method: 'POST', isArray: false}


                }
            );
            return service;
        }]);
