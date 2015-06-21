/**
 * @description: 飞飞信鸽
 * @author: Patrick
 **/

angular.module('flymvo.message.directives', [])
    .factory('msgBox', ['$rootScope', '$compile', '$globalSetting', function($rootScope, $compile, $globalSetting){
        function msgBox(options, scope){
            var defaults = {
            };
            this.options = {};
            $.extend(this.options, defaults, options);

            var html = '<div><div msg-box></div></div>';
            this.rootElement = $(html);
            $('body').append(this.rootElement);
            $compile(this.rootElement.contents())(scope);


            this.msgClient =  new WebSocket($globalSetting.isMockEnv? $globalSetting.mockWebSocketServerUrl:$globalSetting.realWebSocketServerUrl);

            this.msgClient.onmessage = function(event) {
            };
            this.msgClient.onerror = function(event) {
            };
            this.msgClient.onopen = function(event) {
            };

            /**
             * 打开飞飞信鸽窗口
             * @returns {msgBox}
             */
            this.open = function(){
                this.rootElement.find('.modal').modal('show');
                return this;
            };

            /**
             * 发送消息
             * @param msg
             */
            this.send = function(msg){
                this.msgClient.send(msg);
            };


            return this;
        }

        return function(options, scope){
            return new msgBox(options, scope);
        };

    }])
    .controller('msgBoxCtrl', [
        '$scope',
        '$window',
        '$element',
        '$filter',
        '$timeout',
        '$globalSetting',
        'messageService',
        'ngTableParams',function($scope, $window, $element, $filter, $timeout, $globalSetting, messageService, TableParams) {
            //-- =======================================变量===========================================
            var jModal = $($element).find('.modal');

            //-- html模板
            $scope.templates = {
                categoryArea : '/html/template/msg-box/categoryArea.html?tag='+$globalSetting.version,
                listArea : '/html/template/msg-box/listArea.html?tag='+$globalSetting.version
            };

            $scope.query = {

            };
            //-- 用于记录选择的商品id
            $scope.selectedItems = [];
            //-- 用于记录全部的商品id
            $scope.selectedItems4All = [];

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //-- 用于记录当前列表数据
            $scope.messageList = [];

            //-- 用于记录分类
            $scope.categories = [];


            //-- =======================================函数===========================================
            $scope.open = function(){
                jModal.modal('show');
                jModal.draggable({
                    handle: ".modal-header"
                });
            };

            //-- =======================================初始化===========================================
            $scope.open();


            messageService.listCategories().$promise.then(function (resp) {
                $scope.categories = resp.models;
            });

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 5
            }, {
                counts: [5],
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
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    messageService.search(postData).$promise.then(function (resp) {
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.messageList = list;
                        $defer.resolve(list);
                    });


                }
            });



    }])
    .directive('msgBox', ['$globalSetting',function ($globalSetting) {
        return {
            restrict: 'A',
            scope: {
            },
            replace: false,
            templateUrl: '/html/template/msg-box/index.html?tag='+$globalSetting.version,
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                    }
                };
            }
        };
    }])
    .run([ '$globalSetting',function ($globalSetting) {
            if($globalSetting.isMockEnv){
                Sockete.Server.configure($globalSetting.mockWebSocketServerUrl, function () {
                    this.onmessage('hello').respond('Hello World!');
                    this.onmessage('feifei').respond('o(^▽^)o');
                    this.onmessage('Wrong message').fail('So sorry');
                });
                // This will Replace native window.WebSocket with Sockete.Client
                Sockete.mock();
            }

    }]);
