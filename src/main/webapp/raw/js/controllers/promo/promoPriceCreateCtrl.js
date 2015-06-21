/**
 * @name: 促销价创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/18.
 */

angular.module('flymvo.promo.promoPriceCreateCtrl', [])
    .controller('promoPriceCreateCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'hourOptions',
        'promoConstants',
        'promoService',
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, promoService, skuSelector) {

            //-- =======================================常量===========================================

            //日期格式
            var dateFormat = "YYYY-MM-DD";
            var datetimeFormat = "YYYY-MM-DD HH:mm:ss";

            $scope._hourOptions = hourOptions;
            //-- =======================================变量===========================================

            //当前核心模型
            $scope.model ={
                //开始时间日期
                startTimeDate : "",
                //开始时间小时
                startTimeHour : "00:00:00",
                //结束日期日期
                endTimeDate : "",
                //结束日期小时
                endTimeHour : "00:00:00",
                //已选择的货品列表
                skuList :[]
//                skuList :[
//                    {"price":100.08 ,"model":"MT71776","skuCode":"TB8914646238","productId":49204,"id":9925,"image":"http://dummyimage.com/100x100/17cf2d&text=Shirley","productName":"飞飞商品 of Sharon Dorothy Clark"},
//                    {"price":120.08 ,"model":"MT76537","skuCode":"TB3312141443","productId":35330,"id":85168,"image":"http://dummyimage.com/100x100/8ca09c&text=Thomas","productName":"飞飞商品 of Donald Sandra Rodriguez"},
//                    {"price":150.08 ,"model":"MT37683","skuCode":"TB5613464872","productId":41501,"id":43970,"image":"http://dummyimage.com/100x100/a168ad&text=Laura","productName":"飞飞商品 of Ronald Scott Anderson"}
//                ]
            };


            //-- =======================================函数===========================================
            //-- 将促销开始时间变为规定格式
            $scope.$watch("model.startTimeDate", function () {
                if($scope.model.startTimeDate){
                    $scope.model.startTimeDate = moment($scope.model.startTimeDate).format(dateFormat);
                }
            });

            //-- 将促销结束时间变为规定格式
            $scope.$watch("model.endTimeDate", function () {
                if($scope.model.endTimeDate){
                    $scope.model.endTimeDate = moment($scope.model.endTimeDate).format(dateFormat);
                }
            });

            //获得sku图片路径
            $scope.getProdImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_100_100_90" +image.substring(index);
                    }
                }
                return result;
            };

            //-- 删除SKU
            $scope.deleteSku = function (skuIndex) {
                //同步到选择器
                $scope.skuSelector.removeSingleSkuByExternal($scope.model.skuList[skuIndex]);
                //在已有列表中删除
                $scope.model.skuList.splice(skuIndex, 1);
            };

            //-- 此sku是否已删除
            $scope.isHasDelete = function (skuIndex) {
                if($scope.model.skuList[skuIndex].isDelete){
                    return true;
                }
                return false;
            };

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };


            //找到目标sku所在的顺序值
            $scope.indexOfSku = function(list, sku){
                var index = -1;
                angular.forEach(list, function(item, itemIndex){
                    if(index == -1){
                        if(item.id == sku.id){
                            index = itemIndex;
                        }
                    }
                });
                return index;
            };

            //是否包含目标sku
            $scope.isContainSku = function(list, sku){
                return $scope.indexOfSku(list, sku) != -1;
            };

            //货品选择器确认：原理：需要同步已存在的列表成为用户选择的列表
            $scope.selectMultiSkus = function(skus){
                var result = [];
                //记录idx
                var idxList = [];
                //1. 移除不存在的
                if($scope.model.skuList.length > 0){
                    angular.forEach($scope.model.skuList, function(item, index){
                        var idx = $scope.indexOfSku(skus, item);
                        if(idx !== -1){
                            //已存在
                            result.push(item);
                            idxList.push(idx);
                        }
                    });
                }

                //2. 添加新的
                angular.forEach(skus, function(item, index){
                    if(idxList.indexOf(index) === -1){
                        //找不到
                        result.push(item);
                    }
                });

                $scope.model.skuList = result;

            };


            //-- event:提交Form
            $scope.create = function () {
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#createForm :input.ng-invalid');
                var flag = true;
                if (fields.length > 0) {
                    fields.each(function (index, value) {
                        if (!flag)return;
                        if ($(this).parents(".ng-hide").length === 0) {
                            //找到非隐藏状态的input
                            $(this).focus();
                            console.log('fail to validate ' + $(this).attr("name"));
                            flag = false;
                        }
                    });

                }

                if (!flag) {
                    console.log('validate form, fail!!!');
                    return;
                }

                function _destoryPopover() {
                    $(this).popover('destroy');
                }


                var now = moment(new Date()).format(datetimeFormat);
                var endTime = $scope.model.endTimeDate + " " + $scope.model.endTimeHour;
                var startTime = $scope.model.startTimeDate + " " + $scope.model.startTimeHour;

                //2. 检查生效时间
                if (now >= startTime) {
                    console.log('fail to validate start time');
                    $('#startTimeDate').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,生效时间必须大于当前时间哦。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#startTimeDate').popover('show');
                    $('#startTimeDate').focus();
                    return;
                }

                //3. 检查失效时间
                if (endTime <= startTime) {
                    console.log('fail to validate end time');
                    $('#endTimeDate').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,失效时间必须大于生效时间哦。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#endTimeDate').popover('show');
                    $('#endTimeDate').focus();
                    return;
                }

                //4. 检查商品数量
                if ($scope.model.skuList.length <= 0) {
                    console.log('fail to validate sku length');
                    $('#selectSkusBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请选择调价商品。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#selectSkusBtn').popover('show');
                    $('#selectSkusBtn').focus();
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                var postJson = {
                    endTime : endTime,
                    startTime : startTime,
                    //直降
                    promotionalType : 1,
                    items :[]
                };
                angular.forEach($scope.model.skuList, function(sku, index){
                    postJson.items.push({
                        skuCode : sku.skuCode,
                        skuId : sku.id,
                        promotionalPrice : sku.promotionalPrice
                    });
                });

                promoService.addPromoPrices(angular.toJson(postJson)).$promise.then(function (resp) {
                    //mockErrorResponse(resp);
                    if (resp.success) {
                        $state.go('main.promoPrices', $stateParams);
                    } else {
                        handleErrorResponse(resp);
                        $('#submitBtn').button('reset');
                    }
                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });

            };


            /**
             * 此货品是否需要删除
             * @param $index
             * @returns {boolean}
             */
            $scope.needDetele = function($index){
                if($scope.model.skuList[$index].needDetele){
                    return true;
                }
                return false;
            };

            //处理提交失败的请求
            function handleErrorResponse(resp){
                var needDeleteSkus = resp.models;
                if(needDeleteSkus && needDeleteSkus.length >0){
                    var productNames = [];
                    angular.forEach(needDeleteSkus, function(item, idx){
                        angular.forEach($scope.model.skuList, function(sku, skuIndex){
                            if(sku.id == item.skuId){
                                sku.needDetele = true;
                                productNames.push(sku.productName);
                            }
                        });
                    });
                    var message = "以下商品已存在有效的促销价，无法再录入新的促销价，请检查商品表格中的提示进行确认删除:\n";
                    message += productNames.join("\n");
                    $window.alert(message);
                }else{
                    $window.alert(resp.message);
                }

            }

            //模拟业务请求失败
            function mockErrorResponse(resp){
                if ($globalSetting.isMockEnv){
                    var skuIds = [];
                    //随机抽取2条失败的
                    var randomList = _.sample($scope.model.skuList, 2);
                    angular.forEach(randomList,function(item){
                        skuIds.push({skuId :item.id});
                    });
                    resp.success = false;
                    resp.models = skuIds;
                }
            }

            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_price_list');

            //多个货品选择器
            $scope.skuSelector = skuSelector({
                maxNum : 50,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);


        }
    ]);
