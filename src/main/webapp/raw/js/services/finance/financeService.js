/**
 * @name: 结算列表服务
 * @author: Allen
 * @creat on: 2014/9/29.
 */
 angular.module('flymvo.finance.service', [])
    .factory('financeService',['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service;
            if($globalSetting.isMockEnv){
              service = $resource("/finance/",{id:'@id'},
                {
                  'listFinance':{url:'/data/finance/getAll',method:'GET',isArray:false},
                  'commissionList': { url: '/data/finance/settlementReport', method:'GET' ,isArray:false}
                });
            }else{
              service = $resource('/data/finance/mftCashierReport',{id: '@id'},
               {
                   //获得结算数据
                   'listFinance': { url: '/data/finance/mftCashierReport',method:'GET', isArray: false} ,
                   'commissionList': { url: '/data/finance/settlementReport', method:'GET' ,isArray:false}
                   //下载明细 
                   //'downLoadDetail':{ url: '/data/finance/downLoadDetail',method:'POST'}
               });
            }
            
            return service;
      }]);
 