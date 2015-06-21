angular.module('flymvo.account.service', [])
    .factory('accountService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/account/', {},
                {
                    //修改密码
                    'updatePassword': {url: "/data/mftUser/changePw", method: 'POST', isArray: false},
                    //获取制造商信息
                    'getManufacturerInfo': {url: "/data/mft/info", method: 'GET', isArray: false},
                    //保存制造商信息（商城部分）
                    'saveStoreInfo': {url: "/data/mft/saveStoreInfo", method: 'POST', isArray: false},
                    //获取品牌信息
                    'getBrandInfo':{url:"/data/mftBrand/get",method:'GET',isArray:false},
                   //保存上传图片
                   'uploadImage':{url:'/data/mftBrand/uploadImage',method:'POST',isArray:false}
                });
            return service;
        }]);