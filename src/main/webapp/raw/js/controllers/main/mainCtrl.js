/**
 * @name: Main框架控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.mainCtrl', [])
    .controller('mainCtrl', [
        '$scope',
        '$filter',
        '$state',
        '$timeout',
        '$globalSetting',
        '$window',
        'authMenuService',
        function ($scope, $filter, $state, $timeout, $globalSetting, $window, authMenuService) {

            // 父模板
            $scope.$templates ={
                "pagination" : 'html/template/pagination.html?tag='+$globalSetting.version,
                "paginationShort" : 'html/template/paginationShort.html?tag='+$globalSetting.version,
                "paginationCool" : 'html/template/paginationCool.html?tag='+$globalSetting.version
            };

            $scope.menuLoad = false;
            //所有模块和菜单
            $scope.$moduleMenus = [];
            // 当前模块
            $scope.$currModule = null;
            // 当前菜单
            $scope.$currMenu = null;
            // 用户信息
            $scope.userInfo = {};

            //此变量用于全局控制搜索栏显示状态
            $scope.$isShowSearchBar = true;

            //使得html可以使用Math库
            $scope.Math = $window.Math;


            //--==========================================函数==========================================================

            /**
             * global function
             * 根据value是否存在添加到array，如果有则从array中去掉value，否则添加value
             */

            $scope.toggleSelection = function (array, value) {
                var idx = array.indexOf(value);

                // is currently selected
                if (idx > -1) {
                    array.splice(idx, 1);
                }

                // is newly selected
                else {
                    array.push(value);
                }
            };

            //格式化输出结果,每4个数字一组
            $scope.formattedOutputNumber = function(input){

                var GROUP_NUM = 4;

                if(angular.isDefined(input)){
                    var array = [];
                    var source = input + "";
                    var part = source.slice(0,GROUP_NUM);
                    while(part !== ""){
                        array.push(part);
                        source = source.substring(GROUP_NUM);
                        part = source.slice(0,GROUP_NUM);
                    }
                    return array.join("-");
                }

            };

            /**
             * global function
             * 如果array为空则添加fullArray中的所有值，否则清空array
             */
            $scope.toggleSelectionAll = function (array, fullArray) {
                if(array.length == fullArray.length){
                    array.splice(0, array.length);
                }else{
                    array.splice(0, array.length);
                    angular.forEach(fullArray, function(value, key) {
                        array.push(value);
                    });
                }
            };


            //-- 模板跳转函数
            $scope.gotoModule = function(module){
                $scope.$currModule = module;
            };

            //-- 退出登陆
            $scope.logout = function() {
                authMenuService.logout().$promise.then(function(resp) {
                    $state.go('login');
                });
            };

            //-- 获取用户信息
            authMenuService.userInfo().$promise.then(function(resp) {
                if(resp.result) {
                    $scope.userInfo = resp.user;
                }else{
                    alert("获取用户信息失败：" + resp.msg);
                }
            });

            //-- 根据menuCode改变当前菜单
            $scope.$changeCurrMenuByCode = function(menuCode){
                if(!$scope.menuLoad){
                    authMenuService.lisAuthModules().$promise.then(function (resp) {
                        $scope.$moduleMenus = resp.models;
                        buildModuleMenus();
//                        $scope.$currModule = $scope.$moduleMenus[0];
                        $scope.menuLoad = true;
                        findCurrModuleAndMenu(menuCode);
                    });
                }
                findCurrModuleAndMenu(menuCode);
            };

            function findCurrModuleAndMenu(menuCode){
                var found = false;

                angular.forEach($scope.$moduleMenus, function(module,index){
                    angular.forEach(module.children, function(menu,index){
                        if(found)return;
                        if(menu.code == menuCode){
                            $scope.$currModule = module;
                            $scope.$currMenu = menu;
                            found = true;
                        }
                    });
                });
            }

            //-- 构造模块菜单
            function buildModuleMenus(){
                if ($globalSetting.isMockEnv) {
                    $scope.$moduleMenus = [
                        {id: '00', name: '首页', code: 'mvo_dashboard', level: 2, icon:''},
                        {id: '01', name: '商品', code: 'mvo_product', level: 2, icon:''},
                        {id: '06', name: '促销', code: 'mvo_promo', level: 2, icon:''},
                        {id: '02', name: '订单', code: 'mvo_order', level: 2, icon:''},
                        {id: '03', name: '售后', code: 'mvo_refund', level: 2, icon:''},
                        {id: '04', name: '物流', code: 'mvo_logistics', level: 2, icon:''},
                        {id: '05', name: '结算', code: 'mvo_finance', level: 2, icon:''},
                        {id: '06', name: '账号', code: 'mvo_account', level: 2, icon:''}
                    ];
                }
                var codeArray = _.pluck($scope.$moduleMenus, "code");
                if(codeArray.indexOf("mvo_help_center") === -1){
                    $scope.$moduleMenus.push({id: '10', name: '帮助中心', code: 'mvo_help_center', level: 2, icon:''});
                }

                angular.forEach($scope.$moduleMenus, function(menu, index){
                    if(menu.code === 'mvo_dashboard'){
                        menu.children = [
                            {url:'/main/welcome' ,id: null, name: '欢迎', code: 'mvo_dashboard_welcome', level: 3, icon:'glyphicon glyphicon-home'}
                        ];

                    }else if(menu.code === 'mvo_product'){
                        menu.children = [
                            {url:'/main/products' ,id: null, name: '商品列表', code: 'mvo_product_list', level: 3, icon:'fa fa-lightbulb-o'},
                            {url:'/main/chooseCatBrand' ,id: null, name: '添加商品', code: 'mvo_product_add', level: 3, icon:'glyphicon glyphicon-plus'},
                            {url:'/main/consults' ,id: null, name: '商品咨询', code: 'mvo_consult_list', level: 3, icon:'fa fa-question'}
//                            {url:'/main/productRecycleBin' ,id: null, name: '回收站', code: 'mvo_product_recycleBin', level: 3, icon:'fa fa-bar-chart-o fa-fw'}
                        ];

                    }else if(menu.code === 'mvo_promo'){
                        menu.children = [
                            {url:'/main/promoPrices' ,id: null, name: '促销价列表', code: 'mvo_promo_price_list', level: 3, icon:'fa fa-rmb'},
                            {url:'/main/salesRules' ,id: null, name: '店铺优惠列表', code: 'mvo_promo_sales_rule_list', level: 3, icon:'fa fa-gift'},
							{url:'/main/coupon' ,id: null, name: '优惠劵列表', code: 'mvo_coupon_list', level: 3, icon:'glyphicon glyphicon-credit-card'}
							//{url:'/main/bundling' ,id: null, name: '飞常优惠', code: 'mvo_bundling_list', level: 3, icon:'fa fa-cubes'}
                            //{url:'/main/groupPromoSkus' ,id: null, name: '飞荐不可', code: 'mvo_group_promo_sku_list', level: 3, icon:'fa fa-cubes'}
                        ];

                    }else if(menu.code === 'mvo_order'){
                        menu.children = [
                            {url:'/main/orders' ,id: null, name: '订单列表', code: 'mvo_order_list', level: 3, icon:'glyphicon glyphicon-shopping-cart'},
                            {url:'/main/ordersDeliver', id: null, name:'订单发货', code: 'mvo_order_deliver', level: 3, icon:'glyphicon glyphicon-log-out'},
                            {url:'/main/errTrackingNo' ,id: null, name: '问题运单号', code: 'mvo_order_errTrackingNo_list', level: 3, icon:'glyphicon glyphicon-question-sign'},
                            {url:'/main/pendTrackingNo', id: null, name:'修改运单号', code: 'mvo_order_pendTrackingNo_list', level: 3, icon:'glyphicon glyphicon-pencil'},
                            {url:'/main/trackingNoLog', id: null, name:'运单号修改日志 ', code: 'mvo_order_trackingNoLog_list', level: 3, icon:'glyphicon glyphicon-list-alt'}
                        ];

                    }else if(menu.code === 'mvo_refund'){
                        menu.children = [
                            {url:'/main/refund' ,id: null, name: '售后列表', code: 'mvo_refund_list', level: 3, icon:'glyphicon glyphicon-shopping-cart'}
                        ];

                    }else if(menu.code === 'mvo_logistics'){
                        menu.children = [
                            {url:'/main/logistics' ,id: null, name: '运费模板列表', code: 'mvo_logistics_list', level: 3, icon:'glyphicon glyphicon-th-list'},
                            {url:'/main/createLogistics/' ,id: null, name: '添加运费模板', code: 'mvo_logistics_add', level: 3, icon:'glyphicon glyphicon-plus'},
                            {url:'/main/address' ,id: null, name: '地址列表', code: 'mvo_logistics_address_list', level: 3, icon:'glyphicon glyphicon-globe'},
                            {url:'/main/createAddress' ,id: null, name: '添加地址', code: 'mvo_logistics_address_add', level: 3, icon:'glyphicon glyphicon-plus'}
                        ];

                    }else if(menu.code === 'mvo_finance'){
                        menu.children = [
                            {url:'/main/finance' ,id: null, name: '结算列表', code: 'mvo_finance_list', level: 3, icon:'glyphicon glyphicon-usd'}
                        ];

                    }else if(menu.code === 'mvo_account'){
                        menu.children = [
                            {url:'/main/account/manufacturerInfo' ,id: null, name: '制造商信息', code: 'mvo_account_info', level: 3, icon:'glyphicon glyphicon-user'},
                            {url:'/main/account/brandInfo' ,id: null, name: '品牌信息', code: 'mvo_account_brand_info', level: 3, icon: 'glyphicon glyphicon-picture'},
                            {url:'/main/account/updatePassword' ,id: null, name: '修改密码', code: 'mvo_account_change_password', level: 3, icon:'glyphicon glyphicon-eye-close'}
                        ];

                    }else if(menu.code === 'mvo_help_center'){
                        menu.children = [
                            //{url:'/main/helpCenter/getStarting' ,id: null, name: '商家入驻流程', code: 'mvo_help_center@getStarting', level: 3, icon:''},
                            {url:'/main/helpCenter/faq' ,id: null, name: '常见问题', code: 'mvo_help_center@faq', level: 3, icon:''},
                            {url:'/main/helpCenter/createProduct' ,id: null, name: '商品添加', code: 'mvo_help_center@createProduct', level: 3, icon:''},
                            {url:'/main/helpCenter/promoMgr' ,id: null, name: '促销管理', code: 'mvo_help_center@promoMgr', level: 3, icon:''},
                            {url:'/main/helpCenter/orderMgr' ,id: null, name: '订单管理', code: 'mvo_help_center@orderMgr', level: 3, icon:''},
                            {url:'/main/helpCenter/refund' ,id: null, name: '售后服务', code: 'mvo_help_center@refund', level: 3, icon:''},
                            {url:'/main/helpCenter/pay' ,id: null, name: '支付结算', code: 'mvo_help_center@pay', level: 3, icon:''},
                            {url:'/main/helpCenter/charging' ,id: null, name: '资费标准', code: 'mvo_help_center@charging', level: 3, icon:''}
                        ];

                    }
                });

            }

            //显示搜索栏
            $scope.showSearchBar = function(){
                $scope.$isShowSearchBar = true;
            };
            //隐藏搜索栏
            $scope.hideSearchBar = function(){
                $scope.$isShowSearchBar = false;
            };
            //搜索栏是否显示
            $scope.isSearchBarShow = function(){
                return $scope.$isShowSearchBar;
            };

            //--==========================================初始化==========================================================
            $scope.$changeCurrMenuByCode("NAN");


        }

    ]);
