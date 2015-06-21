/**
 * @name: 帮助中心控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.helpCenter.helpCenterCtrl', [])
    .controller('helpCenterCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        '$location',
        '$anchorScroll',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting, $location, $anchorScroll) {
            //-- =======================================常量===========================================

            //-- =======================================变量===========================================
            //具体条目编号
            $scope.item = null;

            //-- html模板
            $scope.templates = {
            };
            //-- =======================================函数===========================================
            //回到顶部
            $scope.gotoTop = function() {
                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash('wrapper');
                // call $anchorScroll()
                $anchorScroll();
            };

            //绑定scroll事件 显隐回到顶部按钮
            angular.element($window).bind("scroll", function() {
                if (this.document.body.scrollTop + this.document.documentElement.scrollTop > 0) {
                    $('.helpCenter .sideBar').show();
                }
                else {
                    $('.helpCenter .sideBar').hide();
                }

            });
            //-- =======================================初始化===========================================

            if(angular.isDefined($stateParams.item) && $stateParams.item!==null){
                $scope.item = $stateParams.item;

                //-- 设置菜单
                $scope.$changeCurrMenuByCode('mvo_help_center@'+$scope.item);
                //-- 具体html页面
                $scope.templates.detail = '/html/help-center/item/' + $scope.item + '.html?tag='+$globalSetting.version;
            }



        }
    ]);
