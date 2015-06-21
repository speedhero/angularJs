/**
 * @name:售后模块服务
 * @author:caibin
 * @create on: 2014/10/04
 **/
angular.module('flymvo.refund.service', [])
    .factory('refundService', ['$resource', "$globalSetting",
        function ($resource, $globalSetting) {
            var headers = {};
            if(!$globalSetting.isMockEnv){
                headers = {'Content-Type': 'application/json;charset=UTF-8'};
            }
            var service = $resource('/data/order/', null,
                {
                    //查询售后单
                    query: {url: '/data/orderReturn/search', method: 'POST', isArray: false, headers: headers},
                    //获取物流公司
                    getLogisticsCompany: {url: '/data/order/companyList', method: 'GET', isArray: false},

                    //审核同意
                    agree: {url: '/data/orderReturn/verify', method: "POST"},

                    //发货和重发
                    deliver: {url: '/data/orderReturn/confirmResend/$', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //回收
                    recycle: {url: '/data/orderReturn/confirmReceive/:returnNo/$' },

                    //补发  
                    reSupply: {url: '/data/orderReturn/confirmResend/$',method: 'POST', isArray:false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},

                    //详情-获取售后状态
                    get: {url: '/data/orderReturn/get/:refundId/$', params: {refundId: '@refundId'}},
                    //详情-获取物流信息
                    getLogistics: {url: '/data/orderReturn/logistics/:trackingNo/$'},

                    //提醒发货
                    getRecycleInfo: {url: '/none', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取默认地址
                    defaultAddress: {url: '/data/tms/mftAddress/setDefaultAddress/:id'},
                    //查询地址
                    queryAddress: {url: '/data/tms/mftAddress/get', method: "POST", isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取区域
                    getRegion: {url: '/data/tms/region/get/:parentId', parmas: {parentId: '@parentId'}, isArray: false},
                    //添加地址
                    createAddress: {url: '/data/tms/mftAddress/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                });

            return service;
        }]);
