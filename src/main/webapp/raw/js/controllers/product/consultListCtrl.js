/**
 * @name: 商品列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.consultListCtrl', [])
    .controller('consultListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'consultConstants',
        'consultService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $globalSetting, consultConstants, consultService, TableParams) {

            //-- =======================================变量===========================================

            //-- 初始化常量
            $scope._types = consultConstants.types;
            $scope._statuses = consultConstants.statuses;

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //-- 当前回复
            $scope.currConsult = null;

            //-- html模板
            $scope.templates = {
                replyModal : '/html/product/include/replyConsultModal.html?tag='+$globalSetting.version,
            };


            //-- =======================================函数===========================================

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.consultSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#consultSearchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#consultSearchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.consultTableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.consultSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 是否可以回复
            $scope.canReply = function(consult){
                return (consult.status === 0);
            };

            //获得sku图片路径
            $scope.getSkuImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_100_100_90" +image.substring(index);
                    }
                }
                return result;
            };

            //-- 显示回复Modal
            $scope.showModal4ReplyConsult = function(consult){
                $('#replyConsultModal').modal('show');
                if($scope.currConsult === null || $scope.currConsult.id !== consult.id){
                    $scope.currConsult = angular.copy(consult);
                    $scope.currConsult.replyContent = "";
                    //将错误移除
                    $scope.$$childTail.replyForm.$setPristine(true);
                    //处理验证的field
                    $('#replyConsultModal #replyContent').val("");
                }
            };

            //-- 回复咨询
            $scope.replyConsult = function(){
                if($scope.$$childTail.replyForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#replyForm :input.ng-invalid').first().focus();
                    return;
                }
                if($scope.currConsult.replyContent.length < 10){
                    $window.alert("回复内容不能少于10个字符");
                    return;
                }
                $('#replyConsultModal').modal('hide');
                consultService.reply({
                    replyContent: $scope.currConsult.replyContent.trim(),
                    id: $scope.currConsult.id
                })
                .$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }else{
                        $scope.currConsult = null;
                    }
                    $scope.consultTableParams.reload();
                });
            };

            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_consult_list');

            //-- ngTable对象构造
            $scope.consultTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序field
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========

                    consultService.query(postData).$promise.then(function (resp) {
                        $('#consultSearchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.skuList = list;
                        $defer.resolve(list);
                        $scope.$loaded = true;
                    });


                }
            });



        }

    ]);
