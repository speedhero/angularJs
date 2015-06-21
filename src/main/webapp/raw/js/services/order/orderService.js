/**
* @name:订单模块服务
* @author:caibin
* @create on: 2014/10/04
**/
angular.module('flymvo.order.service',[])
    .factory('orderService',['$resource',
        function ($resource){
            var service = $resource('/data/order/',{id: '@id'},
                {
                    //搜索
                    'query': {url: '/data/order/search',method: 'POST',isArray: false},
                    //订单追踪（配送中 和订单详情用同一个接口）
                    'getTrackOrderDistributing': {url :'/data/order/detail/:orderNumber/$',method: 'GET',isArray: false},
                    //获取发票信息
                    'getBillInfo': {url: '/data/order/invoice/:orderId/$',method: 'GET',isArray: false},
                    //获取商品信息
                    'getProductByOrderNumber': {url: '/data/order/skuList/:orderNumber/$',method: 'GET',isArray: false},
                    //获取订单详情
                    'getOrderDetailInfo': {url: '/data/order/detail/:orderNumber/$', method: 'GET',isArray: false},
                    //发货
                    'deliver': {url: '/data/order/deliver',method: 'POST',isArray: false,headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取物流/快递公司
                    'getLogisticsCompany': {url: '/data/order/companyList',method: 'GET',isArray: false},
                    //获取发货模态框中的收货信息
                    'getReceiveInfo': {url: '/data/order/receive/:orderNumber/$',method: 'GET',isArray: false},
                    //打印清单
                    'getPrintOrderList': {url: '/data/order/shoppingList/:orderNumber/$',method: 'GET',isArray: false},
                    //获取发货列表
                    'queryDeliver': {url:'/data/order/deliver/search',method:'POST',isArray:false},
                    //批量导出订单
                    'multiExport': {url:'/data/order/export/excel', method:'POST',isArray:false},
                    //问题订单号列表
                    'errTrackingNo': {url:'/data/order/errTrackingNo', method:'POST',isArray:false},
                    //订单/运单号查询
                    'queryOrderDeliverList': {url:'/data/order/orderDeliverList', method:'POST',isArray:false},
                    //修改运单号日志
                    'searchTrackingNoLog': {url:'/data/order/trackingNoLog',method:'POST',isArray:false},
                    //修改运单号
                    'updateTrackingNo': {url:'/data/order/updateTrackingNo', method:'POST',isArray:false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //批量发货
                    'multiDeliver': {url:'/data/order/multiDeliver',method:'POST',isArray:false,headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //批量打印清单
                    'multiShoppingList':{url:'/data/order/multiShoppingList',method:'POST',isArray:false,headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                });
          return service;
        }]);