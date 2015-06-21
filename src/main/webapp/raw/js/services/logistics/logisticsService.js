/**
 * @component: service
 * @name: flymvo.logistics.service
 * @description: logistics模块相关服务
 * @author: max.huang
 * @creat on: 2014/9/24.
 */
angular.module('flymvo.logistics.service', [])
    .factory('logisticsService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service;
          if($globalSetting.isMockEnv) {
            service = $resource('/data/', {id: '@id'},
                {
                  'query'    : {url: '/mock/tms/transFeeTemp/getAll.json', isArray: false},
                  'getRegion': {url:'/mock/tms/region/get.json', method: 'GET', isArray: false},
                  'get'    : {url: '/mock/tms/transFeeTemp/get.json', isArray: false},
                  'deleteLogistics': {url: '/data/tms/transFeeTemp/delete/:transFeeTempId', method: 'GET', isArray: false},
                  'createLogistics':      {url: '/data/tms/transFeeTemp/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                  'deleteDetail'   : {url: '/data/tms/transFeeTemp/deleteDetail/:transFeeTempId/:areaGroup', parmas: {transFeeTempId: '@transFeeTempId', areaGroup: '@areaGroup'}, method: 'GET', isArray: false},

                  // 返回用户定义的所有运费模板
                  'listSupplierLogisticsTemplates': {url :'/data/tms/transFeeTemp/getAll' ,method: 'GET', isArray: false}
                }
            );
            return service;
          }else{
            service = $resource('/data/', {id: '@id'},
                {
                  'query'          : {url: '/data/tms/transFeeTemp/getAll', isArray: false},
                  'getRegion'      : {url :'/data/tms/region/get/:parentId' , parmas: {parentId: '@parentId'}, isArray: false},
                  'get'            : {url: '/data/tms/transFeeTemp/getById/:transFeeTempId', parmas: {transFeeTempId: '@transFeeTempId'}, isArray: false},
                  'deleteLogistics': {url: '/data/tms/transFeeTemp/delete/:transFeeTempId', method: 'GET', isArray: false},
                  'createLogistics': {url: '/data/tms/transFeeTemp/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                  'deleteDetail'   : {url: '/data/tms/transFeeTemp/deleteDetail/:transFeeTempId/:areaGroup', parmas: {transFeeTempId: '@transFeeTempId', areaGroup: '@areaGroup'}, method: 'GET', isArray: false},
                  // 返回用户定义的所有运费模板
                  'listSupplierLogisticsTemplates': {url :'/data/tms/transFeeTemp/getAll' ,method: 'GET', isArray: false}
                }
            );
            return service;
          }

        }]);
