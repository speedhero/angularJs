/**
 * @name: 授权菜单
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.authMenu.service', [])
    .factory('authMenuService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/auth/lisModules', {},
                {
                    // 返回用户授权的菜单，目前只返回第一级
                    'lisAuthModules': {url :'/data/auth/lisModules' ,method: 'GET', isArray: false},
                    'logout': {url: '/data/upms/logout', method: "POST"},
                    'userInfo': {url:'/data/upms/getInfo', method: "POST"}
                }
            );
            return service;
        }]);
