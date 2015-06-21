/**
 * @name: 信息服务
 * @author: Patrick
 * @creat on: 2014/11/18.
 */
angular.module('flymvo.message.service', [])
    .factory('messageService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {},
                {
                    //获得分类及未读条数
                    'listCategories': {url :'/data/message/listCategories' ,method: 'GET', isArray: false},
                    //根据分类分页获得信息
                    'search': {url :'/data/message/search' ,method: 'POST', isArray: false}

                }
            );
            return service;
        }]);
