angular.module('flymvo.coupon.addCouponCtrl',[])
    .controller('addCouponCtrl',[
    	'$scope',
    	'$filter',
    	'$stateParams',
    	'$globalSetting', 
    	'$rootScope', 
    	'$state', 
        'couponService',
    	function ($scope,$filter,$stateParams,$globalSetting, $rootScope,$state ,couponService){
    		"use strict";

    		//==============================================变量===================================================
    		 
            $scope.hasCommit = false;
            $scope.hasAmount = true; 
            $scope.couponDetail = { 
             };
 
            //日期格式
            var datetimeFormat = "YYYY-MM-DD";
 
    		//==============================================函数===================================================
             
             
            var _destoryPopover = function(){
                $(this).popover('destory');
            };  
             
            //保存
            $scope.saveOrUpdate = function(couponDetail,isValid){  
                
                $scope.hasCommit = true; 
                var couponId = $scope.$couponId;  
                var dateEnd = couponDetail.date_end; 
                var dateStart = couponDetail.date_start;
                var now = moment(new Date()).format(datetimeFormat);   
                var discountAmount = couponDetail.discount_amount;   
                var limitNum = couponDetail.limit_num;
                var minBuyAmount = couponDetail.min_buy_amount;
                var name = couponDetail.name;   
                if(!couponDetail.min_buy_amount){
                    minBuyAmount = 0;
                //    $("input[name=condition][value=0]").attr("checked",true);
                //}else{
                //    $("input[name=condition][value=1]").attr("checked",true);
                }  


                //验证时间
                if(dateStart < now){
                    $('#date_start').popover({
                        container: 'body', 
                        placement: 'top',
                        content: '亲，生效时间必须大于或等于当前时间',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover); 
                    $('#date_start').popover('show');
                    $('#date_start').focus();
                    return;
                }
                if(dateEnd < dateStart){
                    $('#date_end').popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲，失效时间必须大于生效时间',
                        trigger:'focus'
                    }).on('hidden.bs.popover', _destoryPopover); 

                    $('#date_end').popover('show');  
                    $('#date_end').focus();
                    return;
                }     
                $('#submitBtn').button('reset'); 

                 if (isValid ) {   
                        couponService.saveOrUpdate(
                            {
                                "dateEnd": dateEnd,
                                "dateStart": dateStart,
                                "discountAmount": discountAmount,
                                "limitNum": limitNum,
                                "minBuyAmount": minBuyAmount, 
                                "name": name,
                                "isBrand": 1,
                                "isCategory": 0,
                                "isProduct": 0,
                                "status": 1
                            }
                        ).$promise.then(function(resp){
                            if(resp.success === true){
                                alert("操作成功");
                                $scope.$couponId = resp.model;
                                $scope.hasCommit = false;
                                $scope.enableEditInfo = false;
                                var couponId = $scope.$couponId; 
                                $scope.backToList();

                            }else{
                                alert("操作失败");
                                $scope.hasCommit = false;
                            }
                        }); 
                        
                } else { 
                   
                }   
            };

            $scope.updateBackToList = function(){  
                $scope.backToList();
                $scope.hasCommit = false; 
            };

            //时间转换  
            $scope.$watch("couponDetail.date_start", function () {  
                if ($scope.couponDetail.date_start) {  
                    $scope.couponDetail.date_start = moment($scope.couponDetail.date_start).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("couponDetail.date_end", function () {
                if ($scope.couponDetail.date_end) {
                    $scope.couponDetail.date_end = moment($scope.couponDetail.date_end).format("YYYY-MM-DD");
                }
            }); 

            //使用条件切换参数
            $scope.minAmountChange = function(status){ 

                if(status === 0){ 
                    $('#minBuyAmount').val("0");
                    //$('#minAmount').removeClass("has-error");
                    $scope.hasAmount = false; 
                    $('#minBuyAmount').attr("disabled",true);
                    $('#amountAlert').hide();
                    $scope.couponDetail.min_buy_amount = 0;
                }else{   
                    $scope.hasAmount = true;
                    $('#minBuyAmount').attr("disabled",false);
                    //$('#minAmount').addClass("has-error"); 
                    //$scope.couponDetailForm.min_buy_amount.$error = true;
                    $('#amountAlert').show();  
                }
            };


    		//==============================================初始化=================================================

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");
    	}
]);