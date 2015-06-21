/**
 * @description: ProvincesSelection directives
 * @author: max.orange
 **/

angular.module('flymvo.provinces.directives', [])
    .directive('provinces', [
        'ngPopover',
        function (ngPopover) {
            return {
                restrict: 'A',
                scope: {
                    provinces: '=',
                    regions: '=',
                    selectedprovinces: '='
                },
                link: function (scope, element, attrs) {

                    //已选择
                    scope.selectedArr = [];
                    //不可选择
                    scope.disabledArr = [];
                    var setDisabledArr = function () {
                        _.each(scope.regions, function (item, index) {
                            _.each(item.provinces, function (item, index) {
                                if (scope.selectedArr.indexOf(item) < 0) {
                                    scope.disabledArr.push(item);
                                }
                            });
                        });
                    };
                    //选择省份toggle
                    scope.checkToggle = function (regionId) {
                        var index = scope.selectedArr.indexOf(regionId);
                        if (index >= 0) {
                            scope.selectedArr.splice(index, 1);
                        } else {
                            scope.selectedArr.push(regionId);
                        }
                    };

                    //确定选项
                    scope.submitProvince = function () {
                        scope.selectedprovinces = angular.copy(scope.selectedArr);
                        scope.popoverClose();
                    };


                    //点击按钮弹出popover
                    element.on('click', function (event) {
                        scope.selectedArr = angular.copy(scope.selectedprovinces);
                        setDisabledArr();
                        ngPopover.open(
                            $(this),
                            scope,  //scope
                            {  //options
                                template: '/html/template/provinces.html',
                                placement: 'top'
                            }
                        );
                    });

                    scope.popoverClose = function () {
                        ngPopover.close();
                    };

                }
            };
        }]);

