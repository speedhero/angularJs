/**
 * @name: 文件、图片服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.login.service', [])
    .factory('loginService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service = $resource('/data/upms/login', null, {
            'getVerification' : {url: '/data/upms/kaptcha'}
          });
          return service;
        }]);
