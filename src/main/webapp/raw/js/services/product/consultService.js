/**
 * @name: 商品咨询模块服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.consult.service', [])
    .factory('consultService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/consults/search', {},
                {
                    // 搜索咨询
                    'query': {method: 'POST', isArray: false},
                    // 回复咨询
                    'reply': {url :'/data/consult/reply' ,method: 'POST', isArray: false}

                }
            );
            return service;
        }]);
