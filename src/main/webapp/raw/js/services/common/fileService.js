/**
 * @name: 文件、图片服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.file.service', [])
    .factory('fileService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {id: '@id'},
                {
                    // 上传图片
                    'uploadImage': {url :'/data/upload/image' ,method: 'POST', isArray: false}
                }
            );
            return service;
        }]);
