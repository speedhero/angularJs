/**
 * @name: cookie统一服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.cookie.service', [])
    .factory('cookieService', ['$resource', '$globalSetting', '$cookies',
        function ($resource, $globalSetting, $cookies) {
            var service = {
                //--获得当前版本
                getVersion : function(){
                    return $cookies.version;
                },
                //--设置当前版本
                setVersion : function(version){
                    $cookies.version = version;
                }
            };
            return service;
        }]);
