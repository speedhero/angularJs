/**
 * @name: 结算列表控制器
 * @description:
 * @author: Allen
 * @create : 2014/9/29.
 */

angular.module('flymvo.finance.financeListCtrl', [])
    .controller('financeListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting', 
        'financeService',
        'ngTableParams',
        function ($scope, $filter, $timeout, $globalSetting, financeService, ngTableParams) {
            
            $scope.$changeCurrMenuByCode('mvo_finance_list');

            //-- =======================================变量==========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            $scope.list = [];
            $scope.templates = {
                //佣金结算
                commissionTable: '/html/finance/commissionListTable.html?tag=' + $globalSetting.version,
                //出厂价结算
                factoryPriceTable:'/html/finance/factoryPriceListTable.html?tag=' + $globalSetting.version
            };
            //当前标签项
            $scope.currentTab = 1;
            //当前默认列表
            $scope.listTemplates = $scope.templates.commissionTable;



            //-- =======================================函数===========================================

            $scope.commissionFinance = function(){
                $scope.currentTab = 1;
                $scope.listTemplates = $scope.templates.commissionTable;
                $scope.loadCommission();
            };
            $scope.factoryPriceFinance = function(){
                $scope.currentTab = 2;
                $scope.listTemplates = $scope.templates.factoryPriceTable;
                $scope.loadFactoryPrice();
            };
            //加载佣金结算
            $scope.loadCommission = function(){
                $scope.commissionTableParams = new ngTableParams({
                    page: 1,
                    count: 20
                }, {
                    counts: [10,20,50] ,
                    total:  0,//$scope.list.length,
                    $scope: $scope ,
                    getData: function($defer , params){
                        financeService.commissionList().$promise.then(function (resp){
                            $scope.list = resp.models;
                            params.total($scope.list.length);
                            var Data = $scope.list;
                            $defer.resolve(Data.slice((params.page() - 1) * params.count() , params.page() * params.count()));

                            $scope.$loaded = true;
                        });
                    }
                });
            };

            //加载出厂价
            $scope.loadFactoryPrice = function(){
                $scope.factoryPriceTableParams = new ngTableParams({
                    page: 1,
                    count: 20
                }, {
                    counts: [10,20,50] ,
                    total:  0,//$scope.list.length,
                    $scope: $scope ,
                    getData: function($defer , params){
                        financeService.listFinance().$promise.then(function (resp){
                            $scope.list = resp.models;
                            params.total($scope.list.length);
                            var Data = $scope.list;
                            $defer.resolve(Data.slice((params.page() - 1) * params.count() , params.page() * params.count()));

                        });
                    }
                });
            };


            //--  查询函数
            //-- =======================================初始化===========================================
            //-- 设置菜单

            $scope.loadFactoryPrice();

            $scope.loadCommission();

        }

    ]);
