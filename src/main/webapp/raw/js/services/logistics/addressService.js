/**
 * @component: service
 * @name: flymvo.logistics.service
 * @description: logistics模块相关服务
 * @author: max.huang
 * @creat on: 2014/9/24.

 */
angular.module('flymvo.address.service', [])
    .factory('addressService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service = $resource('/data/', {id: '@id'},
              {
                'query'  : {url: '/data/tms/mftAddress/get', method: "POST", isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'create' : {url: '/data/tms/mftAddress/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'update' : {url: '/data/tms/mftAddress/update', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'setDefault': {url: '/data/tms/mftAddress/setDefaultAddress/:id'},
                'get'    : {url: '/data/tms/mftAddress/getById/:addressId', isArray: false}
              }
          );
          return service;
        }]);
