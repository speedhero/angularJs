/**
 * @name brandInfoCtrl
 * @author Allen.Chan
 * @time 2014/11/14
 **/
angular.module("flymvo.account.brandInfoCtrl", [])
    .controller("brandInfoCtrl", [
        '$compile',
        '$scope',
        '$window',
        '$upload',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        '$rootScope',
        '$state',   
        'commonConstants',
        'fileService',
        'accountService',
        function ($compile, $scope, $window, $upload, $filter, $timeout, $stateParams,$globalSetting , $rootScope, $state ,commonConstants, fileService, accountService) {
            //==================================== 变量 =========================================
            
            $scope.brands = {}; 
            /*if($globalSetting.isMockEnv){
                $scope.account = [{

                    brandName: 'hha',
                    brandCode: 'XXXXdfXX',
                    imageUrl1: "http://dummyimage.com/200x200/9c9464&text=Anthony",
                    imageUrl2: "http://dummyimage.com/200x200/9c9464&text=Anthony"
                }
                ,
                {

                    brandName: 'hha',
                    brandCode: 'XXXwewXXX',
                    imageUrl1: "http://dummyimage.com/200x200/9c9464&text=Anthony",
                    imageUrl2: "http://dummyimage.com/200x200/9c9464&text=Anthony"
                }
                ];
            }*/
            //==================================== 函数 =========================================
             
            $scope.reloadBrandInfo = function(){
               //读取厂商数据  
                accountService.getBrandInfo().$promise.then(function (resp){
                    if(resp.success === true){    
                        $scope.brands= resp.models;   
                    } else if(resp.success === false){ 
                        $scope.brands =null;
                    }
                });
            };


            //上传品牌Logo图片
            $scope.uploadLogoImage = function ($files,index){

                $scope.uploadFile = { url: "" };
                var file = $files[0];

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                }

                $scope.brands[index].uploadingLogo = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                    var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.brands[index].uploadPercent = uploadPercent;
                }).success(function (data, status, headers, config) {
                    //var uploadResult = data.models;
                    if(data.models && data.models[0].success){
                        //$scope.brands[index].pcImgUrl =  "";
                        $scope.brands[index].logoImgUrl = data.models[0].url;
                        accountService.uploadImage({
                            "brandId":$scope.brands[index].brandId,
                            "pcImgUrl":null,
                            "mobileImgUrl":null,
                            "logoImgUrl":$scope.brands[index].logoImgUrl
                        }).$promise.then(function (resp){
                                if(resp.success === true){
                                    $scope.reloadBrandInfo();
                                    var timer = $timeout(
                                        function() {
                                            $window.alert("上传成功");
                                        },
                                        100
                                    );
                                }
                                else{
                                    alert("上传失败");
                                }
                            });
                        //$scope.uploadFile.url = data.models[0].url;
                        // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;
                    } else if (data.models && !data.models[0].success){
                        $window.alert(data.models[0].message);
                    }

                    $scope.brands[index].uploadingLogo = false;

                }).error(function (data, status, headers ,config) {
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                    $scope.brands[index].uploadingLogo = false;
                });
            };

            //上传PC端图片
            $scope.uploadBrandPcImage = function ($files,index){  

                $scope.uploadFile = { url: "" }; 
                var file = $files[0];

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                }  

                $scope.brands[index].uploadingPc = true; 
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {   
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.brands[index].uploadPercent = uploadPercent; 
                }).success(function (data, status, headers, config) { 
                        //var uploadResult = data.models;     
                        if(data.models && data.models[0].success){    
                            //$scope.brands[index].pcImgUrl =  "";
                            $scope.brands[index].pcImgUrl = data.models[0].url;   
                            accountService.uploadImage({
                                "brandId":$scope.brands[index].brandId, 
                                "pcImgUrl":$scope.brands[index].pcImgUrl,
                                "mobileImgUrl":null
                            }).$promise.then(function (resp){
                             if(resp.success === true){

                                 $scope.reloadBrandInfo();
                                 var timer = $timeout(
                                     function() {
                                         $window.alert("上传成功");
                                     },
                                     100
                                 );
                             }
                             else{
                                alert("上传失败");
                             }
                           });
                            //$scope.uploadFile.url = data.models[0].url;
                            // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;   
                        } else if (data.models && !data.models[0].success){ 
                            $window.alert(data.models[0].message);
                        } 

                       $scope.brands[index].uploadingPc = false;

                }).error(function (data, status, headers ,config) { 
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                    $scope.brands[index].uploadingPc = false; 
                }); 
            };

            //上传移动端图片
            $scope.uploadBrandMobileImage = function ($files,index){  

                var file = $files[0]; 
                $scope.uploadFile = { url: "" };

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                } 
                /*if($scope.brands[index].pcImgUrl != $scope.brandsSave[index].pcImgUrl){
                    $scope.brands[index].uploadingPc = true;
                }
                if($scope.brands[index].mobileImgUrl != $scope.brandsSave[index].mobileImgUrl){
                    $scope.brands[index].uploadingMb = true;
                }*/

                $scope.brands[index].uploadingMb = true; 
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) { 
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.brands[index].uploadPercent = uploadPercent;
                }).success(function (data, status, headers, config) {
                       if(data.models && data.models[0].success){    
                            //$scope.brands[index].mobileImgUrl = "";
                            $scope.brands[index].mobileImgUrl=  data.models[0].url;  
                             accountService.uploadImage({
                                "brandId":$scope.brands[index].brandId, 
                                "pcImgUrl":null,
                                "mobileImgUrl":$scope.brands[index].mobileImgUrl
                            }).$promise.then(function (resp){
                             if(resp.success === true){

                                $scope.reloadBrandInfo();
                                var timer = $timeout(
                                function() { 
                                                $window.alert("上传成功");  
                                            },
                                    100
                                );
                             }
                             else{
                                alert("上传失败");
                             }
                               
                           });
                            //$scope.uploadFile.url = data.models[0].url;
                            // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;    
                        } else if (data.models && !data.models[0].success){ 
                            $window.alert(data.models[0].message);
                        } 
                       $scope.brands[index].uploadingMb = false;
                }).error(function (data, status, headers ,config) { 
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                       $scope.brands[index].uploadingMb = false; 
                });

            };
            //==================================== 初始化 =======================================
            $scope.$changeCurrMenuByCode('mvo_account_brand_info'); 

            $scope.reloadBrandInfo();

           /* $scope.$watch("uploadFile", function(){ 
                  $scope.reloadBrandInfo();
            });  */


        }]);
     
    
  