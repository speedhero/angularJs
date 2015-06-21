/**
 * @name: 类目功能服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.category.service', [])
    .factory('categoryService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data', {id: '@id'},
                {
                    // 获得类目所有属性
                    'listAttrs': {url :'/data/category/attrs/:categoryId/$' ,method: 'GET', isArray: false},
                    // 获得类目所有规格
                    'listSpecs': {url :'/data/category/specs/:categoryId/$' ,method: 'GET', isArray: false}
                }
            );
            return service;
        }]);
