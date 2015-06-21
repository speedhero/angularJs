/**
 * @name: 店铺优惠创建/修改控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/20.
 */
angular.module('flymvo.promo.salesRuleUpsertCtrl', [])
    .controller('salesRuleUpsertCtrl', [
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
            //阶梯满减最大阶梯数
            $scope._maxMinusStep = 3;
            //-- =======================================变量===========================================

            //当前核心模型（创建时候）
            $scope.model ={
                //活动名称
                title : "",
                //活动描述
                description : "",
                //开始时间日期
                startTimeDate : "",
                //开始时间小时
                startTimeHour : "00:00:00",
                //结束日期日期
                endTimeDate : "",
                //结束日期小时
                endTimeHour : "00:00:00",
                //优惠范围类型, 1= 全店, 2=特定商品
                rangeType: 1,
                //特定商品id列表
                skuList : [],
                //特定商品（用于标识那些无法保存的货品）
                needDeleteSkus : [],
//                needDeleteSkus : [
//                    {"price":100.08 ,"model":"MT71776","skuCode":"TB8914646238","productId":49204,"id":9925,"image":"http://dummyimage.com/100x100/17cf2d&text=Shirley","productName":"飞飞商品 of Sharon Dorothy Clark"},
//                    {"price":120.08 ,"model":"MT76537","skuCode":"TB3312141443","productId":35330,"id":85168,"image":"http://dummyimage.com/100x100/8ca09c&text=Thomas","productName":"飞飞商品 of Donald Sandra Rodriguez"},
//                    {"price":150.08 ,"model":"MT37683","skuCode":"TB5613464872","productId":41501,"id":43970,"image":"http://dummyimage.com/100x100/a168ad&text=Laura","productName":"飞飞商品 of Ronald Scott Anderson"}
//                ],
                //优惠条件，买满多少元
                minPrice : "",
                //是否“上不封顶”,1=上不封顶；0=阶梯规则
                noCap : null,
                //优惠内容类型, minus=满减, gift=满赠
                type : "minus",
                //优惠金额
                discountAmount : "",
                //阶梯满减规则
                minusSteps : [{}],
//                minusSteps : [
//                    {minPrice : 100, discountAmount:10},
//                    {minPrice : 200, discountAmount:30},
//                    {minPrice : 500, discountAmount:100}
//                ],
                //送赠品id列表
                giftList : []
            };


            //-- =======================================函数===========================================
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

            //-- 获得店铺优惠
            $scope.retrieveSalesRule = function(){
                promoService.getSalesRule({id:$scope.$currSalesRuleId}).$promise.then(function (resp) {
                    var data = resp.model;
                    var startTimeArray =  data.startTime.split(" ");
                    var endTimeArray =  data.endTime.split(" ");
                    $scope.model = angular.copy(data);
                    $scope.model.startTimeDate = startTimeArray[0];
                    $scope.model.startTimeHour = startTimeArray[1];
                    $scope.model.endTimeDate = endTimeArray[0];
                    $scope.model.endTimeHour = endTimeArray[1];
                    //要注意通过货品选择器获取商品和赠品列表后回传到model
                    var skuIds = "";
                    var giftIds = "";
                    if($scope.model.rangeType+"" === "2"){
                        $scope.model.skuList = data.skuList;
                        skuIds = data.skuList.join(",");
                    }else{
                        $scope.model.skuList = [];
                    }
                    if($scope.model.type === 'gift'){
                        $scope.model.giftList = data.giftList;
                        giftIds = data.giftList.join(",");
                    }else{
                        $scope.model.giftList = [];
                    }

                    //start:将条件价格与优惠价格全部从浮点数变成整数
                    if($scope.model.minPrice){
                        $scope.model.minPrice = Math.floor($scope.model.minPrice);
                    }
                    if($scope.model.discountAmount){
                        $scope.model.discountAmount = Math.floor($scope.model.discountAmount);
                    }
                    if($scope.model.minusSteps){
                        angular.forEach($scope.model.minusSteps,function(step, index){
                            step.minPrice = Math.floor(step.minPrice);
                            step.discountAmount = Math.floor(step.discountAmount);
                        });
                    }
                    //end:将条件价格与优惠价格全部从浮点数变成整数

                    //多个货品选择器
                    $scope.skuSelector = skuSelector({
                        maxNum : 100,
                        multi: true,
                        onSelect: 'selectMultiSkus',
                        skuIds: skuIds,
                        onInitLoaded: 'selectMultiSkus'
                    }, $scope);

                    //多个赠品选择器
                    $scope.giftSelector = skuSelector({
                        maxNum : 3,
                        multi: true,
                        onSelect: 'selectMultiGifts',
                        skuIds: giftIds,
                        onInitLoaded: 'selectMultiGifts'
                    }, $scope);
                });
            };

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

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };

            //打开赠品选择器
            $scope.openGiftSelector = function(){
                $scope.giftSelector.open();
            };

            //货品选择器确认：原理：需要同步已存在的列表成为用户选择的列表
            $scope.selectMultiSkus = function(skus){
                $scope.model.skuList = _.pluck(skus,'id');

                //如果needDeleteSkus有数据，需要同步
                var newArray = [];
                if($scope.model.needDeleteSkus && $scope.model.needDeleteSkus.length > 0){
                    angular.forEach($scope.model.needDeleteSkus, function(item, index){
                        if($scope.model.skuList.indexOf(item.id) != -1){
                            newArray.push(item);
                        }
                    });
                    $scope.model.needDeleteSkus = newArray;
                }
            };


            //-- 删除SKU
            $scope.deleteSku = function (sku, skuIndex) {
                //同步到选择器
                $scope.skuSelector.removeSingleSkuByExternal(sku);
                //更新选择的id列表
                $scope.model.skuList = _.pluck($scope.skuSelector.getSkus(),'id');
                //在已有列表中删除
                $scope.model.needDeleteSkus.splice(skuIndex, 1);
            };

            //赠品选择器确认：原理：需要同步已存在的列表成为用户选择的列表
            $scope.selectMultiGifts = function(gifts){
                $scope.model.giftList = _.pluck(gifts,'id');
            };

            //-- 选择优惠类型
            $scope.selectKind = function(kind){
                if(kind === 1){
                    $scope.model.type = "gift";
                    $scope.model.noCap = null;
                }else if(kind === 2){
                    $scope.model.type = "minus";
                    $scope.model.noCap = 1;
                }else if(kind === 3){
                    $scope.model.type = "minus";
                    $scope.model.noCap = 0;
                }
            };

            //-- 是否满赠
            $scope.isKindOfGift = function(){
                return $scope.model.type === "gift";
            };

            //-- 是否不封顶满减
            $scope.isKindOfNoCapMinus = function(){
                return $scope.model.type === "minus" && $scope.model.noCap === 1;
            };

            //-- 是否阶梯满减
            $scope.isKindOfStepMinus = function(){
                return $scope.model.type === "minus" && $scope.model.noCap === 0;
            };

            //增加满减阶梯
            $scope.addNoCapMinusStep = function(){
                $scope.model.minusSteps.push({});
            };


            //减少满减阶梯
            $scope.removeNoCapMinusStep = function(index){
                $scope.model.minusSteps.splice(index,1);
            };

            //是否能增加满减阶梯
            $scope.canAddNoCapMinusStep = function(last){
                return last && ($scope.model.minusSteps.length < $scope._maxMinusStep);
            };

            //是否能减少满减阶梯
            $scope.canRemoveNoCapMinusStep = function(){
                return $scope.model.minusSteps.length > 1;
            };



            //-- event:提交Form
            $scope.submit = function () {

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#salesRuleForm :input.ng-invalid');
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


                //2. 检查失效时间
                var endTime = $scope.model.endTimeDate + " " + $scope.model.endTimeHour;
                var startTime = $scope.model.startTimeDate + " " + $scope.model.startTimeHour;
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

                //3. 检查生效时间
                var now = moment(new Date()).format(datetimeFormat);
                if (now >= startTime) {
                    console.log('fail to validate end time');
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

                //4. 检查商品数量
                if ($scope.model.rangeType+"" === "2" && $scope.model.skuList.length <= 0) {
                    console.log('fail to validate sku length');
                    $('#selectSkusBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择一个商品。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#selectSkusBtn').popover('show');
                    $('#selectSkusBtn').focus();
                    return;
                }

                //5. 检查赠品数量
                if ($scope.model.type == 'gift' && $scope.model.giftList.length <= 0) {
                    console.log('fail to validate sku length');
                    $('#selectGiftsBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择一个赠品。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#selectGiftsBtn').popover('show');
                    $('#selectGiftsBtn').focus();
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                //--start: 构造提交数据
                var postJson = {
                    startTime : startTime,
                    endTime : endTime,
                    title : $scope.model.title,
                    description : $scope.model.description,
                    minPrice : $scope.model.minPrice,
                    rangeType : $scope.model.rangeType,
                    type : $scope.model.type
                };
                if($scope.model.id) {
                    postJson.id = $scope.model.id;
                }
                if(postJson.rangeType+"" === "2"){
                    postJson.skuList= $scope.model.skuList;
                }
                if(postJson.type === 'gift'){
                    postJson.giftList= $scope.model.giftList;
                }else{
                    if($scope.model.noCap === 1){
                        postJson.discountAmount= $scope.model.discountAmount;
                    }else{
                        postJson.minusSteps= $scope.model.minusSteps;
                    }
                    postJson.noCap = $scope.model.noCap;
                }
                //--end: 构造提交数据

                promoService.upsertSalesRule(angular.toJson(postJson)).$promise.then(function (resp) {

                    if (resp.success) {
                        if($scope.$currSalesRuleId){
                            //编辑成功
                            $scope.backToList();
                        }else{
                            //创建成功
                            $state.go('main.salesRules', $stateParams);
                        }
                    } else {
                        handleErrorResponse(resp);
                    }

                    $('#submitBtn').button('reset');

                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });

            };


            //处理提交失败的请求
            function handleErrorResponse(resp){
                var needDeleteSkuIds = resp.models;
                if(needDeleteSkuIds && needDeleteSkuIds.length > 0){
                    var selectedSkus = $scope.skuSelector.getSkus();
                    var productNames = [];
                    $scope.model.needDeleteSkus = [];
                    angular.forEach(needDeleteSkuIds, function(item, idx){
                        angular.forEach(selectedSkus, function(sku, skuIndex){
                            if(sku.id == item.skuId){
                                $scope.model.needDeleteSkus.push(sku);
                                productNames.push(sku.productName);
                            }
                        });
                    });
                    var message = "以下商品已参与其他促销规则，请检查商品表格中的提示进行确认删除:\n";
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
                        skuIds.push({skuId :item});
                    });
                    resp.success = false;
                    resp.models = skuIds;
                }
            }


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_sales_rule_list');


            if(angular.isDefined($stateParams.salesRuleId) && $stateParams.salesRuleId!==null){
                //获取id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currSalesRuleId = $stateParams.salesRuleId;
            }
            if(angular.isDefined($stateParams.rangeType) && $stateParams.rangeType!==null){
                //获取rangeType，如果直接从URL中过来，则从urlpath中获得, 1= 全店，2=特定商品
                $scope.$currSalesRuleRangeType = $stateParams.rangeType;
            }

            if($scope.$currSalesRuleId) {
                //---------编辑-------
                $scope.retrieveSalesRule();

            }else{
                //---------创建-------

                //初始化优惠类型
                $scope.selectKind(1);
                //多个货品选择器
                $scope.skuSelector = skuSelector({
                    maxNum : 100,
                    multi: true,
                    onSelect: 'selectMultiSkus'
                }, $scope);

                //多个赠品选择器
                $scope.giftSelector = skuSelector({
                    maxNum : 3,
                    multi: true,
                    onSelect: 'selectMultiGifts'
                }, $scope);
            }

            if($scope.$currSalesRuleRangeType){
                $scope.model.rangeType = $stateParams.rangeType;
            }


        }
    ]);
