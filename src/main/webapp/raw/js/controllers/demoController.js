/**
 * @name: Demo控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */


angular.module('flymvo.demo.controller', ['angularFileUpload'])
    .controller('demoCtrl', [
        '$scope',
        '$filter',
        'ngTableParams',
        '$globalSetting',
        'hotkeys',
        '$upload',
        function ($scope, $filter, TableParams, $globalSetting, hotkeys, $upload) {
            'use strict';
            //-- 激活菜单栏
            $scope.$emit('activeMenu', 'orders');

            //-- 定义模板
            $scope.templates = {
                //订单列表-
                "list" : '/partials/order/list.html?tag='+$globalSetting.version,
                //订单查询
                "query" : '/partials/order/query.html?tag='+$globalSetting.version,
                //订单明细
                "detail" : '/partials/order/detail.html?tag='+$globalSetting.version,
                //订单明细--基本信息
                "detailBasicInfo" : '/partials/order/detail/basicInfo.html?tag='+$globalSetting.version,
                //订单明细--详细信息
                "detailFullInfo" : '/partials/order/detail/fullInfo.html?tag='+$globalSetting.version,
                //订单明细--支付信息
                "detailPayInfo" : '/partials/order/detail/payInfo.html?tag='+$globalSetting.version,
                //订单明细--配送信息
                "detailShipmentInfo" : '/partials/order/detail/shipmentInfo.html?tag='+$globalSetting.version,
                //订单明细--商品评论
                "detailComments" : '/partials/order/detail/comments.html?tag='+$globalSetting.version,
                //订单明细--概要
                "detailSummary" : '/partials/order/detail/summary.html?tag='+$globalSetting.version
            };

            //-- 查询条件常量
            $scope.orderConstants = orderConstants;

            //-- 查询条件模型
            $scope.searchCriteria = {
                //订单编号,多个用逗号分隔
                "number" : "",
                //SKU编号
                "skuNumber" : "",
                //SKU名称
                "skuName" : "",
                //收货人姓名
                "receiverName" : "",
                //收货人电话
                "receiverTel" : "",
                //客户账户名
                "acountName" : "",
                //订单查询状态
                "orderStatus" : "",
                //销售渠道
                "channelId" : "",
                //监控状态
                "healthMonitor" : "",
                //支付状态
                "paymentStatus" : "",
                //创建时间开始
                "createTimeBegin" : "",
                //创建时间结束
                "createTimeEnd" : "",
                //厂家sfaId
                "sfaId" : ""
            };
            //用于记录下用户点击查询按钮时候的查询条件
            $scope.searchCriteriaSaved = angular.copy($scope.searchCriteria);

            //获取用户权限内的销售渠道
            (function() {
              OrderResource.getChannel().$promise.then(function (resp) {
                $scope.channelIds = {};
                for (var i in resp.model) {
                  $scope.channelIds[resp.model[i]] = orderConstants.channels[resp.model[i]];
                }
              });
            })();

            

            //触发查询
            $scope.triggerSearch = function(){
                //用于记录下此时间点的查询条件
                $scope.searchCriteriaSaved = angular.copy($scope.searchCriteria);
            };

            //重置查询条件
            $scope.resetSearch = function(){
                //用于记录下此时间点的查询条件
                for(var key in $scope.searchCriteria){
                    $scope.searchCriteria[key] = "";
                }
            };

            //详细页是否最大化窗口
            $scope.isDetailPanelMax = false;

            //切换详细页最大化最大化窗口
            $scope.toggleDetailPanelMax = function(){
                $scope.isDetailPanelMax = ! $scope.isDetailPanelMax;
            };

            //查询订单函数
            $scope.orderTableParams = new TableParams({
                page: 1,
                count: 20
            }, {
                counts: [ 20, 50, 100],
                total: 0,
                getData: function ($defer, params) {
                    //获得订单列表
                    //暂时不做服务器多页排序
                   /* if(params.sorting()){
                        var orderBy = "";
                        var orderByArray = params.orderBy();
                        for(var index in orderByArray){
                            var item = orderByArray[index];
                            orderBy += item.substr(1,item.length) + " " + (item[0] == "+"?"asc": "desc");
                        }
                        $scope.searchCriteria.orderBy = orderBy;
                    }*/
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.searchCriteriaSaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();
                    if(postData.createTimeBegin){
                        postData.createTimeBegin = moment(postData.createTimeBegin).format('YYYY-MM-DD') + " 00:00:00";
                    }
                    if(postData.createTimeEnd){
                        postData.createTimeEnd = moment(postData.createTimeEnd).format('YYYY-MM-DD') + " 23:59:59";
                    }
                    //=========构造查询条件 end =========

                    OrderResource.query(postData).$promise.then(function (resp) {
                        params.total(resp.query.totalRecord);

                        $scope.orderList = resp.models;
                        var orderedData = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')($scope.orderList, params.orderBy()) : $scope.orderList;

                        if($globalSetting.isMockEnv) {

                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }else{
                            $defer.resolve(orderedData);
                        }
                    });


                }
            });


            //获得订单信息函数
            $scope.showDetail = function (orderId) {

                $scope.isDetailPanelMax = true;
                $scope.currOrder = null;
                $scope.currOrderId = orderId;
                $scope.currencySymbol = null;
                $scope.shipments = null;
                $scope.payments = null;
                $scope.comments = null;
                $scope.isLocked = false;
                $scope.isSuspended = false;
                $scope.enableEdit = false;

                //获得订单主要信息
                OrderResource.get({id: orderId}).$promise.then(function (resp) {
                    $scope.currOrder = resp.model;
                    $scope.isLocked = ($scope.currOrder.involveType=='0') ? false : true;
                    $scope.isSuspended = ($scope.currOrder.involveType=='1') ? true : false;

                    $scope.currencySymbol = orderConstants.currencies[$scope.currOrder.currencyId];
                });

                //获得订单发货信息
                OrderResource.getShipment({id: orderId}).$promise.then(function (resp) {
                    $scope.shipments = resp.models;

                    for(var i in $scope.shipments){
                        $scope.shipments[i].collapse = '+';
                    }
                    $scope.shipments[0].collapse='-';
                });
                //获得订单支付信息
                OrderResource.getPayment({id: orderId}).$promise.then(function (resp) {
                    $scope.payments = resp.models;

                });
                //获得订单评论信息
                OrderResource.getComment({id: orderId}).$promise.then(function (resp) {
                    $scope.comments = resp.models;
                });
                
            };


            //编辑订单
            $scope.enableEdit = false;
            $scope.editOrder = function () {
              var orderId = $scope.currOrderId;
              OrderResource.edit({id: orderId}).$promise.then(function (resp) {
                $scope.currOrder.involveBy = resp.model.involveBy;
                $scope.currOrder.involveType = resp.model.involveType;
                $scope.isLocked = ($scope.currOrder.involveType=='0') ? false : true;
                if (resp.success) {
                  $scope.shipments = resp.models;
                  $scope.enableEdit = true;
                  console.log($scope.currOrder);
                } else {
                  if($scope.isLocked) {
                    alert("订单已被" + $scope.currOrder.involveBy +"锁住，你无法编辑");
                  } else {
                    alert(resp.message);
                  }
                }
              });
            };
            //解锁订单
            $scope.unlockOrder = function () {
              var orderId = $scope.currOrderId;
              OrderResource.unlock({id: orderId}).$promise.then(function (resp) {
                if (resp.success) {
                  $scope.isLocked = false;
                  $scope.enableEdit = false;
                  $scope.currOrder.involveBy = "";
                  $scope.currOrder.involveType = "0";

                  console.log(resp);
                } else {
                  alert(resp.message);
                }
              });
            };
            //处理订单
            $scope.handleOrder = function () {
              var orderId = $scope.currOrderId;
              OrderResource.handle({id: orderId}).$promise.then(function (resp) {
                if (resp.success) {
                  $scope.isLocked = false;
                  $scope.enableEdit = false;
                  $scope.currOrder.status= 35;
                  console.log(resp);
                } else {
                  alert(resp.message);
                }
              });
            };
            //暂停订单
            $scope.suspendOrder = function () {
              var orderId = $scope.currOrderId;
              OrderResource.suspend({id: orderId}).$promise.then(function (resp) {
                if (resp.success) {
                  //$scope.isLocked = false;
                  $scope.isSuspended = true;
                  $scope.enableEdit = false;
                  $scope.currOrder.involveType = "1";
                  console.log(resp);
                } else {
                  alert(resp.message);
                }
              });
            };
            //恢复订单
            $scope.startOrder = function () {
              var orderId = $scope.currOrderId;
              OrderResource.start({id: orderId}).$promise.then(function (resp) {
                if (resp.success) {
                  $scope.isSuspended = false;
                  $scope.enableEdit = true;
                  $scope.currOrder.involveType = "0";
                  console.log(resp);
                } else {
                  alert(resp.message);
                }
              });
            };
  


            //获得商品信息函数
            $scope.getProduct = function () {
                ProductResource.search().$promise.then(function (resp) {
                    $scope.products = resp.products;
                    $scope.productsTableShow = true;
                });
            };

            $scope.reloadShipment = function () {
                //重新载入订单发货信息
                OrderResource.getShipment({id: $scope.currOrderId}).$promise.then(function (resp) {
                    $scope.shipments = resp.models;
                    
                });           
            };

            //添加商品到订单
            $scope.addOrderProduct = function ( product ) {
                var id = $scope.shipments[0].orderItems[0].id;
                console.log(product);
                var newProduct = {
                        "id": id + 1,
                        "orderShipmentId": 91,
                        "productSkuId": 0,
                        "orderItemId": 103,
                        "skuNumber": product.sku,
                        "skuName": product.name,
                        "skuType": 0,
                        "skuQuantity": 0,
                        "allocatedQuantity": 0,
                        "dangerous": 0,
                        "fragile": 0,
                        "createBy": "test3@g.com",
                        "lastUpdateBy": "test3@g.com",
                        "createTime": 1403278126000,
                        "lastUpdateTime": 1404987629000,
                        "skuPrice": product.price,
                        "skuDiscountPrice": 12.0000,
                        "m2bProdId": 0,
                        "productId": 0
                    };
                
                $scope.shipments[0].orderItems[0].orderShipmentItems.push(newProduct);
            };

            //删除订单中的商品
            $scope.deleteOrderProduct = function ( item, itemVo ) {
                //var index = console.log( itemVo.orderShipmentItems.indexOf(item) );
                //获得数组元素在数组中的索引
                var index = itemVo.orderShipmentItems.indexOf(item);
                itemVo.orderShipmentItems.splice(index, 1);
            };


            // -- 快捷键
            hotkeys.add({
                combo: 'esc',
                description: '关闭详细页',
                callback: function() {
                    $scope.isDetailPanelMax = false;
                }
            });

            $scope.$on('fetchRefresh', function() {
                $scope.orderTableParams.reload();
            });

            /**
             * 将日期对象转换为 yyyy-MM-dd 格式字符串
             * @param date
             */
            function getDateString(date){
                var str = "";
                str += date.getFullYear() +"-";
                str += (date.getMonth()+1) +"-";
                str += date.getDay() +" ";
                str += date.getHours() +" ";

            }

            //ajaxFileUpload 订单导入功能
            $scope.uploadPercent = "请选择文件";
            $scope.uploadUrl = "";
            $scope.channelOptions = ["All", "Global Sale"];
            $scope.onFileSelect = function($files) {
              // for (var i = 0; i < $files.length; i++) {
                // var file = $files[i];
                var file = $files[0];
                $scope.upload = $upload.upload({
                  url: 'upload/doFileUpload',
                  file: file, 
                  fileFormDataName: 'uploadFiles', 
                }).progress(function(evt) {
                  console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                  $scope.uploadPercent = '正在上传：' + parseInt(100.0 * evt.loaded / evt.total) + "%";
                }).success(function(data, status, headers, config) {
                  console.log(data);
                  if (data.result == '1') {
                    $scope.uploadPercent = "上传成功";
                    $scope.uploadUrl = data.data.array[0];
                  } else {
                    $scope.uploadPercent = "上传失败";
                    alert(data.message);
                  }
                }).error(function(data, status, headers, config) {
                  console.log(data);
                  $scope.uploadPercent = "上传失败";
                });
              // }
            };
            
            //导入订单
            $scope.onSalesImport = function () {
              var channelId = $("#channelOption").val();
              OrderResource.salesImport({channelId: channelId, importFilePath: $scope.uploadUrl}).$promise.then(function (resp) {
                if (resp.result == '1') {
                  $scope.isLocked = false;
                  $scope.enableEdit = false;
                  console.log(resp);
                } else {
                  alert(resp.message);
                }

              });

            };

        }

    ]);
