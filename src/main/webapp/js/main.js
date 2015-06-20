/**
 * @component: core
 * @name: top module
 * @description:  Declare app level module which depends on filters、 services、etc
 * @author: Patrick
 * @create: 2014/9/16.
 */


angular.module('flymvo', [
        'ngTable',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ui.bootstrap.datetimepicker',
        'ngDialog',
        'ngPopover',
        'cfp.hotkeys',
        'xeditable',
        'angularFileUpload',
        'flymvo.modules',
        'flymvo.constants',
        'flymvo.filters',
        'flymvo.services',
        'flymvo.directives',
        'flymvo.controllers'
//        'flymvo.constructor'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('main', { url: '/main', templateUrl: 'html/main.html', controller: 'mainCtrl' })

                //-- ================登陆模块================
                .state('login', { url: '/login', templateUrl: 'html/loginPage.html', controller: 'loginCtrl' })

                //-- ================首页模块================
                .state('main.welcome', { url: '/welcome', templateUrl: 'html/welcome.html', controller: 'welcomeCtrl' })

                //-- ================商品模块================
                //商品列表
                .state('main.products', { url: '/products', templateUrl: 'html/product/productList.html', controller: 'productListCtrl' })
                //商品创建-选择品牌类目
                .state('main.chooseCatBrand', { url: '/chooseCatBrand', templateUrl: 'html/product/chooseCatBrand.html', controller: 'productChooseCatBrandCtrl' })
                //商品创建-填写信息
                .state('main.createProduct', { url: '/createProduct/:categoryId/:brandId', templateUrl: 'html/product/createProduct.html', controller: 'productCreateCtrl' })
                //商品编辑
                .state('main.editProduct', { url: '/editProduct/:productId', templateUrl: 'html/product/editProduct.html', controller: 'productEditCtrl' })
                //商品咨询列表
                .state('main.consults', { url: '/consults', templateUrl: 'html/product/consultList.html', controller: 'consultListCtrl' })

                //-- ================促销模块================
                //促销价格列表
                .state('main.promoPrices', { url: '/promoPrices', templateUrl: 'html/promo/promoPriceList.html', controller: 'promoPriceListCtrl' })
                //创建促销价格
                .state('main.createPromoPrices', { url: '/createPromoPrices', templateUrl: 'html/promo/createPromoPrices.html', controller: 'promoPriceCreateCtrl' })
				 //优惠券列表
                .state('main.coupon', { url: '/coupon', templateUrl: 'html/coupon/couponList.html', controller: 'couponListCtrl' })

                //店铺优惠列表
                .state('main.salesRules', { url: '/salesRules', templateUrl: 'html/promo/salesRuleList.html', controller: 'salesRuleListCtrl' })
                //创建店铺优惠
                .state('main.createSalesRule', { url: '/createSalesRule/:rangeType', templateUrl: 'html/promo/upsertSalesRule.html', controller: 'salesRuleUpsertCtrl' })
                //编辑店铺优惠
                .state('main.editSalesRule', { url: '/editSalesRule/:salesRuleId', templateUrl: 'html/promo/upsertSalesRule.html', controller: 'salesRuleUpsertCtrl' })
                //查看店铺优惠
                .state('main.viewSalesRule', { url: '/viewSalesRule/:salesRuleId', templateUrl: 'html/promo/salesRuleDetail.html', controller: 'salesRuleViewCtrl' })

                //推荐组合列表(实际是sku列表)
                .state('main.groupPromoSkus', { url: '/groupPromoSkus', templateUrl: 'html/promo/groupPromoSkuList.html', controller: 'groupPromoSkuListCtrl' })
                //获取推荐组合列表
                .state('main.groupPromos', { url: '/groupPromos/:skuId', templateUrl: 'html/promo/groupPromoList.html', controller: 'groupPromoListCtrl' })
                //创建推荐组合
                .state('main.createGroupPromo', { url: '/createGroupPromo/:skuIds', templateUrl: 'html/promo/upsertGroupPromo.html', controller: 'groupPromoUpsertCtrl' })
                //编辑推荐组合
                .state('main.editGroupPromo', { url: '/editGroupPromo/:id', templateUrl: 'html/promo/upsertGroupPromo.html', controller: 'groupPromoUpsertCtrl' })

                //搭配组合列表
                .state('main.bundlingList', { url: '/bundling', templateUrl: 'html/promo/bundlingList.html', controller: 'bundlingListCtrl' })
                //创建搭配组合
                .state('main.createBundling', { url: '/createBundling', templateUrl: 'html/promo/upsertBundling.html', controller: 'bundlingUpsertCtrl' })
                //编辑搭配组合
                .state('main.editBundling', { url: '/editBundling/:id', templateUrl: 'html/promo/upsertBundling.html', controller: 'bundlingUpsertCtrl' })
                //查看捆绑列表
                .state('main.viewBundlingSkus', { url: '/viewBundlingSkus/:id', templateUrl: 'html/promo/viewBundlingSkus.html', controller: 'bundlingSkusViewCtrl' })

                //-- ================物流模块================
                //-- 物流运费模板列表
                .state('main.logistics', { url: '/logistics', templateUrl: 'html/logistics/logisticsList.html', controller: 'logisticsListCtrl' })
                //-- 添加运费模板
                .state('main.createLogistics', { url: '/createLogistics/:transFeeTempId', templateUrl: 'html/logistics/createLogistics.html', controller: 'logisticsSubmitCtrl' })
                //-- 修改运费模板
                .state('main.editLogistics', { url: '/editLogistics/:transFeeTempId', templateUrl: 'html/logistics/editLogistics.html', controller: 'logisticsSubmitCtrl' })
                //-- 地址列表
                .state('main.address', {url: '/address', templateUrl: 'html/logistics/addressList.html', controller: 'addressListCtrl'})
                //-- 添加地址
                .state('main.createAddress', { url: '/createAddress', templateUrl: 'html/logistics/createAddress.html', controller: 'addressCreateCtrl' })
                //-- 修改地址
                .state('main.editAddress', { url: '/editAddress/:addressId', templateUrl: 'html/logistics/editAddress.html', controller: 'addressEditCtrl' })

				//-- ================售后模块================
                //售后列表
                .state('main.refundList',{url:'/refund',templateUrl:'html/refund/refundList.html',controller:'refundListCtrl'})
                //售后详情
                .state('main.refundDetail',{url:'/refund/:returnNo',templateUrl:'html/refund/refundDetail.html',controller:'refundDetailCtrl'})

				//-- ================订单模块================
                //订单列表
                .state('main.orderList',{url:'/orders',templateUrl:'html/order/orderList.html',controller:'orderListCtrl'})
                //订单详情
                .state('main.orderDetail',{url:'/orders/:orderNumber',templateUrl:'html/order/orderDetail.html',controller:'orderDetailCtrl'})
                //打印发货单
                .state('printDelivery',{url:'/printDelivery',templateUrl:'html/order/printDelivery.html',controller:'orderPrintListCtrl'})
                //问题运单号
                .state('main.errTrackingNoList',{url:'/errTrackingNo',templateUrl:'html/order/errTrackingNoList.html',controller:'errTrackingNoListCtrl'})
                //修改运单号
                .state('main.pendTrackingNoList',{url:'/pendTrackingNo',templateUrl:'html/order/pendTrackingNoList.html',controller:'pendTrackingNoListCtrl'})
                //运单号日志
                .state('main.trackingNoLogList',{url:'/trackingNoLog',templateUrl:'html/order/trackingNoLogList.html',controller:'trackingNoLogCtrl'})
                //订单发货
                .state('main.ordersDeliverList',{url:'/ordersDeliver',templateUrl:'html/order/deliverList.html',controller:'orderDeliverListCtrl'})
                //订单批量发货
                .state('main.multiOrdersDeliverDetail',{url:'/multiOrdersDeliver/:orderNumbers',templateUrl:'html/order/multiDeliverDetail.html',controller:'orderMultiDeliverCtrl'})

                //-- ================账号模块================
                //制造者信息
                .state('main.manufacturerInfo',{url:'/account/manufacturerInfo',templateUrl:'html/account/manufacturerInfo.html',controller:'manufacturerInfoCtrl'})
                //品牌信息
                .state('main.brandInfo', {url:'/account/brandInfo', templateUrl:'html/account/brandInfo.html', controller:'brandInfoCtrl'})
                //修改密码
                .state('main.updatePassword',{url:'/account/updatePassword',templateUrl:'html/account/updatePassword.html',controller:'updatePasswordCtrl'})
                  //-- ================其他模块================
                //图片银行
                .state('main.imageBank',{url:'/imageBank',templateUrl:'html/image-bank/imageBank.html',controller:'imageBankCtrl'})

                //-- ================结算模块================
                //结算
                .state('main.finance', { url: '/finance', templateUrl: 'html/finance/financeList.html', controller: 'financeListCtrl' })

                //-- ================帮助中心================
                .state('main.helpCenter', { url: '/helpCenter/:item', templateUrl: 'html/help-center/detail.html', controller: 'helpCenterCtrl' })

                //-- ================测试================
                //测试货品选择器
                .state('main.testSkuSelector', { url: '/testSkuSelector', templateUrl: 'html/test/testSkuSelector.html', controller: 'testSkuSelectorCtrl'})

                //测试飞飞消息盒子
                .state('main.testMsgBox', { url: '/testMsgBox', templateUrl: 'html/test/testMsgBox.html', controller: 'testMsgBoxCtrl'});


            // For any unmatched url, redirect to /loading
            $urlRouterProvider.otherwise("/main/welcome");
        }
    ])
    .factory('myHttpInterceptor', ['$q','$window',function ($q, $window) {
        //-- 处理权限不通过
        function handleUnauthorized(response){
            if(response.status == 401){
                $window.location.replace('/#/login');
            }
        }

        return function (promise) {
            return promise.then(function (response) {
                $('#mask').hide();
                handleUnauthorized(response);
                return response;

            }, function (response) {
                $('#mask').hide();
                handleUnauthorized(response);
                return $q.reject(response);
            });
        };
    }])
    .config(['$httpProvider','$globalSetting', function ($httpProvider,$globalSetting) {

        $httpProvider.responseInterceptors.push('myHttpInterceptor');

        $httpProvider.defaults.transformRequest = function (obj) {
            $('#mask').show();
            if(angular.isObject(obj)){
                //使用的content-type是 application/x-www-form-urlencoded
                var str = [];
                angular.forEach(obj, function(value, key){
                    if(angular.isDefined(value) && value !== null){
                        var encodeValue = encodeURIComponent(value);
                        if( encodeValue.trim() !== ""){
                            str.push(encodeURIComponent(key) + "=" + encodeValue);
                        }
                    }
                });
                return str.join("&");
            }else if(angular.isString(obj)){
                //使用的content-type是 application/json
                // do nothing
            }
//            console.log(obj);
            return obj;
        };
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };


        //work with RAP
        var interceptor = {
            request: function(config) {
                //所有数据接口必须以/data/起头
                if($globalSetting.isMockEnv && config.url.indexOf('/data/') === 0){
                    if($globalSetting.isTestUploadController && config.url.indexOf('/data/upload') === 0){
                        //如果正在测试UploadController则忽略 Do nothing
                    }else{
                        config.url = $globalSetting.mockRoot + config.url;
                    }



                }

                if(config.url.indexOf('/data/') === 0){
                    //为避免ie缓存，所有服务端request data数据都增加random string
                    var randomString = "rs="+ _.random(1,9999999) ;
                    if(config.url.indexOf("?") !== -1){
                        if(config.url.indexOf("?") === config.url.length-1){
                            config.url = config.url + randomString;
                        }else{
                            config.url = config.url + "&" + randomString;
                        }
                    }else{
                        config.url = config.url + "?" + randomString;
                    }
                }


                return config;
            }
        };
        $httpProvider.interceptors.push(function() {
            return interceptor;
        });


    }])
    .run(['$rootScope','$templateCache','editableOptions', 'editableThemes', '$globalSetting', 'cookieService',
        function ($rootScope, $templateCache, editableOptions, editableThemes, $globalSetting, cookieService) {
        //设置angular editable的样式是bootstrap3
        editableOptions.theme = 'bs3';
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        $rootScope.$saferApply = function (exp) {
            if (!this.$$phase) {
                this.$apply(exp);
            } else {
                try {
                    this.$eval(exp);
                } catch (ex) {
                    $exceptionHandler(ex);
                } finally {
                    this.$digest();
                }
            }
        };


    }]);


/**
 * Move item up or down
 * http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
 * @param old_index
 * @param new_index
 * @returns {Array}
 */
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};

/**
 * trim string
 * @returns {string}
 */
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


var FLOAT_REGEXP = /^[0-9]{1,7}([.][0-9]{1,2})?$/;
var INTEGER_REGEXP = /^[0-9]{1,7}$/;
//只允许数字和中划线
var PHONE_REGEXP = /^([0-9]|-)*$/;
/**
 * @description: 导航 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.common.constants', [])
    .constant('commonConstants', {

        'imageUploadPath' : '/data/upload/image'
    })
    .factory('hourOptions',function(){
        var hourOptions = [];
        for(var i=0; i<24; i++){
            var h = (i<10)?"0"+i :""+i;
            hourOptions.push(h+":00:00");
        }
        return hourOptions;
    })

;

/**
 * @description: 商品咨询 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.consult.constants', [])
    .constant('consultConstants', {
        //提问类型
        types : [
            {value: '0', label: '商品'},
            {value: '1', label: '促销活动'},
            {value: '2', label: '安装及物流'},
            {value: '3', label: '售后服务'}
        ],

        //咨询状态
        statuses :[
            {value: '0', label: '未回复'},
            {value: '1', label: '已回复'}
        ]

    });

angular.module("flymvo.coupon.constants", [])
    .constant('couponConstants', {
        //优惠劵状态
        couponStatus: [ 
            {value: '0', label: '未派发'}, 
            {value: '1', label: '派发中'}, 
            {value: '2', label: '已结束'}
        ]
    });
/**
 * @description: Demo constants
 * @author: Patrick.he
 **/
angular.module('flymvo.demo.constants', [])
    .constant('demoConstants', {
        //-- 状态
        'statuses': {
            '1': "已提交",
            '2': "已支付",
            '3': "备货中",
            '4': "已发货",
            '5': "已签收"
        },
        'currencyIcons': {
            '1': "fa-rmb",  //人民币
            '2': "HKD",  //港币
            '3': "fa-eur",  //欧元
            '4': "fa-usd",  //美元
            '5': "fa-gbp"  //英镑
        }
    });

/**
 * @description: Constants 集合器,所有需要注入app的constants，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.constants', [
    'flymvo.demo.constants',
    'flymvo.common.constants',
    'flymvo.product.constants',
    'flymvo.promo.constants',
    'flymvo.coupon.constants',
    'flymvo.consult.constants',
    'flymvo.order.constants',
    'flymvo.refund.constants',
    'flymvo.logistics.constants'
]);


/**
 * @description: 物流模块常量
 * @author: max.huang
 **/
angular.module('flymvo.logistics.constants', [])
    .constant('logisticsConstants', {
        //配送方式
        'distributionMode' : {
            '1': '快递',
            '2': '平邮'
        },
        //中国省份数组
        'provinceArray': ['安徽','北京','重庆','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','香港','湖北','湖南','江苏','江西','吉林','辽宁','澳门','内蒙古','宁夏','青海','山东','上海','山西','陕西','四川','台湾','天津','新疆','西藏','云南','浙江'],
        //商品类型
        productTypes : [
            {value: '1', label: '普通'},
            {value: '2', label: '多规格'}
        ],
        // 计价类型
        caculateType: {
          '0': '按重量',
          '1': '按件',
          '2': '按体积'
        },
        //费用承担方
        feeChargedBy: {
          '0': '消费者承担运费',
          '1': '制造商承担运费'
        },
        //计量单位
        caculateUnit: {
          '1': 'kg',
          '2': '件',
          '3': 'L'
        }

    });

angular.module("flymvo.order.constants", [])
    .constant('orderConstants', {
        //订单状态
        orderStatus: [
            {value: '1', label: '待发货', details: '最迟发货:'},
            {value: '2', label: '配送中', details: '详情'},
            {value: '3', label: '交易完成'}
        ],

        //快递公司
        express: [
            {value: '0', label: '申通'},
            {value: '1', label: '顺丰'},
            {value: '2', label: '天地华宇'}
        ],

        //订单详情，收货信息
        receiveInfo: [
            {value: 1, label: '收货人'},
            {value: 2, label: '收货地址'},
            {value: 3, label: '联系方式'},
            {value: 4, label: '收货时间'}
        ],
        //支付信息
        payInfo: [
            {value: '0', label: '订单金额'}
        ],

        //发票的商品类型
        invoiceItemContents: [
            {value: '0', label: '明细'},
            {value: '1', label: '办公用品'},
            {value: '2', label: '电脑配件'},
            {value: '3', label: '耗材'}
        ],

        //订单列表状态
        orderTypes: [
            {value: 1, label: '退货', status:35},
            {value: 2, label: '换货', status:50},
            {value: 3, label: '退款', status:60},
            {value: 4, label: '全部', status: 0}
        ],
        //订单列表状态
        orderTypesItems: [
            {value: "1", label: '待发货',       status:35},
            {value: "2", label: '配送中',       status:50},
            {value: "3", label: '交易完成',     status:60},
            {value: "4", label: '全部',         status: 0}
        ],

        //问题原因
       trackingNoReason: [
            {value: "0", label: '7天内物流信息'},
            {value: "1", label: '7天内无新的物流信息'},
            {value: "2", label: '重复运单号'},
            {value: "3", label: '运单物流信息早于订单发货时间'}
        ],
        //运单号处理状态
        transportNoHandlingStatuses:[
            {value: "1", label: '未处理'},
            {value: "2", label: '已处理'},
        ],

        //修改运单号状态
        pendTrackingOrderStatuses : [
            {value: "0", label: '未签收'},
            {value: "1", label: '已签收'}
        ]

    });
/**
 * @description: 商品 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.product.constants', [])
    .constant('productConstants', {
        //商品类型
        productTypes : [
            {value: '0', label: '普通'},
            {value: '1', label: '多规格'}
        ],

        //上架状态
        shelvesStatuses : [
            {value: '0', label: '未上架'},
            {value: '1', label: '已上架'},
            {value: '2', label: '已下架'}
        ],

        //监控状态
        watchStatuses : [
            {value: '0', label: '正常'},
            {value: '1', label: '警告'},
            {value: '2', label: '强制下架'}
        ],

        //推送状态
        pushStatuses : [
            {value: '0', label: '未推送'},
            {value: '2', label: '推送失败'},
            {value: '3', label: '推送成功'}
        ],

        //最大上传单品图片数量
        MAX_UPLOAD_SKU_IMAGE_LIMIT : 5,
        //最大上传详细图片组数量
        MAX_UPLOAD_DESC_GROUP_LIMIT : 8,
        //每个图片组最大上传详细图片数量
        MAX_UPLOAD_DESC_IMAGE_LIMIT : 5,
        //每个商品最多货品数
        MAX_SKU_NUM_LIMIT : 60


    });

/**
 * @description: 促销 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.promo.constants', [])
    .constant('promoConstants', {

        //促销价状态
        promoPriceStatuses :[
            {value: '1', label: '生效中'},
            {value: '4', label: '未生效'},
            {value: '3', label: '已失效'}
        ],

        //店铺优惠活动状态
        salesRuleStatuses :[
            {value: '1', label: '未开始'},
            {value: '2', label: '进行中'},
            {value: '3', label: '已结束'},
            {value: '4', label: '已撤销'}
        ],

        //店铺优惠活动优惠类型
        salesRuleTypes :[
            {value: 'minus', label: '减金额'},
            {value: 'gift', label: '送赠品'}
        ],

        //店铺优惠活动范围类型
        salesRuleRangeTypes :[
            {value: '1', label: '全店'},
            {value: '2', label: '特定商品'}
        ],

        //推荐组合状态
        groupPromoStatuses :[
            {value: '1', label: '已有推荐'},
            {value: '0', label: '无推荐'}
        ],

        //搭配组合状态
        bundlingStatuses :[
            {value: '0', label: '未上架'},
            {value: '1', label: '已上架'},
            {value: '2', label: '已下架'}
        ]

    });

angular.module("flymvo.refund.constants", [])
    .constant('refundConstants', {
        //售后状态
        refundStatus: [
            {value: '1', label: '待受理'},
            {value: '2', label: '待退货'},
            {value: '3', label: '退货中'},
            {value: '4', label: '退款中'},
            {value: '5', label: '完成'},
            {value: '6', label: '取消'}
        ],

        refundType: [
            {
                value: '1', label: '退货',
                //默认进度条设定
                progress: {
                    content: [
                        {text: "消费者申请退货"},
                        {text: "制造商处理退货申请"},
                        {text: "消费者退货给制造商"},
                        {text: "制造商处理退款申请"},
                        {text: "制造商确认收货，退款完成"}
                    ]
                },
                //默认计时器设定
                timer: {
                    enable: true,
                    period: 7 * 24 * 3600000 //7天，毫秒为单位
                },
                template: '/html/refund/info/returnDetail.html',

                refundStatus: [
                    {
                        value: '1', label: '待受理',
                        progress: {
                            active: 1
                        },
                        timer: {
                            period: 48 * 3600000,
                            text: "超过48小时未处理，退货申请将自动受理达成并需要消费者退货"
                        }
                    },

                    {
                        value: '2', label: '待退货',
                        progress: {
                            active: 2
                        },
                        timer: {
                            period: 7 * 24 * 3600000,
                            text: "消费者在7天内没有退货，该退货单将由系统自动取消。"
                        }
                    },

                    {
                        value: '3', label: '退货中',
                        progress: {
                            active: 3
                        },
                        timer: {
                            period: 7 * 24 * 3600000,
                            text: "制造商在7天内没有回收退货商品，将有飞飞客服介入。"
                        },
                        trackingType: 1 //1为回收，2为重发
                    },

                    {
                        value: '4', label: '退款中',
                        progress: {
                            active: 4
                        },
                        timer: {
                            enable: false
                        }
                    },

                    {
                        value: '5', label: '完成',
                        progress: {
                            active: 5
                        },
                        timer: {
                            enable: false
                        }
                    },

                    {
                        value: '6', label: '取消',
                        progress: {
                            content: [
                                {text: "消费者申请退货"},
                                {text: "制造商处理退货申请"},
                                {text: "消费者取消退货申请"},
                            ],
                            active: 3
                        },
                        timer: {
                            enable: false
                        }
                    }
                ]
            },

            {
                value: '2', label: '换货',
                //默认进度条设定
                progress: {
                    content: [
                        {text: "消费者申请换货"},
                        {text: "制造商处理换货申请"},
                        {text: "消费者退货给制造商"},
                        {text: "制造商确认回收"},
                        {text: "制造商重发商品"},
                        {text: "换货完成"}
                    ]
                },
                //默认计时器设定
                timer: {
                    enable: true,
                    period: 7 * 24 * 3600000, //7天，毫秒为单位
                },
                template: '/html/refund/info/exchangeDetail.html',

                refundStatus: [
                    {
                        value: '1', label: '待受理',
                        progress: {
                            active: 1
                        },
                        timer: {
                            period: 48 * 3600000,
                            text: "超过48小时未处理，换货申请将自动受理达成并需要消费者退货"
                        }
                    },

                    {
                        value: '2', label: '待退货',
                        progress: {
                            active: 2
                        },
                        timer: {
                            text: "消费者在7天内没有退货，该退货单将由系统自动取消。"
                        }
                    },

                    {
                        value: '3', label: '退货中',
                        progress: {
                            active: 3
                        },
                        timer: {
                            text: "制造商在7天内没有回收退货商品，将有飞飞客服介入。"
                        },
                        trackingType: 1 //1为回收，2为重发
                    },

                    {
                        value: '4', label: '待重发',
                        progress: {
                            active: 4
                        },
                        timer: {
                            text: "制造商在7天内没有重发商品，将有飞飞客服介入。"
                        }
                    },

                    {
                        value: '5', label: '重发中',
                        progress: {
                            active: 5
                        },
                        timer: {
                            text: "制造商重发商品7天后换货完成。"
                        },
                        trackingType: 2 //1为回收，2为重发
                    },

                    {
                        value: '6', label: '完成',
                        progress: {
                            active: 6
                        },
                        timer: {
                            enable: false
                        },
                        trackingType: 2 //1为回收，2为重发
                    },

                    {
                        value: '7', label: '取消',
                        progress: {
                            content: [
                                {text: "消费者申请换货"},
                                {text: "制造商处理换货申请"},
                                {text: "消费者取消换货申请"},
                            ],
                            active: 3
                        },
                        timer: {
                            enable: false
                        }
                    }
                ]
            },
            {
                value: '3', label: '退款',
                //默认进度条设定
                progress: {
                    content: [
                        {text: "消费者申请退款"},
                        {text: "制造商处理退款申请"},
                        {text: "退款完成"}
                    ]
                },
                //默认计时器设定
                timer: {
                    enable: true,
                    period: 7 * 24 * 3600000, //7天，毫秒为单位
                },
                template: '/html/refund/info/chargebackDetail.html',

                refundStatus: [
                    {
                        value: '1', label: '待受理',
                        progress: {
                            active: 1
                        },
                        timer: {
                            period: 48 * 3600000,
                            text: "超过48小时未处理，退款申请将自动受理达成并退款给消费者"
                        }
                    },

                    {
                        value: '2', label: '退款中',
                        progress: {
                            active: 2
                        },
                        timer: {
                            enable: false
                        }
                    },

                    {
                        value: '3', label: '完成',
                        progress: {
                            active: 3
                        },
                        timer: {
                            enable: false
                        }
                    },

                    {
                        value: '4', label: '取消',
                        progress: {
                            content: [
                                {text: "消费者申请退款"},
                               // {text: "制造商处理退款申请"},
                                {text: "消费者取消退款申请"},
                            ],
                            active: 2
                        },
                        timer: {
                            enable: false
                        }
                    }
                ]
            },
            {
                value: '4', label: '补发',
                //默认进度条设定
                progress: {
                    content: [
                        {text: "消费者申请补发"},
                        {text: "制造商处理补发申请"},
                        {text: "制造商补发商品"},
                        {text: "补发完成"}
                    ]
                },
                //默认计时器设定
                timer: {
                    enable: true,
                    period: 7 * 24 * 3600000, //7天，毫秒为单位
                },
                template: '/html/refund/info/supplyAgainDetail.html',

                refundStatus: [
                    {
                        value: '1', label: '待受理',
                        progress: {
                            active: 1
                        },
                        timer: {
                            period: 48 * 3600000,
                            text: "超过48小时未处理，补发申请将自动受理达成并需要制造商补发商品"
                        }
                    },

                    {
                        value: '2', label: '待补发',
                        progress: {
                            active: 2
                        },
                        timer: {
                            text: "制造商在7天内没有补发商品，将有飞飞客服介入。"
                        }
                    },

                    {
                        value: '3', label: '配送中',
                        progress: {
                            active: 3
                        },
                        timer: {
                            text: "制造商重发商品7天后补发完成。"
                        },
                        trackingType: 2 //1为回收，2为重发
                    },

                    {
                        value: '4', label: '完成',
                        progress: {
                            active: 4
                        },
                        timer: {
                            enable: false
                        },
                        trackingType: 2 //1为回收，2为重发
                    },

                    {
                        value: '5', label: '取消',
                        progress: {
                            content: [
                                {text: "消费者申请补发"},
                               // {text: "制造商处理补发申请"},
                                {text: "消费者取消补发申请"},
                            ],
                            active: 2 
                        },
                        timer: {
                            enable: false
                        }
                    }
                ]
            }
        ]


    });

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

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.controllers', [
  'flymvo.demo.controller',
  'flymvo.dashboard.controllers',
  'flymvo.main.controllers',
  'flymvo.product.controllers',
  'flymvo.order.controllers',
  'flymvo.refund.controllers',
  'flymvo.finance.controllers',
  'flymvo.account.controllers',
  'flymvo.logistics.controllers',
  'flymvo.promo.controllers',
  'flymvo.coupon.controllers',
  'flymvo.helpCenter.controllers',
  'flymvo.test.controllers'
]);


/**
 * @description: Bootstrap 3 javascript checkbox and radio button toggle prevents angular's ng-model from updating on input
 * 用于解决此问题的指令 https://github.com/angular/angular.js/issues/4516
 * 解决方法： http://jsfiddle.net/6MPNz/6/
 * @author: Patrick.he
 **/
angular.module('flymvo.checkboxRadioButtonToggle.directives', [])
    .directive('checkboxWithChangeHandler', [function checkboxWithChangeHandler() {
        return {
            replace: false,
            require: 'ngModel',
            scope: false,
            link: function (scope, element, attr, ngModelCtrl) {
                $(element).change(function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(element[0].checked);
                    });
                });
            }
        };
    }]).directive('radioWithChangeHandler', [function checkboxWithChangeHandler() {
        return {
            replace: false,
            require: 'ngModel',
            scope: false,
            link: function (scope, element, attr, ngModelCtrl) {
                $(element).change(function () {
                    if (element[0].checked) {
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(attr.value);
                        });
                    }
                });
            }
        };
    }]);

/**
 * @description: Demo directives
 * @author: Patrick.he
 **/
angular.module('flymvo.demo.directives', [])
    .directive('hello', [function () {
        return {
            restrict: 'E',
            scope: {
                who: '@expanderWho'
            },
            replace: true,
            template: '<div>Hello {{who}} !!</div>',
            link: function (scope, element, attrs) {
                console.log(element.scope());
            }
        };
    }]);
/**
 * @description: 将DOM布局想象成一个个的盒子，
 *  greedy指令，用于贪婪的拉伸垂直高度，直至在整个垂直方向将整个父容器挤满
 */

angular.module('flymvo.greedy.directives', [])
    .directive('greedy', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var parentElement = element.parent(),
                    totalHeight = 0;
                angular.forEach(angular.element(parentElement).children(), function (node, key) {
                    totalHeight += angular.element(node).outerHeight();
                });
                totalHeight -= angular.element(element).outerHeight();
                element.css('height', parentElement.innerHeight() - totalHeight);
            }
        };
    })
/**
 * Usage:贪婪设置div 高度，
 * param: width 是已知的已占高度
 */
    .directive('greedyEat', [function (width) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if(angular.isDefined(attrs.greedyEat) && attrs.greedyEat !==""){
                    element.css('height', document.body.clientHeight - attrs.greedyEat);
                    element.css({'overflow-y': 'auto', 'overflow-x': 'hidden'});
                }else{
                    //do nothing
                }
            }
        };
    }])

;



/**
 * @description: Directives 集合器。所有需要注入app的directive，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.directives', [
  'flymvo.demo.directives',
  'flymvo.checkboxRadioButtonToggle.directives',
  'flymvo.validate.directives',
  'flymvo.greedy.directives',
  'flymvo.provinces.directives',
  'flymvo.progressBar.directives',
  'flymvo.product.directives',
  'flymvo.message.directives',
  'flymvo.urlReload.directives',
  'flymvo.timeCounter.directives'
]);

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

/**
 * @description: 进度条 directives
 * @author: max.huang
 **/
angular.module('flymvo.progressBar.directives', [])
  .directive('progressbar', [function () {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      replace: true,
      templateUrl: '/html/template/progressBar.html',
      link: function (scope, element, attrs) {
        scope.$watch('config', function(newVal, oldVal) {
          if(_.isUndefined(scope.config))  return;

          scope.items = scope.config.content;
          scope.liWidth = {width: 100 / scope.items.length + "%"};
          scope.progressWidth = {
            width: 100 / (scope.items.length * 2) * (scope.items.length * 2 - 2) + "%",
            left: 100 / (scope.items.length * 2) + "%"
          };

          scope.progress = scope.config.active / (scope.items.length - 1) * 100;
        });
      }
    };
  }]);


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


/**
 * @description: 货品选择器
 * @author: Patrick
 **/

angular.module('flymvo.product.directives', [])
    .factory('skuSelector', ['$rootScope', '$compile', '$globalSetting', function($rootScope, $compile, $globalSetting){
        function SkuSelector(options, scope){
            var defaults = {
                //最多选择个数
                maxNum : 30,
                //是否允许多选
                multi : false,
                //确认选择货品后回调函数
                onSelect : null,
                //需要初始加载选择的货品ids字符串，用逗号分隔
                skuIds : "",
                //需要初始加载选择的货品完成回调函数，配合skuIds使用
                onInitLoaded : null,
                //如果此参数等于true表示查询的都是安装服务，默认false
                isInstallService : false
            };
            this.options = {};
            $.extend(this.options, defaults, options);

            var html = '<div><div sku-selector max-num="'+ this.options.maxNum;
            html += '" multi="'+ this.options.multi;
            html += '" on-select="'+ this.options.onSelect + "(result)";
            html += '" on-init-loaded="'+ this.options.onInitLoaded + "(result)";
            html += '" sku-ids="'+ this.options.skuIds;
            html += '" is-install-service="'+ this.options.isInstallService;
            html += '"></div></div>';
            this.rootElement = $(html);
            $('body').append(this.rootElement);
            $compile(this.rootElement.contents())(scope);

            //打开选择器
            this.open = function(){
                this.rootElement.find('.modal').modal('show');
                return this;
            };

            //获取选择的sku列表
            this.getSkus = function(){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                return scope.getSkus();
            };

            // 清空当前选择的sku列表
            this.emptySkus = function(){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                return scope.emptySkus();
            };

            //外部(控件外)删除sku
            this.removeSingleSkuByExternal = function(sku){
                var scope = angular.element(this.rootElement.find('.modal')).scope();
                scope.removeSingleSkuByExternal(sku);
                return this;
            };

            return this;
        }

        return function(options, scope){
            return new SkuSelector(options, scope);
        };

    }])
    .controller('skuSelectorCtrl', [
        '$scope',
        '$window',
        '$element',
        '$filter',
        '$timeout',
        '$globalSetting',
        'productConstants',
        'productService',
        'ngTableParams',function($scope, $window, $element, $filter, $timeout, $globalSetting, productConstants, productService, TableParams) {
            //-- =======================================变量===========================================
            var jModal = $($element).find('.modal');
            var jSearchForm = $($element).find('#productSearchForm');

            //初始化是否允许多选
            if(!$scope.multi){
                $scope.multi = false;
            }else{
                $scope.multi = ($scope.multi === "true");
            }

            //初始化是否查询安装服务
            if(!$scope.isInstallService){
                $scope.isInstallService = false;
            }else{
                $scope.isInstallService = ($scope.isInstallService === "true");
            }

            //-- 初始化常量
            $scope._productTypes = productConstants.productTypes;

            //-- html模板
            $scope.templates = {
                searchArea : '/html/template/sku-selector/searchArea.html?tag='+$globalSetting.version,
                listArea : '/html/template/sku-selector/listArea.html?tag='+$globalSetting.version,
                resultArea : '/html/template/sku-selector/resultArea.html?tag='+$globalSetting.version
            };

            //-- 初始化模型
            $scope.query = {
                //商品类型
                productTypes : [],
                //只能选择上架的商品
                shelvesStatuses: [1]
            };

            //-- 用于记录选择的sku id
            $scope.selectedItems = [];

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            $scope.skuList = [];

            //-- 用于记录已选择的sku列表
            $scope.selectedSkuArray = [];
            //-- 用于记录已选择的sku列表 (操作开始和结束状态)
            $scope.selectedSkuArraySaved = [];



            //-- =======================================函数===========================================
            //--  查询函数
            $scope.search = function(){
                //validate form first
                var productSearchForm = angular.element('#productSearchForm').scope().productSearchForm;
                if(productSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    jSearchForm.find(':input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    jSearchForm.find('#searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.productTableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                var productSearchForm = angular.element('#productSearchForm').scope().productSearchForm;
                //将错误移除
                productSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

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

            // 获取当前选择的sku列表
            $scope.getSkus = function(){
                return $scope.selectedSkuArray;
            };

            // 清空当前选择的sku列表
            $scope.emptySkus = function(){
                $scope.selectedSkuArray = [];
            };

            /**
             * 添加单个sku
             * 返回值：
             * 1 ：添加成功
             * -1 ： 添加的sku数量已达到，不能再添加
             */

            $scope.addSingleSku = function(sku){
                var flag;
                if($scope.indexOfSku(sku) == -1){
                    if($scope.selectedSkuArray.length < $scope.maxNum){
                        var item = angular.copy(sku);
                        $scope.selectedSkuArray.push(item);
                        flag = 1;
                    }else{
                        $window.alert("最多允许添加"+$scope.maxNum+"个货品");
                        flag = -1;
                    }
                }else{
                    flag =  -2;
                }
                return flag;
            };

            //移除单个sku
            $scope.removeSingleSku = function(sku){
                var index = $scope.indexOfSku(sku);
                if(index != -1){
                    $scope.selectedSkuArray.splice(index, 1);
                }
            };
            //外部移除单个sku
            $scope.removeSingleSkuByExternal = function(sku){
                var index = $scope.indexOfSku(sku);
                if(index != -1){
                    $scope.selectedSkuArray.splice(index, 1);
                    $scope.selectedSkuArraySaved.splice(index, 1);
                }
            };

            //清空已选择区
            $scope.removeAll = function(){
                if($window.confirm("你确认清空吗？")){
                    $scope.selectedSkuArray = [];
                }
            };

            $scope.addMultiSku = function(sku){
                var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                var flag = 1;
                angular.forEach(skuArray, function(item, itemIndex){
                    if(flag != -1){
                        flag = $scope.addSingleSku(item);
                    }
                    //如果flag不为1，则循环的剩下部分不会继续执行
                });
            };

            //找到目标sku所在的顺序值
            $scope.indexOfSku = function(sku){
                var index = -1;
                angular.forEach($scope.selectedSkuArray, function(item, itemIndex){
                    if(index == -1){
                        if(item.id == sku.id){
                            index = itemIndex;
                        }
                    }
                });
                return index;
            };

            //是否包含目标sku
            $scope.isContainSku = function(sku){
                return $scope.indexOfSku(sku) != -1;
            };

            //--根据skuIdArray获得skuArray
            function getSkuArrayBySkuId(skuIdArray){
                var list = [];
                angular.forEach($scope.skuList, function(sku, index){
                    if(skuIdArray.indexOf(sku.id) != -1){
                        list.push(sku);
                    }
                });
                return list;
            }

            //确认选择多个货品
            $scope.selectSkus = function(){
                $scope.selectedSkuArraySaved = angular.copy($scope.selectedSkuArray);
                if($scope.onSelect({'result': angular.copy($scope.selectedSkuArray)}) !== false){
                    //如果执行回调函数不是返回false,则自动关闭窗口
                    jModal.modal('hide');
                }
            };

            //选择单个货品
            $scope.selectSku = function(sku){
                if($scope.onSelect({'result':angular.copy(sku)}) !== false){
                    jModal.modal('hide');
                }
            };

            //取消选择
            $scope.cancelSelect = function(){
                //将所有临时的去掉
                if($scope.multi){
                    $scope.selectedSkuArray = angular.copy($scope.selectedSkuArraySaved);
                }
                jModal.modal('hide');
            };




            //-- =======================================初始化===========================================
            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.productTableParams = new TableParams({
                page: 1,
                count: 4
            }, {
                counts: [4, 10, 20],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();

                    if($scope.isInstallService){
                        postData.isInstallService = 1;
                    }

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序field
                        //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    productService.query(postData).$promise.then(function (resp) {
                        jSearchForm.find('#searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.skuList = list;
                        $defer.resolve(list);
                    });


                }
            });

            //初始化加载的货品列表
            if($scope.skuIds){
                productService.listProducts({ids : $scope.skuIds}).$promise.then(function (resp) {
                    $scope.selectedSkuArray = resp.models;
                    $scope.selectedSkuArraySaved = angular.copy($scope.selectedSkuArray);

                    if($scope.onInitLoaded){
                        $scope.onInitLoaded({'result':angular.copy($scope.selectedSkuArray)});
                    }
                });
            }


    }])
    .directive('skuSelector', ['$globalSetting',function ($globalSetting) {
        return {
            restrict: 'A',
            scope: {
                //确认选择货品后回调函数
                onSelect : '&',
                //最多选择货品数量，例如：10
                maxNum : '@',
                //是否允许选择多个，默认否，例如false
                multi : '@',
                //初始已选择的货品条目， ids， 多个sku id拼接，用半角逗号分隔
                skuIds : '@',
                //需要初始加载选择的货品完成回调函数
                onInitLoaded : '&',
                //如果此参数等于true表示查询的都是安装服务，默认false
                isInstallService : '@'
            },
            replace: false,
            templateUrl: '/html/template/sku-selector/index.html?tag='+$globalSetting.version,
            link: function (scope, element, attrs) {
            }
        };
    }]);

/**
 * @description: 进度条 directives
 * @author: max.huang
 **/
angular.module('flymvo.timeCounter.directives', [])
  .directive('timecounter', [
    '$timeout',
    function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      replace: true,
      templateUrl: '/html/template/timeCounter.html',
      link: function (scope, element, attrs) {
        scope.$watch('config', function(newVal, oldVal) {
          if(_.isUndefined(scope.config) || !scope.config.enable)  return;

          scope.config.start = parseInt(scope.config.start);
          var now = new Date();
          var leftTime = Math.floor((scope.config.start + scope.config.period - now.getTime()) / 1000);

          var count = function() {
            leftTime -= 1;
            scope.day = Math.floor(leftTime / 3600 / 24); 
            scope.hour = Math.floor((leftTime - scope.day * 3600 * 24) / 3600);
            scope.min = Math.floor((leftTime - scope.day * 3600 * 24 - scope.hour * 3600) / 60);
            scope.sec = Math.floor(leftTime - scope.day * 3600 * 24 - scope.hour * 3600 - scope.min * 60);
            $timeout(count, 1000);
          };
          count();
        });
      }
    };
  }]);



/**
 * @description: url-reload directives 点击此url可重新加载 url, 主要用于左边菜单的url reload
 * @author: Patrick.he
 **/
angular.module('flymvo.urlReload.directives', [])
    .directive('urlReload', ['$location','$state',function( $location, $state){
        return function(scope, element, attrs) {
            element.bind('click',function(){
                if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                    //http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state#methods_go
                    //$state.reload();
                    $state.go($state.current.name,{},{reload :true});
                }
            });
        };
    }]);
/**
 * @description: Consult filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.consult.filters', [])
    //-- 提问类型
    .filter('consultType', ['consultConstants', function (consultConstants) {
        return function (value) {
            var items = _.where(consultConstants.types, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
    //-- 回复状态
    .filter('consultStatus', ['consultConstants', function (consultConstants) {
        return function (value) {
            var items = _.where(consultConstants.statuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;


/**
 * @description:促销过滤器 
 * @author:allen.chan
 **/
angular.module('flymvo.coupon.filters', [])
    
    //-- 
    .filter('couponStatus', ['couponConstants', function (couponConstants) {
        return function (value) {
            if(angular.isUndefined(value)) return "";
            var item = _.findWhere(couponConstants.couponStatus, {value:'' + value});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])
;
/**
 * @description: Dmo filters
 * @author: Patrick.he
 **/

angular.module('flymvo.demo.filters', [])
    //-- 订单状态
    .filter('demoStatus', ['demoConstants', function (orderConstants) {
        return function (value) {
            return demoConstants.statuses[value];
        };
    }])
    //-- 货币
    .filter('demoCurrency', ['demoConstants', '$filter', '$sce', function (demoConstants, $filter, $sce) {
        return function (amount, currencyId) {
              var symbol = demoConstants.currencyIcons[currencyId];
              if(angular.isUndefined(symbol) || null === amount || "" === amount){
                  return "";
              }else{
                  if(symbol.indexOf("fa-")>=0){
                      return $sce.trustAsHtml('<i class="fa '+ symbol+'"></i> ' + $filter('currency')(amount, "") );
                  }else{
                      return $filter('currency')(amount, symbol  + " ") ;
                  }

              }
        };
    }])

;


/**
 * @description: Filters 集合器，所有需要注入app的filter都要在这里注册
 * @author: Patrick.he
 **/

angular.module('flymvo.filters', [
    'flymvo.demo.filters',
    'flymvo.product.filters',
    'flymvo.order.filters',
    'flymvo.consult.filters',
    'flymvo.promo.filters',
	'flymvo.coupon.filters',
    'flymvo.refund.filters'
]);

/**
 * @description:订单过滤器
 *
 * @author:caibin
 **/
angular.module('flymvo.order.filters', [])
    //下单时间过滤器
    .filter('placeOrderTime', function () {
        return function (value) {
            return moment.lang('zh-cn', value);
        };
    })
    //-- 发票的商品类型
    .filter('invoiceItemContent', ['orderConstants', function (orderConstants) {
        return function (value) {
            if(angular.isUndefined(value))return "";
            var items = _.where(orderConstants.invoiceItemContents, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //订单类型
    .filter('orderTypes', ['orderConstants', function(orderConstants) {
        return function (label){
            if(!label) return;
            var item = _.findWhere(orderConstants.orderTypes, {value: label});

            if(angular.isDefined(item.status)){
                return parseInt(item.status);
            }else{
                return 0;
            }
        };
    }])

    //运单号处理状态
    .filter('transportNoHandlingStatus', ['orderConstants', function(orderConstants) {
        return function (value){
            var items = _.where(orderConstants.transportNoHandlingStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //修改运单号状态
    .filter('pendTrackingOrderStatus', ['orderConstants', function(orderConstants) {
        return function (value){
            var items = _.where(orderConstants.pendTrackingOrderStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
;
/**
 * @description: Product filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.product.filters', [])
    //-- 上架状态
    .filter('productShelvesStatus', ['productConstants', function (productConstants) {
        return function (value) {
            var items = _.where(productConstants.shelvesStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])
    //-- 监控状态
    .filter('productWatchStatus', ['productConstants', function (productConstants) {
        return function (value) {
            var items = _.where(productConstants.watchStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;


/**
 * @description: Consult filters
 *
 * @author: Patrick.he
 **/

angular.module('flymvo.promo.filters', [])
    //-- 促销价类型
    .filter('promoPriceStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.promoPriceStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //--店铺优惠类型
    .filter('salesRuleType', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleTypes, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 店铺优惠状态
    .filter('salesRuleStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 店铺优惠范围类型
    .filter('salesRuleRangeType', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.salesRuleRangeTypes, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 推荐组合状态
    .filter('groupPromoStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.groupPromoStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

    //-- 搭配组合状态
    .filter('bundlingStatus', ['promoConstants', function (promoConstants) {
        return function (value) {
            var items = _.where(promoConstants.bundlingStatuses, {'value':''+value});
            if(angular.isDefined(items[0].label)){
                return items[0].label;
            }else{
                return "";
            }
        };
    }])

;


/**
 * @description: refund filters
 *
 * @author: max.huang
 **/

angular.module('flymvo.refund.filters', [])
    //-- 售后类型
    .filter('refundType', ['refundConstants', function (refundConstants) {
        return function (value) {
            if(!value) return;
            var item = _.findWhere(refundConstants.refundType, {value: ""+value});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])

    //-- 售后类型反转查询（根据label查value）
    .filter('refundTypeRevers', ['refundConstants', function (refundConstants) {
        return function (label) {
            if(!label) return;
            var item = _.findWhere(refundConstants.refundType, {label: label});
            if(angular.isDefined(item.value)){
                return parseInt(item.value);
            }else{
                return 0;
            }
        };
    }])


    //-- 售后状态
    .filter('refundStatus', ['refundConstants', function (refundConstants) {
        return function (value) {
            if(!value.refundType) return;
            var item = _.findWhere(_.findWhere(refundConstants.refundType, {value: ""+value.refundType}).refundStatus, {value: ""+value.refundStatus});
            if(angular.isDefined(item.label)){
                return item.label;
            }else{
                return "";
            }
        };
    }])

    /** 
    /* 售后状态反转查询（根据label查value）
     * 注：退款中 = 完成
     **/
     .filter('refundStatusRevers', ['refundConstants', function (refundConstants) {
        return function (type, status) { 
            if(!angular.isString(type) || !angular.isString(status) ){
                console.log("type="+type);
                console.log("status="+status);
                return;
            }

            var item = _.findWhere(_.findWhere(refundConstants.refundType, {label: type}).refundStatus, {label: ""+status});
            if(item && angular.isDefined(item.value)){
                return parseInt(item.value);
            }else{
                return 0;
            }
        };
    }])
;


/**
 * @description: 工具集合器,所有需要注入app的module，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.modules', [
  'flymvo.module.stackedMap',
  'flymvo.module.transition'
]);

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
angular.module('flymvo.module.stackedMap', [])
    .factory('$$stackedMap', function () {
        return {
            createNew: function () {
                var stack = [];

                return {
                    add: function (key, value) {
                        stack.push({
                            key: key,
                            value: value
                        });
                    },
                    get: function (key) {
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                return stack[i];
                            }
                        }
                    },
                    keys: function () {
                        var keys = [];
                        for (var i = 0; i < stack.length; i++) {
                            keys.push(stack[i].key);
                        }
                        return keys;
                    },
                    top: function () {
                        return stack[stack.length - 1];
                    },
                    remove: function (key) {
                        var idx = -1;
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                idx = i;
                                break;
                            }
                        }
                        return stack.splice(idx, 1)[0];
                    },
                    removeTop: function () {
                        return stack.splice(stack.length - 1, 1)[0];
                    },
                    length: function () {
                        return stack.length;
                    }
                };
            }
        };
    })
;

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
angular.module('flymvo.module.transition', [])
    .factory('$transition', ['$q', '$timeout', '$rootScope', function ($q, $timeout, $rootScope) {

        var $transition = function (element, trigger, options) {
            options = options || {};
            var deferred = $q.defer();
            var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

            var transitionEndHandler = function (event) {
                $rootScope.$apply(function () {
                    element.unbind(endEventName, transitionEndHandler);
                    deferred.resolve(element);
                });
            };

            if (endEventName) {
                element.bind(endEventName, transitionEndHandler);
            }

            // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
            $timeout(function () {
                if (angular.isString(trigger)) {
                    element.addClass(trigger);
                } else if (angular.isFunction(trigger)) {
                    trigger(element);
                } else if (angular.isObject(trigger)) {
                    element.css(trigger);
                }
                //If browser does not support transitions, instantly resolve
                if (!endEventName) {
                    deferred.resolve(element);
                }
            });

            // Add our custom cancel function to the promise that is returned
            // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
            // i.e. it will therefore never raise a transitionEnd event for that transition
            deferred.promise.cancel = function () {
                if (endEventName) {
                    element.unbind(endEventName, transitionEndHandler);
                }
                deferred.reject('Transition cancelled');
            };

            return deferred.promise;
        };

        // Work out the name of the transitionEnd event
        var transElement = document.createElement('trans');
        var transitionEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionend'
        };
        var animationEndEventNames = {
            'WebkitTransition': 'webkitAnimationEnd',
            'MozTransition': 'animationend',
            'OTransition': 'oAnimationEnd',
            'transition': 'animationend'
        };

        function findEndEventName(endEventNames) {
            for (var name in endEventNames) {
                if (transElement.style[name] !== undefined) {
                    return endEventNames[name];
                }
            }
        }

        $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
        $transition.animationEndEventName = findEndEventName(animationEndEventNames);
        return $transition;
    }]);

/**
 * @description: Demo service
 * @author: Patrick.he
 **/
angular.module('flymvo.demo.service', [])
    .factory('demoResource', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var demoResource;
            if ($globalSetting.isMockEnv) {
                demoResource = $resource('/mock/order/orders.json', {id: '@id'},
                    {
                        'query': {method: 'GET', isArray: false},
                        'get': {url: '/mock/order/:id/main.json' },
                        'getShipment': {url: '/mock/order/:id/shipments.json' },
                        'getPayment': {url: '/mock/order/:id/payment.json' },
                        'getComment': {url: '/mock/order/:id/comment.json' },
                        'getChannel': {url: '/mock/order/channelIds.json' },
                        'salesImport': {method: "GET", params: {channelId: '@channelId', importFilePath: '@importFilePath'}, url: '/mock/order/import.json'},
                        'edit': {url: 'mock/order/:id/edit.json'},
                        'unlock': {url: 'mock/order/:id/unlock.json'},
                        'handle': {url: 'mock/order/:id/handle.json'},
                        'suspend': {url: 'mock/order/:id/suspend.json'},
                        'start': {url: 'mock/order/:id/start.json'}

                    }
                );
            } else {
                demoResource = $resource('/salesOrder/search', {id: '@id'},
                    {
                        'query': {method: 'POST', isArray: false},
                        'get': {url: '/salesOrder/:id' },
                        'getShipment': {url: '/salesOrder/:id/shipment' },
                        'getPayment': {url: '/salesOrder/:id/payment' },
                        'getComment': {url: '/salesOrder/:id/comment' },
                        'getChannel': {url: '/salesOrder/channelIds' },
                        'salesImport': {method: 'POST', url: '/salesImport/doSalesImport'},
                        'edit': {url: '/salesOrder/:id/edit'},
                        'unlock': {url: '/salesOrder/:id/unlock'},
                        'handle': {url: '/salesOrder/:id/handle'},
                        'suspend': {url: '/salesOrder/:id/suspend'},
                        'start': {url: '/salesOrder/:id/start'}
                    }
                );
            }
            return demoResource;
        }]);

/**
 * @description: Services 集合器。所有需要注入app的service都要在这里注册
 * @author: Patrick.he
 **/

angular.module('flymvo.services', [
    'flymvo.demo.service',
    'flymvo.login.service',
    'flymvo.authMenu.service',
    'flymvo.product.service',
    'flymvo.promo.service',
     'flymvo.coupon.service',
    'flymvo.consult.service',
    'flymvo.category.service',
    'flymvo.file.service',
    'flymvo.logistics.service',
    'flymvo.cookie.service',
    'flymvo.logistics.service',
    'flymvo.finance.service',
    'flymvo.address.service',
    'flymvo.order.service',
    'flymvo.refund.service',
    'flymvo.message.service',
    'flymvo.account.service'
]);

/**
 * @name brandInfoCtrl
 * @author Allen.Chan
 * @time 2014/11/14
 **/
angular.module("flymvo.account.brandInfoCtrl", [])
    .controller("brandInfoCtrl", [
        '$compile',
        '$scope',
        '$window',
        '$upload',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        '$rootScope',
        '$state',   
        'commonConstants',
        'fileService',
        'accountService',
        function ($compile, $scope, $window, $upload, $filter, $timeout, $stateParams,$globalSetting , $rootScope, $state ,commonConstants, fileService, accountService) {
            //==================================== 变量 =========================================
            
            $scope.brands = {}; 
            /*if($globalSetting.isMockEnv){
                $scope.account = [{

                    brandName: 'hha',
                    brandCode: 'XXXXdfXX',
                    imageUrl1: "http://dummyimage.com/200x200/9c9464&text=Anthony",
                    imageUrl2: "http://dummyimage.com/200x200/9c9464&text=Anthony"
                }
                ,
                {

                    brandName: 'hha',
                    brandCode: 'XXXwewXXX',
                    imageUrl1: "http://dummyimage.com/200x200/9c9464&text=Anthony",
                    imageUrl2: "http://dummyimage.com/200x200/9c9464&text=Anthony"
                }
                ];
            }*/
            //==================================== 函数 =========================================
             
            $scope.reloadBrandInfo = function(){
               //读取厂商数据  
                accountService.getBrandInfo().$promise.then(function (resp){
                    if(resp.success === true){    
                        $scope.brands= resp.models;   
                    } else if(resp.success === false){ 
                        $scope.brands =null;
                    }
                });
            };


            //上传品牌Logo图片
            $scope.uploadLogoImage = function ($files,index){

                $scope.uploadFile = { url: "" };
                var file = $files[0];

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                }

                $scope.brands[index].uploadingLogo = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                    var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.brands[index].uploadPercent = uploadPercent;
                }).success(function (data, status, headers, config) {
                    //var uploadResult = data.models;
                    if(data.models && data.models[0].success){
                        //$scope.brands[index].pcImgUrl =  "";
                        $scope.brands[index].logoImgUrl = data.models[0].url;
                        accountService.uploadImage({
                            "brandId":$scope.brands[index].brandId,
                            "pcImgUrl":null,
                            "mobileImgUrl":null,
                            "logoImgUrl":$scope.brands[index].logoImgUrl
                        }).$promise.then(function (resp){
                                if(resp.success === true){
                                    $scope.reloadBrandInfo();
                                    var timer = $timeout(
                                        function() {
                                            $window.alert("上传成功");
                                        },
                                        100
                                    );
                                }
                                else{
                                    alert("上传失败");
                                }
                            });
                        //$scope.uploadFile.url = data.models[0].url;
                        // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;
                    } else if (data.models && !data.models[0].success){
                        $window.alert(data.models[0].message);
                    }

                    $scope.brands[index].uploadingLogo = false;

                }).error(function (data, status, headers ,config) {
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                    $scope.brands[index].uploadingLogo = false;
                });
            };

            //上传PC端图片
            $scope.uploadBrandPcImage = function ($files,index){  

                $scope.uploadFile = { url: "" }; 
                var file = $files[0];

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                }  

                $scope.brands[index].uploadingPc = true; 
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {   
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.brands[index].uploadPercent = uploadPercent; 
                }).success(function (data, status, headers, config) { 
                        //var uploadResult = data.models;     
                        if(data.models && data.models[0].success){    
                            //$scope.brands[index].pcImgUrl =  "";
                            $scope.brands[index].pcImgUrl = data.models[0].url;   
                            accountService.uploadImage({
                                "brandId":$scope.brands[index].brandId, 
                                "pcImgUrl":$scope.brands[index].pcImgUrl,
                                "mobileImgUrl":null
                            }).$promise.then(function (resp){
                             if(resp.success === true){

                                 $scope.reloadBrandInfo();
                                 var timer = $timeout(
                                     function() {
                                         $window.alert("上传成功");
                                     },
                                     100
                                 );
                             }
                             else{
                                alert("上传失败");
                             }
                           });
                            //$scope.uploadFile.url = data.models[0].url;
                            // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;   
                        } else if (data.models && !data.models[0].success){ 
                            $window.alert(data.models[0].message);
                        } 

                       $scope.brands[index].uploadingPc = false;

                }).error(function (data, status, headers ,config) { 
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                    $scope.brands[index].uploadingPc = false; 
                }); 
            };

            //上传移动端图片
            $scope.uploadBrandMobileImage = function ($files,index){  

                var file = $files[0]; 
                $scope.uploadFile = { url: "" };

                if(Math.round(file.size / 1024 * 100 )/ 100 >= 500){
                    $window.alert("文件'"+file.name+"'的大小超过500KB，不能上传。");
                    return;
                }
                else if(["image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'"+file.name+"'的文件格式，不能上传。");
                    return;
                } 
                /*if($scope.brands[index].pcImgUrl != $scope.brandsSave[index].pcImgUrl){
                    $scope.brands[index].uploadingPc = true;
                }
                if($scope.brands[index].mobileImgUrl != $scope.brandsSave[index].mobileImgUrl){
                    $scope.brands[index].uploadingMb = true;
                }*/

                $scope.brands[index].uploadingMb = true; 
                $upload.upload({
                    url: '/data/upload/image',
                    data:{
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) { 
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.brands[index].uploadPercent = uploadPercent;
                }).success(function (data, status, headers, config) {
                       if(data.models && data.models[0].success){    
                            //$scope.brands[index].mobileImgUrl = "";
                            $scope.brands[index].mobileImgUrl=  data.models[0].url;  
                             accountService.uploadImage({
                                "brandId":$scope.brands[index].brandId, 
                                "pcImgUrl":null,
                                "mobileImgUrl":$scope.brands[index].mobileImgUrl
                            }).$promise.then(function (resp){
                             if(resp.success === true){

                                $scope.reloadBrandInfo();
                                var timer = $timeout(
                                function() { 
                                                $window.alert("上传成功");  
                                            },
                                    100
                                );
                             }
                             else{
                                alert("上传失败");
                             }
                               
                           });
                            //$scope.uploadFile.url = data.models[0].url;
                            // $scope.brand[index].mobileImgUrl =  $scope.brand[index].mobileImgUrl;    
                        } else if (data.models && !data.models[0].success){ 
                            $window.alert(data.models[0].message);
                        } 
                       $scope.brands[index].uploadingMb = false;
                }).error(function (data, status, headers ,config) { 
                    if (data && data.resultCode === "501"){
                        $window.alert("上传成功");
                    } else{
                        $window.alert("上传失败");
                    }
                       $scope.brands[index].uploadingMb = false; 
                });

            };
            //==================================== 初始化 =======================================
            $scope.$changeCurrMenuByCode('mvo_account_brand_info'); 

            $scope.reloadBrandInfo();

           /* $scope.$watch("uploadFile", function(){ 
                  $scope.reloadBrandInfo();
            });  */


        }]);
     
    
  
/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.account.controllers', [
  'flymvo.account.updatePasswordCtrl',
  'flymvo.account.manufacturerInfoCtrl',
  'flymvo.account.brandInfoCtrl'
]);

angular.module("flymvo.account.manufacturerInfoCtrl", [])
    .controller("manufacturerInfoCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$globalSetting',
        '$stateParams',
        '$rootScope',
        '$state',
        'accountService',
        'logisticsService',
        function ($scope, $filter, $timeout, $window, $globalSetting, $stateParams, $rootScope, $state, accountService, logisticsService) {

            //-- =======================================变量===========================================
            //-- html模板
            $scope.templates = {
                //商城部分(查看模式)
                storeSection4ViewMode: '/html/account/include/viewManufacturerInfo4Store.html?tag=' + $globalSetting.version,
                //商城部分(编辑模式)
                storeSection4EditMode: '/html/account/include/editManufacturerInfo4Store.html?tag=' + $globalSetting.version
            };

            //商城panel 变量
            $scope.storePanel = {
            };

            //编辑对象
            $scope.mftModel = {};

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];

            //-- =======================================函数===========================================

            //获取省份城市函数
            function getRegions(regionArray, parentId, callback) {
                if(angular.isUndefined(parentId) || parentId==='') return;
                logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                    regionArray.splice(0, regionArray.length);
                    for(var i=0, len=resp.models.length; i<len; i++) {
                        regionArray.push(resp.models[i]);
                    }
                    if(callback) callback();
                });
            }

            $scope.changeState = function(){
                getRegions($scope.cityArray, $scope.mftModel.locationStateId, function(){
                    $scope.mftModel.locationCityId = $scope.cityArray[0].regionId;
                });
            };

            //获得供应商信息
            $scope.getManufacturerInfo = function(){
                accountService.getManufacturerInfo().$promise.then(function (resp) {
                    if (resp.success === false) {
                        $scope.manufacturerInfo = null;
                        $scope.message = resp.message;
                    } else if (resp.success === true) {
                        $scope.manufacturerInfo = resp.model;
                        //将string类型转为int类型
                        if($scope.manufacturerInfo.locationStateId){
                            $scope.manufacturerInfo.locationStateId = parseInt($scope.manufacturerInfo.locationStateId);
                        }
                        if($scope.manufacturerInfo.locationCityId){
                            $scope.manufacturerInfo.locationCityId = parseInt($scope.manufacturerInfo.locationCityId);
                        }

                    }
                });
            };


            //store panel进入只读模式
            $scope.viewStore = function(){
                $scope.storePanel.currTemplate = $scope.templates.storeSection4ViewMode;
                $scope.hasCommit = false;
            };

            //store panel进入编辑模式
            $scope.editStore = function(){
                $scope.storePanel.currTemplate = $scope.templates.storeSection4EditMode;
                //获取省份
                getRegions($scope.stateArray, 1);
                //将只读对象的数据拷贝到待编辑对象
                $scope.mftModel = {
                    mftNameAlias : $scope.manufacturerInfo.mftNameAlias,
                    hotline : $scope.manufacturerInfo.hotline,
                    isShowHotline : $scope.manufacturerInfo.isShowHotline,
                    locationStateId : $scope.manufacturerInfo.locationStateId,
                    locationCityId : $scope.manufacturerInfo.locationCityId
                };

                if($scope.mftModel.locationCityId){
                    getRegions($scope.cityArray, $scope.mftModel.locationStateId);
                }
                if(angular.isUndefined($scope.mftModel.isShowHotline)){
                    $scope.mftModel.isShowHotline = 0;
                }
            };

            //保存商城展示信息
            $scope.saveStore = function(){
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#storeForm :input.ng-invalid');
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
                if(!flag){
                    return;
                }

                var location = "";
                angular.forEach($scope.stateArray, function(state, index){
                    if(state.regionId == $scope.mftModel.locationStateId){
                        location += state.regionName;
                    }
                });

                angular.forEach($scope.cityArray, function(city, index){
                    if(city.regionId == $scope.mftModel.locationCityId){
                        location += " " + city.regionName;
                    }
                });

                $scope.mftModel.location = location;

                accountService.saveStoreInfo($scope.mftModel).$promise.then(function (resp) {
                    if (resp.success) {
                        //获取供应商信息
                        $scope.getManufacturerInfo();
                        $scope.viewStore();
                    } else {
                        $window.alert(resp.message);
                    }
                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                    }

                });
            };


            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_account_info');

            //获取供应商信息
            $scope.getManufacturerInfo();

            $scope.viewStore();

        }]);
/**
 * @name updatePasswordCtrl
 * @author caibin
 * @time 2014/10/8
 **/
angular.module("flymvo.account.updatePasswordCtrl", [])
    .controller("updatePasswordCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$rootScope',
        '$state',
        'accountService',
        function ($scope, $filter, $timeout, $stateParams, $rootScope, $state, accountService) {
            $scope.$changeCurrMenuByCode('mvo_account_change_password');
            $scope.account = {};
            $scope.account.newPassword = "";

            $scope.updatePassword = function () {
                //密码用md5加密
                var newPw = hex_md5($scope.account.newPassword),
                    newPwCon = hex_md5($scope.account.newPasswordAgain),
                    oldPw = hex_md5($scope.account.oldPassword);
                accountService.updatePassword({'oldPw': oldPw, 'newPw': newPw, 'newPwCon': newPwCon}).$promise.then(function (resp) {
                    //成功
                    if (resp.success === true) {
                        $scope.successMsg = resp.message;
                        $scope.isSuccess = resp.success;
                        $scope.account.oldPassword = "";
                        $scope.account.newPassword = "";
                        $scope.account.newPasswordAgain = "";
                    }
                    //出错
                    else {
                        $scope.isSuccess = resp.success;
                        $scope.errorMsg = resp.message;
                    }
                });
            };


        }])
    //密码强度指示条 ：http://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password
    .directive('checkStrength', function () {
        return {
            replace: false,
            restrict: 'EACM',
            link: function ($scope, iElement, iAttrs) {
                var strength = {
                    colors: ['#F00', '#F90', '#FF0', '#0F0'],
                    measureStrength: function (p) {

                        var _force = 0;//强度
                        var _regex = /[~!@#$%^&*()_+,\.\/\?\'\;\:]/g; //符号正则表达式

                        var _lowerLetters = /[a-z]+/.test(p);//小写符号
                        var _upperLetters = /[A-Z]+/.test(p);//大写符号
                        var _numbers = /[0-9]+/.test(p);//数字
                        var _symbols = _regex.test(p);//符号

                        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                        var _passedMatches = $.grep(_flags,function (el) {
                            return el === true;
                        }).length;

                        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                        _force += _passedMatches * 10;

                        // 短密码
                        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

                        // 字符种类单一
                        _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                        _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                        _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

                        return _force;

                    },
                    getColor: function (s) {
                        var idx = 0;
                        if (s <= 10) {
                            idx = 0;
                        }
                        else if (s <= 20) {
                            idx = 1;
                        }
                        else if (s <= 30) {
                            idx = 2;
                        }
                        else if (s <= 40) {
                            idx = 3;
                        }
                        else {
                            idx = 4;
                        }
                        return { idx: idx + 1, col: this.colors[idx] };
                    }
                };
                //根据viewValue的值来判定强度
                var updatePasswordStrength = function (viewValue) {
                    if (viewValue || viewValue !== '') {
                        var force = strength.measureStrength(viewValue);
                        var color = strength.getColor(force);
                        iElement.css({ "display": "inline" });
                        iElement.children('li')
                            .css({ "background": "#DDD"})
                            .slice(0, color.idx)
                            .css({ "background": color.col, "color": "#FFF" });
                    } else {
                        iElement.children('li')
                            .css({"background": "#DDD", "color": "#000"});
                    }
                    return viewValue;
                };
                $scope.form[iAttrs.checkStrength].$parsers.unshift(updatePasswordStrength);
                $scope.form[iAttrs.checkStrength].$formatters.unshift(updatePasswordStrength);
            },
            template: '<li class="password-strength-point">弱</li><li class="password-strength-point">中</li><li class="password-strength-point">强</li>'
        };
    });
  
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
angular.module('flymvo.coupon.checkCouponDetailCtrl',[])
    .controller('checkCouponDetailCtrl',[
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
    		 
            $scope.couponDetail = { 
             }; 
 
    		//==============================================函数===================================================
            //刷新页面,根据传过来的参数进行判断
            $scope.$on("checkCouponDetail",function(){  
                if(!$scope.$couponId){ 
                }
                else{
                    $scope.loadDetail();
                }   
            }); 
             
            //重新加载
            $scope.loadDetail = function(){   
                couponService.queryDetail({"couponId": $scope.$couponId}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.couponDetail = resp.model;  
                    }
                });
            };
            
           

    		//==============================================初始化=================================================
            $scope.loadDetail();

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");
    	}
]);
angular.module('flymvo.coupon.couponDetailCtrl',[])
    .controller('couponDetailCtrl',[
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
            

            //重新加载
            $scope.loadDetail = function(){   
                couponService.queryDetail({"couponId": $scope.$couponId}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.couponDetail = resp.model;   
                        if($scope.couponDetail.min_buy_amount === "0.00"){
                            //$("#condition1").attr("checked",false);
                            $("input[name=condition][value=0]").attr("checked",true);
                            //$("#condition2").attr("checked",false);
                            $('#minBuyAmount').attr("disabled",true);
                        }
                        else{
                            //$("#condition1").attr("checked",false);
                            $("input[name=condition][value=1]").attr("checked",true);
                           // $("#condition2").attr("checked",true);
                        }
                    }
                });
            };

            var _destoryPopover = function(){
                $(this).popover('destory');
            }; 
            //保存
            $scope.saveOrUpdate = function(couponDetail,isValid){  
                //alert(isValid); 
                //$('#date_start').popover('destory');
               // $('#date_end').popover('destory');
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

                 if (isValid) {  
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
                                "status": 1,
                                "couponId": couponId
                            }
                        ).$promise.then(function(resp){
                            if(resp.success === true){
                                alert("操作成功"); 
                                $scope.hasCommit = false; 
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
                    $("#condition1").attr("checked",true);
                    $("#condition2").attr("checked",false);
                }else{   
                    $scope.hasAmount = true;
                    $('#minBuyAmount').attr("disabled",false);
                    //$('#minAmount').addClass("has-error"); 
                    //$scope.couponDetailForm.min_buy_amount.$error = true;
                    $('#amountAlert').show();  
                    $("#condition1").attr("checked",false);
                    $("#condition2").attr("checked",true);
                }
            };


    		//==============================================初始化=================================================

            $scope.loadDetail();

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");
    	}
]);
angular.module('flymvo.coupon.couponListCtrl',[])
    .controller('couponListCtrl',[
        '$compile',
    	'$scope',
    	'$filter',
    	'$stateParams',
    	'$globalSetting',
    	'ngTableParams', 
    	'$rootScope',
    	'$state',
        'couponService',
        'couponConstants',
    	function ($compile, $scope, $filter, $stateParams, $globalSetting, TableParams, $rootScope, $state, couponService, couponConstants){
    		"use strict";

    		//==============================================变量===================================================
            //-- 是否已加载完成
            $scope.$loaded = false;

    		$scope.templates = { 
    			 couponTable: '/html/coupon/couponTable.html?tag=' + $globalSetting.version,
    			 couponDetail: '/html/coupon/couponDetail.html?tag=' + $globalSetting.version,
                 checkCouponDetail: '/html/coupon/checkCouponDetail.html?tag=' + $globalSetting.version
    		};
            //查询条件
            $scope.query = {
                name: null,
                dateFrom: null,
                dateTo: null,
                discountAmountFrom: null,
                discountAmountTo:null,
                isShow:null
            };
            //保存查询条件 
            $scope.querySaved = angular.copy($scope.query);

            $scope.queryOrigin = angular.copy($scope.query);
            //下拉框状态
           

            $scope._couponConstants = couponConstants;
    		//==============================================函数===================================================
            //重新加载列表
            $scope.reloadList = function (){
                $scope.couponTableParams.reload();
            };

            //搜索
            $scope.search = function(){ 
                 if($scope.couponSearchForm.$invalid){ 
                    $('#couponSearchForm :input .ng-invalid').first().focus();
                 }else{ 
                    $("#couponSearchForm #couponSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.couponTableParams.reload();
                 }
            };
 
            //删除
            $scope.deleteCoupon = function(coupon){  
                if(confirm("您确认删除'"+coupon.name+"'吗？")){
                    couponService.remove({"couponId": coupon.coupon_id}).$promise.then(function (resp) {
                        if(resp.success === true){
                            alert("删除成功");
                            $scope.reloadList();
                        }else{
                            alert("删除失败");
                        }
                    });
                }
            };
            //添加优惠券
            $scope.addCoupon = function(){ 
                
                  
                $('#couponDetailPage').empty().append('<div ng-controller="addCouponCtrl" ng-include="\'/html/coupon/couponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#couponDetailPage').contents())($scope); 
                 
                $('#couponDetailPage').slideDown("fast"); 
                $('#couponListPage').hide();
                $('#checkCouponDetailPage').hide();
                //$scope.$enableEditInfo = true; 
                $scope.$couponId = null; 
            };

            //编辑优惠券
            $scope.updateCoupon = function(couponId){   

                $scope.$couponId = couponId; 
                
                $('#couponDetailPage').empty().append('<div ng-controller="couponDetailCtrl" ng-include="\'/html/coupon/couponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#couponDetailPage').contents())($scope);  
                
                $('#couponDetailPage').slideDown("fast");
                $('#couponListPage').hide();
                $('#checkCouponDetailPage').hide();

                 
            };

            //上架--1 /下架--2
            $scope.handleCoupon = function(couponId, isShow){ 
                couponService.updateStatus({
                    "couponId": couponId,
                    "isShow": isShow
                }).$promise.then(function(resp){
                    if(resp.success === true){
                        if(isShow === 1){ 
                           alert("上架成功");
                        }else{
                           alert("下架成功");
                        }
                        $scope.reloadList();
                    }else{
                        if(isShow === 1){ 
                            if(resp.resultCode === "300017"){
                                alert("亲，最多可同时上架派发3张优惠劵哦");
                            }else{ 
                                alert("上架失败");
                           }
                        }else{
                           alert("下架失败");
                        }
                    }
                });
            };
           
            //详细信息页面
            $scope.showDetail = function(couponId){ 

                $scope.$couponId = couponId; 
                $('#checkCouponDetailPage').empty().append('<div ng-controller="checkCouponDetailCtrl"  ng-include="\'/html/coupon/checkCouponDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#checkCouponDetailPage').contents())($scope);

                $('#checkCouponDetailPage').slideDown("fast");
                $('#couponListPage').hide();
                $('#couponDetailPage').hide(); 
            };

            //返回列表
            $scope.backToList = function(){
                
                $('#couponListPage').show();
                $('#couponDetailPage').hide(); 
                $('#checkCouponDetailPage').hide();
                $scope.reloadList();
                $scope.$couponId = null;
                $scope.$enableEditInfo = false; 
            };

            //下拉框状态改变时，重新加载
            $scope.statusChange = function (selectedStatus){ 
                if(selectedStatus) {
                    $scope.query.isShow = selectedStatus.value; //$scope.statusReturn(selectedStatus.value);
                } else {
                    $scope.query.isShow = null;  
                    //$scope.isShow = null; 
                }
                $scope.reloadList();
            };
            // //搜索下拉框状态改变时，重新加载
            // $scope.statusChangeSearch = function(selectedStatus){  
            //     if(selectedStatus) {
            //         $scope.query.isShow = selectedStatus.value;// $scope.statusReturn(selectedStatus.value);
            //     } else { 
            //         $scope.query.isShow = null;   
            //     }  
            // };

            //重置
            $scope.reset = function () {
                //将错误移除   
                $scope.couponSearchForm.$setPristine(true);
                //处理验证的field
                $scope.couponSearchForm.discountAmountTo.$setViewValue("");
                $scope.couponSearchForm.discountAmountFrom.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);  
               //   $scope.isShow = null;

            };
           /* //下拉框改变时修改返回数据
            $scope.statusReturn = function(value){
                if(value == 1){//未派发
                    $scope.status = 0;
                    $scope.isShow = 0;
                }
                else if(value == 2){//派发中
                    $scope.status = 1;
                    $scope.isShow = 1;

                }else if(value == 3){ //已派完
                    $scope.status = 1;
                    $scope.isShow = 1;
                }else if(value == 4){ //已结束
                    $scope.status = 0;
                    $scope.isShow = 1; 
                }else{ 
                    $scope.status = null;  
                    $scope.isShow = null; 
                }
            };
*/

    		//==============================================初始化=================================================

    		console.log("enter coupon couponListCtrl");

    		$scope.$changeCurrMenuByCode("mvo_coupon_list");

            //时间转换
            $scope.$watch("query.dateFrom", function () {
                if ($scope.query.dateFrom) { 
                    $scope.query.dateFrom = moment($scope.query.dateFrom).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.dateTo", function () {
                if ($scope.query.dateTo) {
                    $scope.query.dateTo = moment($scope.query.dateTo).format("YYYY-MM-DD");
                }
            });

            $scope.$on("reloadCouponDetail",function(coupon){   
                $scope.$couponId = coupon.targetScope.$couponId;
                if(!$scope.$couponId){ 
                }
                else{
                    $scope.showDetail($scope.$couponId);
                }  

            });


            $scope.couponTableParams = new TableParams({
                page: 1,
                count: 10   
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();
                    //当前状态
                    postData.isShow = $scope.query.isShow;
                    //postData.isShow = $scope.isShow;
                   // console.log(postData);

                    if (postData.dateFrom) {
                        postData.dateFrom = moment(postData.dateFrom).format("YYYY-MM-DD") + " 00:00:00";
                    }
                    if (postData.dateTo) {
                        postData.dateTo = moment(postData.dateTo).format("YYYY-MM-DD") + " 23:59:59";
                    } 
                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                     
                    couponService.query(postData).$promise.then(function (resp) {
                        $('#couponSearchForm #couponSearchBtn').button('reset');
                        if(resp.model){  
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? 
                            $filter('orderBy')(resp.model, params.orderBy()) : resp.model;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.couponList = list;
                            $defer.resolve(list);

                            $scope.$loaded = true;
                        } 
                    });
                    
                     
                }
            });
    	}
]);
/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: allen.chan
 */

angular.module('flymvo.coupon.controllers', [ 
  'flymvo.coupon.couponListCtrl' ,
  'flymvo.coupon.couponDetailCtrl',
  'flymvo.coupon.checkCouponDetailCtrl',
  'flymvo.coupon.addCouponCtrl'
]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.dashboard.controllers', [
  'flymvo.dashboard.welcomeCtrl'
]);

/**
 * @name: 欢迎controller
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.dashboard.welcomeCtrl', [])
    .controller('welcomeCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_dashboard_welcome');

        }

    ]);

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

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: allen
 */

angular.module('flymvo.finance.controllers', [
    'flymvo.finance.financeListCtrl'  
]);

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

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.helpCenter.controllers', [
  'flymvo.helpCenter.helpCenterCtrl'
]);

/**
 * @name: 图片银行控制器
 * @description:
 * @author: Patrick
 * @create : 2014/10/20.
 */

angular.module('flymvo.imageBank.imageBankCtrl', [])
    .controller('imageBankCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        function ($scope, $filter, $timeout, $state, $stateParams,  $globalSetting) {

            //-- =======================================变量===========================================

            //-- =======================================函数===========================================


            //-- =======================================初始化===========================================
            //-- 设置菜单
//            $scope.$changeCurrMenuByCode('mvo_product_add');


        }
    ]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.imageBank.controllers', [
  'flymvo.imageBank.imageBankCtrl'
]);

/** 
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.addressCreateCtrl', [])
    .controller('addressCreateCtrl', [
        '$scope',
        '$state',
        '$filter',
        '$timeout',
        '$templateCache',
        'ngPopover',
        '$globalSetting',
        'logisticsConstants',
        'addressService',
        'logisticsService',
        function ($scope, $state, $filter, $timeout, $templateCache, ngPopover, $globalSetting, logisticsConstants, addressService, logisticsService) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_address_add');

            //-- 初始化常量

            //-- 初始化模型
            $scope.address   = {};
            $scope.hasCommit = false;
            $scope.address.defaultFlag = false;

            //获取省份城市函数
            var getRegions = function(regionArray, parentId, callback) {
              if(!parentId) return;
              logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                regionArray.length = 0;
                for(var i=0, len=resp.models.length; i<len; i++) {
                  regionArray.push(resp.models[i]);
                }
                if(callback) callback();
              });
            };

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = [];

            $scope.$watch('address.stateId', function(newVal, oldVal) {
              getRegions($scope.cityArray, newVal);
              $scope.address.cityId = '';
              $scope.address.areaId = '';
            });
            $scope.$watch('address.cityId', function(newVal, oldVal) {
              getRegions($scope.areaArray, newVal);
              $scope.address.areaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
              //-- 构造省份数组
              $scope._provinceArray = [];
              for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
              }
            });

            //提交表单函数
            $scope.submitForm = function() {
              $scope.hasCommit = true;
              if($scope.addressForm.$valid) {
                addressService.create(angular.toJson($scope.address)).$promise.then(function(resp) {
                  if(resp.success) {
                    alert("添加地址成功");
                    $state.go("main.address");
                  }else{
                    alert("操作失败：" + resp.message);
                  }
                });

              }
            }; 

        }

    ]);

/** 
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.addressEditCtrl', [])
    .controller('addressEditCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$templateCache',
        'ngPopover',
        '$globalSetting',
        'logisticsConstants',
        'addressService',
        'logisticsService',
        '$state',
        '$stateParams',
        function ($scope, $filter, $timeout, $templateCache, ngPopover, $globalSetting, logisticsConstants, addressService, logisticsService, $state, $stateParams) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_address_list');

            //-- 初始化常量
            $scope.addressId = $stateParams.addressId;

            //-- 初始化模型
            $scope.address   = {};
            $scope.hasCommit = false;
            $scope.address.defaultFlag = false;

            //-- 获取地址信息
            addressService.get({addressId: $scope.addressId}).$promise.then(function(resp) {
              $scope.address = resp.model;
            });

            //获取省份城市函数
            var getRegions = function(regionArray, parentId, callback) {
              if(!parentId) return;
              logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                regionArray.length = 0;
                for(var i=0, len=resp.models.length; i<len; i++) {
                  regionArray.push(resp.models[i]);
                }
                if(callback) callback();
              });
            };

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = [];

            $scope.$watch('address.stateId', function(newVal, oldVal) {
              getRegions($scope.cityArray, newVal);
              //$scope.address.cityId = '';
              //$scope.address.areaId = '';
            });
            $scope.$watch('address.cityId', function(newVal, oldVal) {
              getRegions($scope.areaArray, newVal);
              //$scope.address.areaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
              //-- 构造省份数组
              $scope._provinceArray = [];
              for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
              }
            });

            //提交表单函数
            $scope.submitForm = function() {
              $scope.hasCommit = true;
              if($scope.addressForm.$valid) {
                addressService.update(angular.toJson($scope.address)).$promise.then(function(resp) {
                  if(resp.success) {
                    alert("修改地址成功");
                    $state.go("main.address");
                  }else{
                    alert("修改失败：" + resp.message);
                  }
                });

              }
            };


        }

    ]);

/**
 * @name: Main框架控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.addressListCtrl', [])
    .controller('addressListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting',
        'logisticsConstants',
        'addressService',
        'ngTableParams',
        function ($scope, $filter, $timeout, $globalSetting, logisticsConstants, addressService, TableParams) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_address_list');

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化常量
            $scope.addressArray = [];
            $scope.defaultId = 0;

            //-- 获取地址列表
            addressService.query(angular.toJson({
                pageIndex: 1,
                pageSize: 10
            })).$promise.then(function (resp) {
                    $scope.addressArray = resp.models;
                    angular.forEach($scope.addressArray, function (address, index) {
                        if (address.defaultFlag) {
                            $scope.defaultId = index;
                            return;
                        }
                    });
                    $scope.$loaded = true;
                });

            //-- 设为默认按钮
            $scope.setDefault = function (index, tmsMftAddressId) {
                addressService.setDefault({id: tmsMftAddressId}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.addressArray[$scope.defaultId].defaultFlag = false;
                        $scope.defaultId = index;
                        $scope.addressArray[$scope.defaultId].defaultFlag = true;
                        alert("设置成功");
                    } else {
                        alert("设置失败: " + resp.message);
                    }
                });
            };

        }
    ]);

/** 
 * @description: 控制器集合器,包含所有属于logistics模块controller
 * @author: max.huang
 */

angular.module('flymvo.logistics.controllers', [
  'flymvo.logistics.logisticsListCtrl',
  'flymvo.logistics.logisticsSubmitCtrl',
  'flymvo.logistics.addressListCtrl',
  'flymvo.logistics.addressCreateCtrl',
  'flymvo.logistics.addressEditCtrl'
]);

/**
 * @name: Main框架控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.logisticsListCtrl', [])
    .controller('logisticsListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting',
        'logisticsConstants',
        'logisticsService',
        'ngTableParams',
        function ($scope, $filter, $timeout, $globalSetting, logisticsConstants, logisticsService, TableParams) {
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_logistics_list');

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化常量
            $scope._distributionMode = logisticsConstants.distributionMode;
            $scope.distributionMode = 1; //默认配送方式为快递

            //-- 构造省份数组
            $scope._provinceArray = [];
            logisticsService.getRegion({parentId: '1'}).$promise.then(function (resp) {
                $scope._provinceArray.length = 0;
                for (var i = 0, len = resp.models.length; i < len; i++) {
                    $scope._provinceArray[resp.models[i].regionId] = resp.models[i].regionName;
                }
            });

            //-- 获取模板表格数据
            $scope.getLogisticsList = function () {
                $scope.logisticsTables = [];
                var logisticsArray = [];

                logisticsService.query().$promise.then(function (resp) {
                    $scope.logisticsTables = resp.models;
                    angular.copy(resp.models, logisticsArray);

                    var detailVO, group, provinces;
                    for (var j = 0, lenj = $scope.logisticsTables.length; j < lenj; j++) {
                        $scope.logisticsTables[j].group = [];
                        group = $scope.logisticsTables[j].group;
                        for (var i = 0, leni = $scope.logisticsTables[j].detailVOs.length; i < leni; i++) {
                            detailVO = $scope.logisticsTables[j].detailVOs[i];
                            if (!group[detailVO.areaGroup]) {
                                detailVO.provinces = [];
                                group[detailVO.areaGroup] = detailVO;
                            }
                            group[detailVO.areaGroup].provinces.push(detailVO.destStateId);
                        }
                    }
                    $scope.$loaded = true;
                });
            };
            $scope.getLogisticsList();


            //-- 复制模板
            $scope.copyLogistics = function (index) {
                var temp = logisticsArray[index];
                delete temp.transFeeTempId;
                logisticsService.createLogistics(angular.toJson(temp)).$promise.then(function (resp) {

                });
            };

            //-- 删除模板
            $scope.deleteLogistics = function (transFeeTempId, index) {
                if (confirm('确认删除运费模板"' + $scope.logisticsTables[index].transFeeTempName + '"?')) {
                    logisticsService.deleteLogistics({transFeeTempId: transFeeTempId}).$promise.then(function (resp) {
                        if (resp.success) {
                            $scope.logisticsTables.splice(index, 1);
                            alert("删除成功");
                        } else {
                            alert("删除失败： " + resp.message);
                        }
                    });
                }

            };


        }
    ]);

/** 
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.logistics.logisticsSubmitCtrl', [])
    .controller('logisticsSubmitCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$templateCache',
        'ngPopover',
        '$globalSetting',
        'logisticsConstants',
        'logisticsService',
        '$state',
        '$stateParams',
        function ($scope, $filter, $timeout, $window, $templateCache, ngPopover, $globalSetting, logisticsConstants, logisticsService, $state, $stateParams) {
            //-- 设置菜单
            if(!$scope.$fromProduct){
                $scope.$changeCurrMenuByCode('mvo_logistics_add');
            }

            //-- 初始化常量
            $scope.transFeeTempId = $stateParams.transFeeTempId;

            //-- 初始化模型
            $scope.logistics = {};
            $scope.logistics.detailVOs = [];
            $scope.logistics.feeChargedBy = '0';
            $scope.logistics.caculateType = '0';
            //$scope.logistics.originStateId = '1';
            //$scope.logistics.originCityId = '1';
            //$scope.logistics.originAreaId = '1';

            $scope.regions   = [];
            $scope.hasCommit = false;

            $scope.detailVO = {};
            $scope.detailVO.provinces = [];

            if($scope.transFeeTempId) {
                //-- 获取模板信息
                logisticsService.get({transFeeTempId: $scope.transFeeTempId}).$promise.then(function(resp) {
                    $scope.logistics = resp.model;

                    var detailVO, regions, provinces;
                    regions = $scope.regions;

                    for(var i=0, len=$scope.logistics.detailVOs.length; i<len; i++) {
                        detailVO = {};
                        angular.copy($scope.logistics.detailVOs[i], detailVO);
                        if(!regions[detailVO.areaGroup]) {
                            detailVO.provinces = [];
                            detailVO.detailIds = [];
                            regions[detailVO.areaGroup] = detailVO;
                        }
                        regions[detailVO.areaGroup].provinces.push(detailVO.destStateId);
                        regions[detailVO.areaGroup].detailIds.push(detailVO.transFeeTempDetailId);
                    }

                    for(i=0, len=$scope.regions.length; i<len; i++)  {
                        if(!$scope.regions[i])
                            $scope.regions.splice(i, 1);
                    }

                });
            }

            //获取省份城市函数
            var getRegions = function(regionArray, parentId, callback) {
                if(_.isUndefined(parentId) || parentId==='') return;
                logisticsService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                    regionArray.length = 0;
                    for(var i=0, len=resp.models.length; i<len; i++) {
                        regionArray.push(resp.models[i]);
                    }
                    if(callback) callback();
                });
            };

            //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = [];

            $scope.$watch('logistics.originStateId', function(newVal, oldVal) {
                getRegions($scope.cityArray, newVal);
                if(oldVal !== undefined) $scope.logistics.originCityId = '';
                //$scope.logistics.originAreaId = '';
            });
            $scope.$watch('logistics.originCityId', function(newVal, oldVal) {
                getRegions($scope.areaArray, newVal);
                if(oldVal !== undefined) $scope.logistics.originAreaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
                //-- 构造省份数组
                $scope._provinceArray = [];
                for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                    $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
                }
            });

            $scope.$on('ng-popover-show', function() {
            });


            //提交表单
            $scope.submitForm = function(isEdit) {

                $scope.hasCommit = true;
                var valid = false;
                if($scope.$fromProduct){
                    valid = $scope.$$childHead.logisticsForm.$valid;
                }else{
                    valid = $scope.logisticsForm.$valid;
                }
                if(valid) {

                  // 过滤regions数组里面不正确的输入
                  for (var index=0, region=$scope.regions[0]; index<$scope.regions.length; index++) {
                    region=$scope.regions[index];
                    if (!region.provinces.length ||  //验证省份数组
                        isNaN(region.firstValue + region.firstPrice + region.addValue + region.addPrice) || //验证是否数字
                        region.firstValue<0 || region.firstPrice<0 || region.addValue<0 || region.addPrice<0 //验证数字是否小于零
                       ) {
                      //$scope.regions.splice(index, 1);
                      //index--;
                      return;
                    }
                  }

                    var tempi, tempj;
                    $scope.logistics.detailVOs.length = 0;
                    for(i=0, leni=$scope.regions.length; i<leni; i++) {
                        tempi = {};
                        angular.copy($scope.regions[i], tempi);
                        for(var j=0, lenj=tempi.provinces.length; j<lenj; j++){
                            tempj = {};
                            angular.copy(tempi, tempj);
                            tempj.destStateId = tempj.provinces[j];

                            if(tempj.transFeeTempDetailId)
                              delete tempj.transFeeTempDetailId;

                            tempj.areaGroup = i;

                            tempj.firstPriceUnit = '元';
                            tempj.addPriceUnit = '元';
                            tempj.firstUnit = 'kg';
                            tempj.addUnit = 'kg';

                            delete tempj.provinces;
                            if(tempj.detailIds)
                                delete tempj.detailIds;

                            $scope.logistics.detailVOs.push(tempj);
                        }
                    }
                    //如果是编辑的话要传入id，添加则不用
                    if(!isEdit)
                      delete $scope.logistics.transFeeTempId;
                    logisticsService.createLogistics(angular.toJson($scope.logistics)).$promise.then(function(resp) {
                        if($scope.$fromProduct){
                            //将新的模板id回传给商品创建或者编辑页面
                            $scope.$emit('finishAddLogisticsTemplateEvent',resp.model.transFeeTempId);
                        }else{
                            $window.alert("添加费模板成功");
                            $state.go("main.logistics");
                        }
                    });

                }
            };


            //指定区域数组
            $scope.regionsDelete = function(index) {
              $scope.regions.splice(index, 1);
            };

            $scope.addRegion = function() {
              var tmp = {};
              tmp.provinces = [];
              $scope.regions.push(tmp);
            };

        }

    ])
;

/**
 * @name: 顶部模块提醒控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.alertCtrl', [])
    .controller('alertCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/alertDropdown.html?tag='+$globalSetting.version
            };


        }

    ]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.main.controllers', [
  'flymvo.main.loginCtrl',
  'flymvo.main.mainCtrl',
  'flymvo.main.topMenuCtrl',
  'flymvo.main.alertCtrl',
  'flymvo.main.userCtrl',
  'flymvo.main.leftMenuCtrl',
  'flymvo.main.sidebarSearchCtrl'
]);

/**
 * @name: 左边栏菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.leftMenuCtrl', [])
    .controller('leftMenuCtrl', [
        '$scope',
        '$state',
        '$filter',
        '$timeout',
        '$globalSetting',
        function ($scope, $state, $filter, $timeout, $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/leftMenu.html?tag='+$globalSetting.version
            };


        }
    ]);

/**
 * @name: 登陆模块控制器
 * @description:
 * @author: Max.huang
 * @create : 2014/10/8.
 */

angular.module('flymvo.main.loginCtrl', [])
  .controller('loginCtrl', [
    '$scope',
    '$state',
    '$globalSetting',
    'loginService',
    function ($scope, $state, $globalSetting, loginService) {

      // 初始化
      $scope.login = {};
      $scope.error = {};
      $scope.error.result = 1;
      $scope.hasCommit = false;
      var tempPassword;


      //获取验证码图片
      $scope.getVerification = function() {
        $('#verification img').remove();
        //$('#verification').append('<img src="http://dummyimage.com/55x24/000/FFF?'+ Math.random() +'" width="55" height="24" align="absmiddle">');
        $('#verification').append('<img src="/data/upms/kaptcha?'+ Math.random() +'" width="55" height="24" align="absmiddle">');
      };

      //提交登陆表单
      $scope.submitLogin = function() {
        $scope.hasCommit = true;
        tempPassword = $scope.login.password;

        if($scope.loginForm.$valid) {
          $scope.login.password = hex_md5($scope.login.password);
          loginService.save($scope.login).$promise.then(function(resp) {
            $scope.error = resp;
            console.log(resp);

            if($scope.error.result) {
              $state.go('main.welcome');
            }else{
              $scope.getVerification();
              $scope.login.verification = '';
              $scope.login.password = tempPassword;
              return;
            }

          });
        }

      };

    }
  ]);

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

/**
 * @name: 左边栏菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.sidebarSearchCtrl', [])
    .controller('sidebarSearchCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/sidebarSearch.html?tag='+$globalSetting.version
            };


        }

    ]);

/**
 * @name: 顶部模块菜单控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.topMenuCtrl', [])
    .controller('topMenuCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/topMenu.html?tag='+$globalSetting.version
            };
        }

    ]);

/**
 * @name: 顶部模块用户dropdown控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.main.userCtrl', [])
    .controller('userCtrl', [
        '$scope',
        '$filter',
        '$globalSetting',
        function ($scope, $filter,  $globalSetting) {
            //-- 定义模板
            $scope.templates = {
                //-- detail
                "detail" : '/html/main/userDropdown.html?tag='+$globalSetting.version
            };


        }

    ]);

/**
 * @name: 问题运单号控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.errTrackingNoListCtrl', [])
    .controller('errTrackingNoListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        'ngTableParams',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedErrTrackingNo = false;

            //-- 3= 问题订单号列表
            $scope.$backTo = 3;

            //模板
            $scope.templates = {
                errTrackingNoTable: '/html/order/include/errTrackingNoTable.html?tag=' + $globalSetting.version,
                updateTrackingNoModal: '/html/order/include/updateTrackingNoModal.html?tag=' + $globalSetting.version,
                errTrackingNoDetailModal: '/html/order/include/errTrackingNoDetailModal.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: null,
                transportNo: null,
                orderTimeBegin: null,
                orderTimeEnd: null,
                deliveryTimeBegin: null,
                deliveryTimeEnd: null,
                carrierCode: null,
                handlingStatus: 1  //默认是“未处理”
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);
            $scope.queryOrigin = angular.copy($scope.query);


            //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.errTrackingNoTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if($scope.errTrackingNoSearchForm.$invalid){
                    $('#errTrackingNoSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#errTrackingNoSearchForm #errTrackingNoSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.errTrackingNoTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.errTrackingNoSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //获取物流公司
            $scope.listLogisticsCompanies = function () {
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因：" + resp.message);
                    }
                });
            };


            //查看详情Modal
            $scope.checkTrackingNoDetail = function(orderNo){
                orderService.searchTrackingNoLog({orderNo:orderNo}).$promise.then(function(resp){
                    if (resp.success) {
                        $scope.trackingNoLogDetail = resp.models[0];
                        $('#errTrackingNoDetailModal').modal('show');
                    }
                });
            };
            //关闭详情Modal
            $scope.closeTrackingNoDetail = function(){
                $('#errTrackingNoDetailModal').modal('hide');
            };

            //查看订单详情
            $scope.checkOrderDetail = function(orderNo){
                $scope.$orderNumber = orderNo;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#errTrackingNoListPage').hide();
            };


            //打开修改运单号modal
            $scope.openTrackingNoUpdateModal = function(orderNo, transportNo, carrierCode, tmsAbnormalOrderReportId){
                $scope.trackingNoInfo = {
                    logisticsCompanyOrig : carrierCode,
                    trackingNo:transportNo,
                    trackingNoOrig:transportNo,
                    orderNo:orderNo,
                    tmsAbnormalOrderReportId: tmsAbnormalOrderReportId
                };
                angular.forEach($scope.$logisticsCompanies, function(item, index){
                    if(item.code == $scope.trackingNoInfo.logisticsCompanyOrig){
                        $scope.trackingNoInfo.carrier = item;
                    }
                });

                $('#updateTrackingNoModal .modal-dialog').empty().append('<div ng-controller="trackingNoUpdateCtrl" ng-include="\''+$scope.templates.updateTrackingNoModal+'\'"></div>');
                $compile($('#updateTrackingNoModal').contents())($scope);
                $('#updateTrackingNoModal').modal('show');
            };
            //关闭运单号modal
            $scope.closeTrackingNoUpdateModal = function(){
                $('#updateTrackingNoModal').modal('hide');
            };


            //-- =======================================初始化===========================================

            console.log("enter order errTrackingNoListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_errTrackingNo_list");

            //时间转换
            $scope.$watch("query.orderTimeBegin", function() {
                if($scope.query.orderTimeBegin){
                    $scope.query.orderTimeBegin = moment($scope.query.orderTimeBegin).format("YYYY-MM-DD");
                }
            });

            $scope.$watch("query.orderTimeEnd", function() {
               if($scope.query.orderTimeEnd){
                   $scope.query.orderTimeEnd = moment($scope.query.orderTimeEnd).format("YYYY-MM-DD");
               }
            });

            $scope.$watch("query.deliveryTimeBegin", function() {
                if($scope.query.deliveryTimeBegin){
                    $scope.query.deliveryTimeBegin = moment($scope.query.deliveryTimeBegin).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.deliveryTimeEnd", function() {
                if($scope.query.deliveryTimeEnd){
                    $scope.query.deliveryTimeEnd = moment($scope.query.deliveryTimeEnd).format("YYYY-MM-DD");
                }
            });


            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadErrTrackingNoTable", function () {
                $scope.errTrackingNoTableParams.reload();
            });


            //-- 获取物流公司
            $scope.listLogisticsCompanies();

            //-- 获得列表
            $scope.errTrackingNoTableParams = new TableParams({
                page: 1,
                count: 10
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();

                    if (postData.orderTimeBegin) {
                        postData.orderTimeBegin = postData.orderTimeBegin + " 00:00:00";
                    }
                    if (postData.orderTimeEnd) {
                        postData.orderTimeEnd = postData.orderTimeEnd + " 23:59:59";
                    }
                    if (postData.deliveryTimeBegin) {
                        postData.deliveryTimeBegin = postData.deliveryTimeBegin + " 00:00:00";
                    }
                    if (postData.deliveryTimeEnd) {
                        postData.deliveryTimeEnd = postData.deliveryTimeEnd + " 23:59:59";
                    }

                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    orderService.errTrackingNo(postData).$promise.then(function (resp) {
                        $('#errTrackingNoSearchForm #errTrackingNoSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.trackingNoList = list;
                            $defer.resolve(list);
                            $scope.$loadedErrTrackingNo = true;
                        }
                    });


                }
            });


        }
    ]);
/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.order.controllers', [
  'flymvo.order.orderListCtrl',
  'flymvo.order.orderDetailCtrl',
  'flymvo.order.orderPrintListCtrl',
  'flymvo.order.orderMultiDeliverCtrl',
  'flymvo.order.errTrackingNoListCtrl',
  'flymvo.order.pendTrackingNoListCtrl',
  'flymvo.order.trackingNoUpdateCtrl',
  'flymvo.order.trackingNoLogCtrl',
  'flymvo.order.orderDeliverListCtrl'
]);

/**
 * @name: 订单发货列表
 * @description:
 * @author: allen.chan
 * @create : 2014/12/15.
 */
angular.module('flymvo.order.orderDeliverListCtrl', [])
    .controller('orderDeliverListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        'ngTableParams',
        '$rootScope',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, TableParams, $rootScope, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 订单列表 1  发货列表 2
            $scope.$backTo = 2;

            //订单表模板
            $scope.templates = {
                //发货modal
                orderDeliveryModal: '/html/order/include/orderDeliverModal.html?tag=' + $globalSetting.version,
                //待发货表格
                orderDeliverTable: '/html/order/include/deliverTable.html?tag=' + $globalSetting.version,
                //已发货表格
                orderDeliveredTable: '/html/order/include/deliveredTable.html?tag=' + $globalSetting.version,
                //订单详情
                orderDetail: '/html/order/checkOrderDetail.html?tag=' + $globalSetting.version,
                //批量打印
                batchExport: '/html/order/batchExport.html?tag=' + $globalSetting.version,
                //批量发货
                multiDeliver:'/html/order/include/multiDeliverDetail.html?tag=' + $globalSetting.version
            };


            //查询条件
            $scope.query = {
                number: null,
                skuNumber: null,
                skuName: null,
                receiverName: null,
                orderTotalMin: null,
                orderTotalMax: null
            };

            //默认是待发货
            $scope.query.orderStatus = 35;
            $scope.query.orderStatuss = null;
            //当前的订单标签页
            $scope.currentTab = 1;

            //当前模板
            $scope.listTemplate = $scope.templates.orderDeliverTable;


            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //用于记录选择的订单ID
            $scope.selectedItems = [];
            //用于记录选择的运单号
            $scope.selectedShipmentItems = [];
            //用于记录全部的订单ID
            $scope.selectedItemsForAll = [];
            //用于记录全部的运单号
            $scope.selectedShipmentItemsForAll = [];
            //用于记录选择的订单
            $scope.selectedOrdersArray = [];

            //用于控制发货按钮模态框的内容
            $scope.isDeliver = false;
            //默认不能激活发货功能
            $scope.orderNumberForCanDeliver = null;

            //待发货未浏览记录数量
            $scope.hasWaitForDeliverCount = 0;
            //已发货未浏览记录数量
            $scope.hasDeliveredCount = 0;

            //用于标识是否提交过
            $scope.hasCommit = false;

            //-- =======================================函数===========================================
            //获取格式化后的时间字符串
            function getStringFromDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month <= 9) {
                    month = "0" + month;
                }
                var day = date.getDate();
                return year + "-" + month + "-" + day;
            }

            //获得订单号逗号分隔字符串
            $scope.getOrderNumbers = function(){
                return $scope.selectedShipmentItems.join(",");
            };
            //显示发货单内所有sku
            $scope.showOtherSkus = function(o){
                o.flag4ShowOtherSkus = true;
            };

            //隐藏发货单内除第一个以外的所有skus
            $scope.hideOtherSkus = function(o){
                o.flag4ShowOtherSkus = false;
            };

            //返回订单号字符串
            $scope.isShowOtherSkus = function(o, index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };


            //获取物流公司
            $scope.listLogisticsCompanies = function(){
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因："+resp.message);
                    }
                });
            };

            //--  重置查询函数
            $scope.resetSearch = function () {
                //将错误移除
                $scope.deliverSearchForm.$setPristine(true);
                //处理验证的field
                $scope.deliverSearchForm.orderTotalMin.$setViewValue("");
                $scope.deliverSearchForm.orderTotalMax.$setViewValue("");
                //还原查询条件
                $scope.query = {
                    number: null,
                    skuNumber: null,
                    skuName: null,
                    receiverName: null,
                    orderTotalMin: null,
                    orderTotalMax: null
                };
                //$scope.waitForDeliver();
            };

            //搜索
            $scope.search = function () {
                $('#deliverSearchForm #searchBtn').button('loading');
                //保存上一次的查询结果
                $scope.querySaved = angular.copy($scope.query);

                $scope.deliverTableParams.reload();
            };

            //待发货
            $scope.waitForDeliver = function () {
                $scope.$loaded = false;
                $scope.hasWaitForDeliverCount = 0;
                $scope.querySaved.orderStatus = 35;
                $scope.query.orderStatus = 35;
                $scope.querySaved.orderStatuss = null;
                $scope.query.orderStatuss = null;

                $scope.listTemplate = $scope.templates.orderDeliverTable;
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];

                if ($scope.deliverTableParams) {
                    $scope.currentTab = 1;
                }

            };
            //已发货
            $scope.delivered = function () {
                $scope.$loaded = false;
                $scope.listTemplate = $scope.templates.orderDeliveredTable;
                $scope.hasDeliveredCount = 0;
                $scope.querySaved.orderStatuss = [60,70];
                $scope.query.orderStatuss = [60,70];
                $scope.querySaved.orderStatus = null;
                $scope.query.orderStatus = null;
                console.log($scope.query);
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];
                if ($scope.deliverTableParams) {
                    $scope.currentTab = 2;
                }

            };


            //获取配送详情（和订单追踪的信息是一致的,根据订单号来查）
            $scope.getDistributingDetail = function (orderNumber) {
                $scope.deliverInfo = null;
                orderService.getTrackOrderDistributing({"orderNumber": orderNumber}).$promise.then(function (resp) {
                    $scope.deliverInfo = resp.model.trackingInfo.deliverInfos;
                });

                ngPopover.open(
                    $('#distributingDetailBtn-'+orderNumber),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderLogisterInfo.html?tag=' + $globalSetting.version
                    }
                );
            };

            //打开发货模态框
            $scope.openDeliverModal = function (orderAddress, orderStatus, orderNumber) {
                //变量初始化
                $scope.deliverInfoForModal = {};
                //将错误移除
                angular.element('#deliverModalForm').scope().deliverModalForm.$setPristine(true);

                //$scope.orderNumberForModal = orderShipmentNumber;
                $scope.orderStatusForModal = orderStatus;
                $scope.orderNumberForDeliver = orderNumber;
                //发货模态框的收货信息
                if(orderAddress){
                    $scope.receiveInfo = orderAddress;
                }else{
                    $scope.receiveInfo = null;
                }

                $('#deliverModal').modal('show');
            };


            //关闭模态框
            $scope.closeDeliverModal = function () {
                $('#deliverModal').modal('hide');
                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                $scope.isDeliver = false;
                //跳至已发货Tab
                $scope.delivered();
            };


            //在发货对话框中打开订单详情
            $scope.checkOrderDetail4DeliverModal = function (orderNumberForModal) {
                //关闭模态框
                $scope.closeDeliverModal();
                //打开详情
                $scope.checkOrderDetail(orderNumberForModal);
            };


            //获取发票信息
            $scope.getBillInfo = function (orderId) {
                orderService.getBillInfo({"orderId": orderId}).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.billInfo = resp.model;
                    }
                });
                ngPopover.open(
                    $('#billInfoBtn-'+orderId),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderInvoiceInfo.html?tag=' + $globalSetting.version
                    }
                );
            };


            //查看详情
            $scope.checkOrderDetail = function (number) {
                // 设置当前订单号
                $scope.$orderNumber = number;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);

                $('#deliverListPage').hide();
                $('#orderDetailPage').slideDown("slow");
            };

            //从详情中返回订单列表时要重新加载订单列表
            $scope.backToList = function () {

                $("#multiDeliverPage").hide();
                $("#deliverListPage").slideDown("slow");
                $scope.reloadList();
                $scope.selectedItems = [];
                $scope.selectedItemsForAll = [];
                $scope.selectedShipmentItemsForAll = [];
                $scope.selectedShipmentItems = [];
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                $scope.isDeliver = true;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var trackingNo = deliverInfo.trackingNo;
                trackingNo = trackingNo.replace(/\s+/g,"");

                orderService.deliver(angular.toJson({"orderNo": $scope.orderNumberForDeliver, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName})).$promise.then(function (resp) {
                    if (resp.result === 1) {
                        //倒计时
                        $scope.closeDeliverModalTime = 6;
                        (function tick() {
                            if ($scope.closeDeliverModalTime <= 0) {
                                $timeout.cancel(clearTimeOut);
                                $('#deliverModal').modal('hide');
                                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                                $scope.isDeliver = false;
                                //跳至已发货Tab
                                $scope.delivered();
                                return;
                            }
                            $scope.closeDeliverModalTime--;
                            var clearTimeOut = $timeout(tick, 1000);
                        })();
                        $scope.reloadList();
                    }else{
                        alert(resp.remark);
                    }
                });
            };

            //批量发货
            $scope.multiDeliver  = function(){
                var orderNumbers = $scope.selectedItems;
                var numbers = "";
                for(var i = 0,len = orderNumbers.length;i<len;i++){
                    numbers += orderNumbers[i];
                    if(i < len - 1){
                        numbers += ",";
                    }
                }
                // 设置当前订单号（多个）
                $scope.$orderNumbers = numbers;
                $('#multiDeliverPage').empty().append('<div ng-controller="orderMultiDeliverCtrl" ng-include="\'/html/order/multiDeliverDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#multiDeliverPage').contents())($scope);

                $('#deliverListPage').hide();
                $('#multiDeliverPage').slideDown("slow");
            };


            //初始化数组
            $scope.pushToSelected = function(orderStatus, orderNumber, orderShipmentNumber){
                if(orderStatus === 35){
                    $scope.selectedItemsForAll.push(orderNumber);
                    $scope.selectedShipmentItemsForAll.push(orderShipmentNumber);
                }
            };

            //从详情中返回订单发货列表时要重新加载订单列表
            $scope.$on("loadDeliverTable", function () {
                $scope.deliverTableParams.reload();
            });

            $scope.reloadList = function(){
                $scope.deliverTableParams.reload();
            };

            /*格式化订单日期*/
            $scope.$watch("query.orderTimeBegin", function () {
                if($scope.query.orderTimeBegin){
                    $scope.query.orderTimeBegin = moment($scope.query.orderTimeBegin).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.orderTimeEnd", function () {
                if($scope.query.orderTimeEnd){
                    $scope.query.orderTimeEnd = moment($scope.query.orderTimeEnd).format("YYYY-MM-DD");
                }
            });

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //-- =======================================初始化===========================================
            //加载订单
            $scope.$changeCurrMenuByCode('mvo_order_deliver');

            //获取物流公司
            $scope.listLogisticsCompanies();

            $scope.deliverTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                count: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer, params) {
                    var postData = angular.copy($scope.querySaved);
                    postData.pageIndex = params.page();
                    postData.pageSize = params.count();
                    if($scope.currentTab === 1){
                        postData.orderStatus = 35;
                        postData.orderStatuss = null;
                    }else{
                        postData.orderStatus = null;
                        postData.orderStatuss = [60,70];
                    }

                    //table区域重新加载，选择的订单需要重置
                    $scope.selectedItemsForAll = [];
                    $scope.selectedItems = [];
                    $scope.selectedShipmentItemsForAll = [];
                    $scope.selectedShipmentItems = [];
                    //查询
                    orderService.queryDeliver(postData).$promise.then(function (resp) {
                        if (resp.success) {

                            params.total(resp.query.totalRecord);
                            //处理是否退款标识
                            for(var i = 0,len = resp.models.length; i<len; i++){
                                var o = resp.models[i];
                                if((o.flagGather.toString()).charAt(1) == '1' ){
                                    resp.models[i].flagGather = true;
                                    resp.models.splice(i,1);
                                    len--;
                                    i--;
                                }
                                else{
                                    resp.models[i].flagGather = false;
                                }
                            }
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            $('#deliverSearchForm #searchBtn').button('reset');
                            if ($globalSetting.isMockEnv) {
                                $defer.resolve(list.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            } else {
                                $defer.resolve(list);
                            }
                            $scope.$loaded = true;
                        }
                    });
                }
            });



        }
    ]);
/**
 * @name orderDetailCtrl
 * @author patrick
 * @time 2014/12/23
 **/
angular.module("flymvo.order.orderDetailCtrl", [])
    .controller("orderDetailCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService) {

            //-- =======================================常量===========================================

            //-- =======================================变量===========================================
            //订单信息模板
            $scope.orderDetailTemplates = {
                //进度显示
                orderProgress: '/html/order/include/orderProgress.html?tag=' + $globalSetting.version,
                //订单追踪（待发货）
                trackOrderWaitForDeliver: '/html/order/include/trackOrderWaitForDeliver.html?tag=' + $globalSetting.version,
                //订单追踪（配送中）
                trackOrderDistributing: '/html/order/include/trackOrderDistributing.html?tag=' + $globalSetting.version,
                //订单追踪（已取消）
                trackOrderCancel: '/html/order/include/trackOrderCancel.html?tag=' + $globalSetting.version,
                //订单信息
                orderInfo: '/html/order/include/orderInfo.html?tag=' + $globalSetting.version
            };

            //-- =======================================函数===========================================
            //加载进度条
            $scope.loadProgressBar = function () {
                if ($scope.orderDetail) {
                    $scope.orderProgress = {};
                    var active, content;
                    active = 0;
                    content = [];
                    if ($scope.orderDetail.cancelTime > 0) {
                        content = [
                            {text: "消费者下单", time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                            {text: "消费者付款", time: $scope.orderDetail.payTime > 0 ? $scope.orderDetail.payTime : ""},
                            {text: "订单已取消", time: $scope.orderDetail.cancelTime > 0 ? $scope.orderDetail.cancelTime : ""}
                        ];
                    } else {
                        content = [
                            {text: "消费者下单", time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                            {text: "消费者付款", time: $scope.orderDetail.payTime > 0 ? $scope.orderDetail.payTime : ""},
                            {text: "制造商发货", time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                            {text: "消费者签收", time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        ];

                        //}else{
                        //    if($scope.orderDetail.orderReturnDTO){
                        //        content = [
                        //            {text: "消费者下单",time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                        //            {text: "消费者已申请退款",time: $scope.orderDetail.orderReturnDTO.createTime > 0 ? $scope.orderDetail.orderReturnDTO.createTime : ""},
                        //            {text: "制造商发货",time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                        //            {text: "消费者签收",time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        //        ];
                        //    }
                        //    else{
                        //        content = [
                        //            {text: "消费者下单",time: $scope.orderDetail.orderTime > 0 ? $scope.orderDetail.orderTime : ""},
                        //            {text: "消费者已申请退款",time: ""},
                        //            {text: "制造商发货",time: $scope.orderDetail.sendTime > 0 ? $scope.orderDetail.sendTime : ""},
                        //            {text: "消费者签收",time: $scope.orderDetail.acceptTime > 0 ? $scope.orderDetail.acceptTime : ""}
                        //        ];
                        //    }
                        //
                        //}

                    }
                    $scope.orderProgress.content = content;
                    if ($scope.orderDetail.acceptTime > 0) {
                        active = 4;//签收
                    } else if ($scope.orderDetail.sendTime > 0) {
                        active = 3;//发货
                    } else if ($scope.orderDetail.payTime > 0) {
                        active = 2;//付款
                    } else if ($scope.orderDetail.orderTime > 0) {
                        active = 1;//下单
                    } else if ($scope.orderDetail.cancelTime > 0) {
                        active = 2;//已取消
                    } else {
                        active = 0;//默认
                    }
                    $scope.orderProgress.active = active;
                }
            };


            //返回订单列表
            $scope.backToOrderList = function (orderNumber) {
                //隐藏orderDetail.html
                $("#orderDetailPage").hide();
                if ($scope.$backTo === 1) {
                    //展开orderList.html
                    $("#orderListPage").slideDown("slow");
                    //加载订单列表
                    $scope.$emit("loadOrderTable");
                } else if ($scope.$backTo === 2) {
                    $("#deliverListPage").slideDown("slow");
                    $scope.$emit("loadDeliverTable");
                } else if($scope.$backTo === 3) {
                    $("#errTrackingNoListPage").slideDown("slow");
                    $scope.$emit("loadErrTrackingNoTable");
                }else if($scope.$backTo === 4) {
                    $("#pendTrackingNoListPage").slideDown("slow");
                    $scope.$emit("loadPendTrackingNoTable");
                }else if($scope.$backTo === 5) {
                    $("#trackingNoLogListPage").slideDown("slow");
                    $scope.$emit("loadTrackingNoLogTable");
                }
            };

            //获得订单明细
            $scope.retrieveOrderDetail = function (isAfterDeliverSuccess, deliverInfo) {
                orderService.getOrderDetailInfo({"orderNumber": $scope.$orderNumber}).$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.orderDetail = resp.model;
                        //处理是否退款字段
                        if (($scope.orderDetail.flagGather.toString()).charAt(1) == '1') {
                            $scope.orderDetail.flagGather = true;
                        }
                        else {
                            $scope.orderDetail.flagGather = false;
                        }

                        $scope.loadProgressBar();

                        if(isAfterDeliverSuccess){
                            if (!$scope.orderDetail.trackingInfo) {
                                $scope.trackingInfoCarrier = deliverInfo.logisticsCompanyName.name;
                                $scope.trackingInfoTrackingNo = deliverInfo.trackingNo;
                            }
                            mockDeliverSuccess();
                        }
                    }
                });
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                var trackingNo = deliverInfo.trackingNo;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                orderService.deliver(angular.toJson({"orderNo": $scope.orderDetail.number, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName})).$promise.then(function (resp) {
                    if (resp.result == 1) {
                        $scope.retrieveOrderDetail(true, deliverInfo);
                    } else {
                        alert("发货失败，原因：" + resp.remark);
                    }
                });
            };

            //模拟修改订单发货后的状态
            function mockDeliverSuccess(){
                if ($globalSetting.isMockEnv) {
                    $scope.orderDetail.status = 60;
                }
            }

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //获取物流公司
            $scope.listLogisticsCompanies = function(){
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因："+resp.message);
                    }
                });
            };

            //-- =======================================初始化===========================================
            if(angular.isDefined($stateParams.orderNumber) && $stateParams.orderNumber!==null){
                //获取orderNumber，如果直接从URL中过来，则从urlpath中获得
                $scope.$orderNumber = $stateParams.orderNumber;
            }

            //-- 获得订单详情
            $scope.retrieveOrderDetail();

            //-- 获取物流公司
            if(!$scope.$logisticsCompanies){
                $scope.listLogisticsCompanies();
            }


        }
    ]);
angular.module('flymvo.order.orderListCtrl', [])
    .controller('orderListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        'ngTableParams',
        '$rootScope',
        '$state',
        '$compile',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, TableParams, $rootScope, $state, $compile, ngPopover) {

            //-- =======================================常量===========================================

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 订单列表 1  发货列表 2
            $scope.$backTo = 1;

            //订单表模板
            $scope.templates = {
                //订单表格
                orderTable: '/html/order/include/orderTable.html?tag=' + $globalSetting.version,
                //发货modal
                orderDeliveryModal: '/html/order/include/orderDeliverModal.html?tag=' + $globalSetting.version,
                //订单明细
                orderDetail: '/html/order/checkOrderDetail.html?tag=' + $globalSetting.version
            };

            //当前的订单标签页
            $scope.currentTab = 1;
            //常量：订单状态 
            $scope._orderStatus = orderConstants.orderTypesItems;

            //查询条件
            $scope.query = {
                number: null,
                skuNumber: null,
                skuName: null,
                receiverName: null,
                orderTotalMin: null,
                orderTotalMax: null
            };

            //默认是待发货
            $scope.query.status = 35;
            $scope.query.selectStatusItem = 1;
            
            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //用于记录选择的订单ID
            $scope.selectedItems = [];
            //用于记录全部的商品ID
            $scope.selectedItemsForAll = [];
            //用于控制发货按钮模态框的内容
            $scope.isDeliver = false;
            //默认不能激活发货功能
            $scope.orderNumberForCanDeliver = null;
            //物流/快递公司(多个)
            $scope.$logisticsCompanies = null;
            //是否显示信息
            //$scope.isShowAlert = false;

            //待发货未浏览记录数量
            $scope.hasWaitForDeliverCount = 0;
            //配送中未浏览记录数量
            $scope.hasDistributingCount = 0;


            //获取格式化后的时间字符串
            function getStringFromDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month <= 9) {
                    month = "0" + month;
                }
                var day = date.getDate();
                return year + "-" + month + "-" + day;
            }

           //售后提醒 popover框
            $scope.openRefundPop = function(index) {
                $("#refundSpan"+index).popover('show');
            };
            $scope.closeRefundPop = function(index) {
                $("#refundSpan"+index).popover('hide');
                $("#refundSpan"+index).popover('destroy');
            };

            //下拉框状态改变时，重新加载
            $scope.statusChange = function (selectedStatus){
                   switch(parseInt(selectedStatus)){
                       case 1:  $scope.waitForDeliver();break;
                       case 2:  $scope.distributing();break;
                       case 3:  $scope.tradeFinish();break;
                       case 4:  $scope.allOrders();break;
                       default: $scope.waitForDeliver();
                   }
            };

            //显示所有Sku
            $scope.showOtherSkus = function(o) {
                o.flag4ShowOtherSkus = true;
            };

            //隐藏除第一个以外的所有skus
            $scope.hideOtherSkus = function(o) {
                o.flag4ShowOtherSkus = false;
            };

            //返回订单号字符串
            $scope.isShowOtherSkus = function(o,index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };


            //批量打印
            $scope.multiExport = function(){
                //if(!$scope.query.orderTimeBegin&&!$scope.query.orderTimeEnd){
                //    $scope.initDate();
                //}
                var start = $scope.query.orderTimeBegin;
                var end = $scope.query.orderTimeEnd;
                //验证时间
                if(!start&&end){
                        alert('亲，请输入开始时间');
                         return;
                }else  if(!end&&start){

                        alert('亲，请输入结束时间');
                        return;
                }
                else  if(start > end){
                        alert('亲，结束时间必须小于开始时间');
                        return;
                }
                else {
                        $scope.querySaved.orderTimeBegin = $scope.query.orderTimeBegin;
                        $scope.querySaved.orderTimeEnd = $scope.query.orderTimeEnd;
                        var url = '/data/order/export/excel?pageSize=10000';
                        //var flag = false;
                        if($scope.query.status){
                                url += '&&status=' + $scope.query.status;
                        }
                        if($scope.query.orderTimeBegin){
                                url += '&&orderTimeBegin=' + $scope.query.orderTimeBegin;
                        }
                        if($scope.query.orderTimeEnd){
                                url += '&&orderTimeEnd=' + $scope.query.orderTimeEnd;
                        }
                        if($scope.query.number){
                                url += '&&number=' + $scope.query.number;
                        }
                        if($scope.query.skuNumber){
                                url += '&&skuNumber=' + $scope.query.skuNumber;
                        }
                        if($scope.query.skuName){
                                url += '&&skuName=' + $scope.query.skuName;
                        }
                        if($scope.query.receiverName){
                                url += '&&receiverName=' + $scope.query.receiverName;
                        }
                        if($scope.query.orderTotalMin){
                                url += '&&orderTotalMin=' + $scope.query.orderTotalMin;
                        }
                        if($scope.query.orderTotalMax){
                                url += '&&orderTotalMax=' + $scope.query.orderTotalMax;
                        }
                         
                        //模拟点击a标签
                        $('body').append("<a target='_blank' id=\'downloadcsv\'  ></a>");
                        $('#downloadcsv').attr('href',url);
                        document.getElementById("downloadcsv").click();

                }
            };


            //$scope.initDate = function(){
            //    /*格式化订单日期*/
            //    var dateFormat = "YYYY-MM-DD";
            //    var now = new Date();
            //    var before = new Date();
            //    before.setDate(before.getDate() - 7);
            //    $scope.query.orderTimeBegin = moment(before).format(dateFormat);
            //    $scope.query.orderTimeEnd = moment(now).format(dateFormat);
            //};

            
            //--  重置查询函数
            $scope.resetSearch = function () {
                //将错误移除
                $scope.orderSearchForm.$setPristine(true);
                //处理验证的field
                $scope.orderSearchForm.orderTotalMin.$setViewValue("");
                $scope.orderSearchForm.orderTotalMax.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //搜索
            $scope.search = function () {
                $('#orderSearchForm #searchBtn').button('loading');
                //保存上一次的查询结果
                $scope.querySaved = angular.copy($scope.query);

                $scope.orderTableParams.reload();

            };

            //待发货
            $scope.waitForDeliver = function () {
                $scope.$loaded = false;
                //$scope.hasWaitForDeliverCount = 0;
                $scope.querySaved.status = 35;
                $scope.query.status = 35;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 1;
                    $("#searchSelect").get(0).options[0].selected = true;
                    $scope.orderTableParams.reload(); 
                }
            };

            //配送中
            $scope.distributing = function () {
                $scope.$loaded = false;
                //$scope.hasDistributingCount = 0;
                $scope.querySaved.status = 50;
                $scope.query.status = 50;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 2;
                    $("#searchSelect").get(0).options[1].selected = true;
                    $scope.orderTableParams.reload(); 
                }
            };

            //交易完成
            $scope.tradeFinish = function () {
                $scope.$loaded = false;
                // $scope.hasTradeFinishCount = 0;
                $scope.querySaved.status = 60;
                $scope.query.status = 60;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 3;
                    $("#searchSelect").get(0).options[2].selected = true;
                    $scope.orderTableParams.reload();
                }
            };

            //全部
            $scope.allOrders = function () {
                $scope.$loaded = false;
                // $scope.hasAllOrdersCount = 0;
                $scope.querySaved.status = null;
                $scope.query.status = null;
                if ($scope.orderTableParams) {
                    $scope.currentTab = 4;
                    $("#searchSelect").get(0).options[3].selected = true;
                    $scope.orderTableParams.reload();
                    $scope.hasAllOrdersLoaded = true;
                }
            };


            //打印订单
            $scope.printDeliverList = function (orderNumber) {
                //激活发货按钮
                $scope.orderNumberForCanDeliver = orderNumber;
            };

            //获取配送详情（和订单追踪的信息是一致的,根据订单号来查）
            $scope.getDistributingDetail = function (orderNumber) {
                $scope.deliverInfo = null;
                orderService.getTrackOrderDistributing({"orderNumber": orderNumber}).$promise.then(function (resp) {
                    $scope.deliverInfo = resp.model.trackingInfo.deliverInfos;
                });

                ngPopover.open(
                    $('#distributingDetailBtn-'+orderNumber),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderLogisterInfo.html?tag=' + $globalSetting.version
                    }
                );
            };

            //打开发货模态框
            $scope.openDeliverModal = function (orderShipmentNumber, orderStatus, orderNumber) {
                //变量初始化
                $scope.deliverInfoForModal = {};
                //将错误移除
                angular.element('#deliverModalForm').scope().deliverModalForm.$setPristine(true);

                $scope.orderNumberForModal = orderShipmentNumber;
                $scope.orderStatusForModal = orderStatus;
                $scope.orderNumberForDeliver = orderNumber;
                //发货模态框的收货信息
                orderService.getReceiveInfo({"orderNumber": orderShipmentNumber}).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.receiveInfo = resp.model;
                        $('#deliverModal').modal('show');
                    } else {
                        //alert("获取数据出错，原因："+resp.message);
                        $('#deliverModal').modal('hide');
                    }
                });
            };

            //发货
            $scope.deliver = function (deliverInfo) {
                $scope.isDeliver = true;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var trackingNo = deliverInfo.trackingNo;
                orderService.deliver(angular.toJson({"orderNo": $scope.orderNumberForDeliver, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName})).$promise.then(function (resp) {
                    if (resp.result === 1) {
                        //倒计时
                        $scope.closeDeliverModalTime = 6;
                        (function tick() {
                            if ($scope.closeDeliverModalTime <= 0) {
                                $timeout.cancel(clearTimeOut);
                                $('#deliverModal').modal('hide');
                                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                                $scope.isDeliver = false;
                                //跳至配送中Tab
                                $scope.distributing();
                                return;
                            }
                            $scope.closeDeliverModalTime--;
                            var clearTimeOut = $timeout(tick, 1000);
                        })();
                    }else{
                        alert(resp.remark);
                    }
                });
            };

            //关闭模态框
            $scope.closeDeliverModal = function () {
                $('#deliverModal').modal('hide');
                //将发货设置为false，那么下一条记录发货模态框就可以打开了
                $scope.isDeliver = false;
                //跳至配送中Tab
                $scope.distributing();
            };

            //获取发票信息
            $scope.getBillInfo = function (orderId) {
                orderService.getBillInfo({"orderId": orderId}).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.billInfo = resp.model;
                    }
                });
                ngPopover.open(
                    $('#billInfoBtn-'+orderId),
                    $scope,  //scope
                    {  //options
                        template: '/html/order/include/orderInvoiceInfo.html?tag=' + $globalSetting.version
                    }
                );
            };

            //查看详情
            $scope.checkOrderDetail = function (number) {
                // 设置当前订单号
                $scope.$orderNumber = number;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);

                $('#orderListPage').hide();
                $('#orderDetailPage').slideDown("slow");
            };

            //在发货对话框中打开订单详情
            $scope.checkOrderDetail4DeliverModal = function (orderNumberForModal) {
                //关闭模态框
                $scope.closeDeliverModal();
                //打开详情
                $scope.checkOrderDetail(orderNumberForModal);
            };

            //从详情中返回订单列表时要重新加载订单列表
            $scope.$on("loadOrderTable", function () {
                $scope.orderTableParams.reload();
            });

            /*格式化订单日期*/
            $scope.$watch("query.orderTimeBegin", function () {
                if($scope.query.orderTimeBegin){
                    $scope.query.orderTimeBegin = moment($scope.query.orderTimeBegin).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.orderTimeEnd", function () {
                if($scope.query.orderTimeEnd){
                    $scope.query.orderTimeEnd = moment($scope.query.orderTimeEnd).format("YYYY-MM-DD");
                }
            });
            /*格式化订单日期结束*/

            //获取物流公司
            $scope.listLogisticsCompanies = function(){
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因："+resp.message);
                    }
                });
            };

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };


            //-- =======================================初始化===========================================

            $scope.$changeCurrMenuByCode('mvo_order_list');

            //获取物流公司
            $scope.listLogisticsCompanies();

            //加载订单
            $scope.orderTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                count: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer, params) {
                    var postData = angular.copy($scope.querySaved);
                    postData.pageIndex = params.page();
                    postData.pageSize = params.count();
                    postData.status = $filter('orderTypes')($scope.currentTab);
                    //table区域重新加载，选择的订单需要重置
                    $scope.selectedItemsForAll = [];
                    $scope.selectedItems = [];
                    //查询
                    orderService.query(postData).$promise.then(function (resp) {
                        if (resp.success) {
                            params.total(resp.query.totalRecord);
                            //处理是否退款标识
                            for(var i = 0,len = resp.models.length; i<len; i++){
                                var o = resp.models[i];
                                if((o.flagGather.toString()).charAt(1) == '1' ){
                                    resp.models[i].flagGather = true;
                                }
                                else{
                                    resp.models[i].flagGather = false;
                                }
                            }

                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            $('#orderSearchForm #searchBtn').button('reset');
                            if ($globalSetting.isMockEnv) {
                                $defer.resolve(list.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            } else {
                                $defer.resolve(list);
                            }
                            $scope.$loaded = true;
                        }
                    });
                }
            });


        }
    ]); 
/**
 * @name: 订单批量发货
 * @description:
 * @author: patrick.he
 * @create : 2014/12/24.
 */
angular.module('flymvo.order.orderMultiDeliverCtrl', [])
    .controller('orderMultiDeliverCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedMultiDeliver = false;

            //用于标识是否提交过
            $scope.hasCommit = false;

            //发货模型
            $scope.deliverInfoForModal = {};

            //-- =======================================函数===========================================
            //获取物流公司
            $scope.listLogisticsCompanies = function () {
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因：" + resp.message);
                    }
                });
            };

            //显示发货单内所有sku
            $scope.showOtherSkus = function(o){
                o.flag4ShowOtherSkus = true;
            };

            //隐藏发货单内除第一个以外的所有skus
            $scope.hideOtherSkus = function(o){
                o.flag4ShowOtherSkus = false;
            };

            //返回订单号字符串
            $scope.isShowOtherSkus = function(o, index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //获得要发货的订单列表
            $scope.retrieveDeliverOrderArray = function (numbers) {
                orderService.queryDeliver({number: numbers}).$promise.then(function (resp) {
                    if (!resp.success) {
                        $window.alert(resp.message);
                    }
                    $scope.$deliverOrderArray = resp.models;
                    $scope.$loadedMultiDeliver = true;

                });
            };


            //批量发货确认
            $scope.multiOrderDeliver = function (deliverInfo, deliverInfoNumber) {
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#multiDeliverPage :input.ng-invalid');
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

                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                var deliverObj = [];
                var trackingNo = "";

                for (var i = 0, len = deliverInfoNumber.length; i < len; i++) {
                    trackingNo = deliverInfoNumber[i].deliverInfoForNumber.replace(/\s+/g, "");
                    deliverObj.push({"orderNo": deliverInfoNumber[i].number, "trackingNo": trackingNo, "logisticsCompany": logisticsCompany, 'logisticsCompanyName': logisticsCompanyName});
                }
                //console.log(deliverObj);
                orderService.multiDeliver(angular.toJson(deliverObj)).$promise.then(function (resp) {
                    if (resp.result === 1) {
                        $window.alert("发货成功");
                        $scope.backToList();
                    } else {
                        $window.alert(resp.remark);
                    }
                });
            };


            //-- =======================================初始化===========================================
            if (angular.isDefined($stateParams.orderNumbers) && $stateParams.orderNumbers !== null) {
                //获取orderNumbers，如果直接从URL中过来，则从urlpath中获得
                $scope.$orderNumbers = $stateParams.orderNumbers;

                if ($globalSetting.isMockEnv) {
                    $scope.$orderNumbers = "1000";
                }
            }

            //-- 获得发货订单列表
            $scope.retrieveDeliverOrderArray($scope.$orderNumbers);

            //-- 获取物流公司
            if (!$scope.$logisticsCompanies) {
                $scope.listLogisticsCompanies();
            }


        }
    ]);
/**
 * @name: 发货单打印控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/12.
 */
angular.module("flymvo.order.orderPrintListCtrl", [])
    .controller("orderPrintListCtrl", [
        '$scope',
        'orderService',
        '$location',
        '$window',
        '$stateParams',
        '$globalSetting',
        function ($scope, orderService, $location, $window, $stateParams, $globalSetting) {
            //-- =======================================常量===========================================
            $scope.SKU_GROUP_SIZE = 6;
            //-- =======================================变量===========================================

            //-- =======================================初始化===========================================
            //获取要打印的清单信息
            var url = $location.absUrl();
            var orderNumbers = "";

            url = url.split("?")[1];
            orderNumbers = url.split("=")[1];
            if ($globalSetting.isMockEnv) {
                orderNumbers = "1000";
            }
            orderService.multiShoppingList(angular.toJson(
                orderNumbers.split(",")
            )).$promise.then(function (resp) {
                    if(resp.success) {
                        $scope.models = resp.models;
                        //由于商品清单每6个就要分开多一张A4纸打印
//                        console.log($scope.models);
                        angular.forEach($scope.models, function(model,modelIndex){
                            var i = 1;
                            angular.forEach(model.shoppingListProductDOs, function(item,index){
                                item.index = i;
                                i += 1;
                            });
                            model.productGroupList = [];
                            while(model.shoppingListProductDOs.length > 0){
                                model.productGroupList.push(model.shoppingListProductDOs.splice(0, $scope.SKU_GROUP_SIZE));
                            }
                        });


                    } else {
                        $window.alert("请求数据出错，原因:" + resp.message);
                    }
                });


        }]);
/**
 * @name: 问题运单号修改日志控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26.
 */
angular.module('flymvo.order.pendTrackingNoListCtrl', [])
    .controller('pendTrackingNoListCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        'ngTableParams',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedPendTrackingNo = false;

            //-- 订单列表-1  发货列表-2 问题运单号列表-3 待处理运单号-4
            $scope.$backTo = 4;

            //模板
            $scope.templates = {
                pendTrackingNoTable: '/html/order/include/pendTrackingNoTable.html?tag=' + $globalSetting.version,
                updateTrackingNoModal: '/html/order/include/updateTrackingNoModal.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: "",
                trackingNumber: ""
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);
            $scope.queryOrigin = angular.copy($scope.query);

            //用于判断是否进行过搜索
            $scope.isSearchBefore = false;



    //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.pendTrackingNoTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if(($scope.query.orderNo.trim() === "") && ($scope.query.trackingNumber.trim() === "")){
                    $window.alert("订单编号或运单号至少填写一个");
                    return;
                }

                if($scope.pendTrackingNoSearchForm.$invalid){
                    $('#pendTrackingNoSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#pendTrackingNoSearchForm #pendTrackingNoSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.isSearchBefore = true;
                    $scope.pendTrackingNoTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.pendTrackingNoSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //获取物流公司
            $scope.listLogisticsCompanies = function () {
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因：" + resp.message);
                    }
                });
            };


            //查看订单详情
            $scope.checkOrderDetail = function(orderNumber){
                $scope.$orderNumber = orderNumber;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#pendTrackingNoListPage').hide();
            };


            //打开修改运单号modal
            $scope.openTrackingNoUpdateModal = function(orderNo, transportNo, carrierCode){
                $scope.trackingNoInfo = {
                    logisticsCompanyOrig : carrierCode,
                    trackingNo:transportNo,
                    trackingNoOrig:transportNo,
                    orderNo:orderNo
                };
                angular.forEach($scope.$logisticsCompanies, function(item, index){
                    if(item.code == $scope.trackingNoInfo.logisticsCompanyOrig){
                        $scope.trackingNoInfo.carrier = item;
                    }
                });

                $('#updateTrackingNoModal .modal-dialog').empty().append('<div ng-controller="trackingNoUpdateCtrl" ng-include="\''+$scope.templates.updateTrackingNoModal+'\'"></div>');
                $compile($('#updateTrackingNoModal').contents())($scope);
                $('#updateTrackingNoModal').modal('show');
            };
            //关闭运单号modal
            $scope.closeTrackingNoUpdateModal = function(){
                $('#updateTrackingNoModal').modal('hide');
            };

            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadPendTrackingNoTable", function () {
                $scope.pendTrackingNoTableParams.reload();
            });

            //-- =======================================初始化===========================================

            console.log("enter order pendTrackingNoListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_pendTrackingNo_list");

            //-- 获取物流公司
            $scope.listLogisticsCompanies();

            $scope.pendTrackingNoTableParams = new TableParams({
                page: 1,
                count: 10
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    if(!$scope.isSearchBefore){
                        $defer.resolve([]);
                        return;
                    }
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();


                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }

                    orderService.queryOrderDeliverList(postData).$promise.then(function (resp) {
                        $('#pendTrackingNoSearchForm #pendpendTrackingNoSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.pendTrackingNoList = list;
                            $defer.resolve(list);
                            $scope.$loadedPendTrackingNo = true;
                        }
                    });


                }
            });



        }
    ]);
/**
 * @name: 运单号日志控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.trackingNoLogCtrl', [])
    .controller('trackingNoLogCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        'ngTableParams',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope,TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedTrackingNoLog = false;

            //-- 订单列表-1  发货列表-2 问题运单号列表-3 待处理运单号-4 运单号修改日志-5
            $scope.$backTo = 5;

            //模板
            $scope.templates = {
                trackingNoLogTable: '/html/order/include/trackingNoLogTable.html?tag=' + $globalSetting.version
            };

            //查询条件
            $scope.query = {
                orderNo: null,
                transpNo: null,
                createTimeBegin: null,
                createTimeEnd: null
            };

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);

            $scope.queryOrigin = angular.copy($scope.query);



            //-- =======================================函数===========================================
            //重新加载列表
            $scope.reloadList = function(){
                $scope.trackingNoLogTableParams.reload();
            };

            //搜索
            $scope.search = function(){
                if($scope.trackingNoLogSearchForm.$invalid){
                    $('#trackingNoLogSearchForm :input .ng-invalid').first().focus();
                }else{
                    $("#trackingNoLogSearchForm #trackingNoLogSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.trackingNoLogTableParams.reload();
                }
            };

            //重置
            $scope.reset = function () {
                //将错误移除
                $scope.trackingNoLogSearchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //查看订单详情
            $scope.checkOrderDetail = function(orderNo){
                $scope.$orderNumber = orderNo;
                $('#orderDetailPage').empty().append('<div ng-controller="orderDetailCtrl" ng-include="\'/html/order/orderDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#orderDetailPage').contents())($scope);
                $('#orderDetailPage').slideDown("fast");
                $('#trackingNoLogListPage').hide();
            };

            //-- =======================================初始化===========================================

            console.log("enter order trackingNoLogListCtrl");

            $scope.$changeCurrMenuByCode("mvo_order_trackingNoLog_list");

            //从详情中返回问题运单号列表时要重新加载运单号列表
            $scope.$on("loadTrackingLogNoTable", function () {
                $scope.trackingLogNoTableParams.reload();
            });

            //时间转换
            $scope.$watch("query.createTimeEnd", function() {
                if($scope.query.createTimeEnd){
                    $scope.query.createTimeEnd = moment($scope.query.createTimeEnd).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.createTimeBegin", function() {
                if($scope.query.createTimeBegin){
                    $scope.query.createTimeBegin = moment($scope.query.createTimeBegin).format("YYYY-MM-DD");
                }
            });


            $scope.trackingNoLogTableParams = new TableParams({
                page: 1,
                count: 10
            },{
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer,params)  {
                    //构造查询条件
                    var postData = angular.copy($scope.querySaved);
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();


                    if(params.sorting() && (params.orderBy().length > 0)){
                        var str = params.orderBy()[0];
                        //排序
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }

                    if (postData.createTimeBegin) {
                        postData.createTimeBegin = postData.createTimeBegin + " 00:00:00";
                    }
                    if (postData.createTimeEnd) {
                        postData.createTimeEnd = postData.createTimeEnd + " 23:59:59";
                    }

                    orderService.searchTrackingNoLog(postData).$promise.then(function (resp) {
                        $('#trackingNoLogSearchForm #trackingNoLogSearchBtn').button('reset');
                        if(resp.models){
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ?
                                $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }

                            $scope.trackingNoLogList = list;
                            $defer.resolve(list);
                            $scope.$loadedTrackingNoLog = true;
                        }
                    });


                }
            });


        }
    ]);
/**
 * @name: 运单号修改控制器
 * @description:
 * @author: allen.chan
 * @create : 2014/12/26
 */
angular.module('flymvo.order.trackingNoUpdateCtrl', [])
    .controller('trackingNoUpdateCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'orderConstants',
        'orderService',
        '$rootScope',
        'ngTableParams',
        '$state',
        '$compile',
        '$window',
        'ngPopover',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, orderConstants, orderService, $rootScope, TableParams, $state, $compile, $window, ngPopover) {
            //-- =======================================变量===========================================

            //模板
            $scope.templates = {
            };

            //-- =======================================函数===========================================

            //获取物流公司
            $scope.listLogisticsCompanies = function () {
                orderService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success) {
                        $scope.$logisticsCompanies = resp.models;
                    } else {
                        alert("获取数据失败，原因：" + resp.message);
                    }
                });
            };


            //修改运单号modal确认
            $scope.updateTrackingNo = function (trackingNoInfo) {
                var postData = {
                    logisticsCompanyOrig : trackingNoInfo.logisticsCompanyOrig,
                    logisticsCompany:    trackingNoInfo.carrier.code,
                    logisticsCompanyName:    trackingNoInfo.carrier.name,
                    orderNo:         trackingNoInfo.orderNo,
                    trackingNo:  trackingNoInfo.trackingNo,
                    trackingNoOrig: trackingNoInfo.trackingNoOrig
                };
                if(trackingNoInfo.tmsAbnormalOrderReportId){
                    postData.tmsAbnormalOrderReportId = trackingNoInfo.tmsAbnormalOrderReportId;
                }
                orderService.updateTrackingNo(angular.toJson(postData)).$promise.then(function (resp) {
                    if (resp.success === true) {
                        $window.alert("修改成功");
                        $('#updateTrackingNoModal').modal('hide');
                        $scope.reloadList();
                    } else {
                        $window.alert(resp.message);
                        $('#updateTrackingNoModal').modal('hide');
                    }

                });
            };


            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //-- =======================================初始化===========================================


            //-- 获取物流公司
            if(!$scope.$logisticsCompanies){
                $scope.listLogisticsCompanies();
            }

        }
    ]);
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

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.product.controllers', [
  'flymvo.product.productListCtrl',
  'flymvo.product.productChooseCatBrandCtrl',
  'flymvo.product.productCreateCtrl',
  'flymvo.product.productEditCtrl',
  'flymvo.product.productRecycleBinCtrl',
  'flymvo.product.consultListCtrl'
]);

/**
 * @name: 商品选择品牌类目控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productChooseCatBrandCtrl', [])
    .controller('productChooseCatBrandCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'productConstants',
        'productService',
        function ($scope, $filter, $timeout, $state, $stateParams,  $globalSetting, productConstants, productService) {

            //-- =======================================变量===========================================
            //-- 初始化模型
            $scope.product = {
                //选中的目录
                categoryId : null,
                categoryName : null,
                //选中的品牌
                brandId : null,
                brandName : null
            };
            //-- 供应商可用目录
            $scope.supplierCategories = [];
            //-- 供应商可用品牌
            $scope.supplierBrands = [];

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- 获得供应商可用品牌
            productService.listSupplierBrands().$promise.then(function (resp) {
                $scope.supplierBrands = resp.models;
            });

            //-- =======================================函数===========================================
            //-- 选择目录
            $scope.selectCategory = function(categoryId, categoryName){
                $scope.product.categoryId = categoryId;
                $scope.product.categoryName = categoryName;
            };

            //-- 选择品牌
            $scope.selectBrand = function(brandId, brandName){
                $scope.product.brandId = brandId;
                $scope.product.brandName = brandName;
            };

            //-- 进入步骤2
            $scope.gotoStep2 = function(){
                var tip = "";
                var flag = true;
                if(flag && !$scope.product.categoryId){
                    tip = "请选择类目";
                    flag = false;
                }
                if(flag && !$scope.product.brandId){
                    tip = "请选择品牌";
                    flag = false;
                }
                if(flag){
                    $stateParams.categoryId = $scope.product.categoryId;
                    $stateParams.brandId = $scope.product.brandId;
                    $state.go('main.createProduct', $stateParams);
                }else{
                    //show popover tip
                    $('#gotoStep2Btn').popover({
                        container : 'body',
                        placement : 'left',
                        content : tip,
                        trigger : 'focus'
                    }).on('hidden.bs.popover', function () {
                        $('#gotoStep2Btn').popover('destroy');
                    });
                    $('#gotoStep2Btn').popover('show');
                }
            };


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_add');


        }
    ]);

/**
 * @name: 商品创建控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productCreateCtrl', [])
    .controller('productCreateCtrl', [
        '$compile',
        '$window',
        '$scope',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$upload',
        '$globalSetting',
        'productConstants',
        'commonConstants',
        'productService',
        'fileService',
        'logisticsService',
        'categoryService',
        function ($compile, $window, $scope, $filter, $timeout, $state, $stateParams, $upload, $globalSetting, productConstants, commonConstants, productService, fileService, logisticsService, categoryService) {
            //-- =======================================常量===========================================
            $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT = productConstants.MAX_UPLOAD_SKU_IMAGE_LIMIT;
            $scope.MAX_UPLOAD_DESC_GROUP_LIMIT = productConstants.MAX_UPLOAD_DESC_GROUP_LIMIT;
            $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT = productConstants.MAX_UPLOAD_DESC_IMAGE_LIMIT;
            $scope.MAX_SKU_NUM_LIMIT = productConstants.MAX_SKU_NUM_LIMIT;

            //-- =======================================变量===========================================
            //-- 初始化模型
            $scope.product = {
                //目录
                categoryId: $stateParams.categoryId,
                //品牌
                brandId: $stateParams.brandId,
                //是否有保修, 1=有，0=没有
                hasWarranty: 0,
                //保修期
                warrantyPeriod: "",
                //谁承担运费,1=卖家，2=买家
                whoPayCarriage: 1,
                //运费模板
                logisticsTemplateId: null,
                //商品属性
                /**
                 * 商品属性
                 * key: attrId
                 * value : optionId
                 * 例如 {'100':10000, '200':20000, '300':[30001,30002], '400':"some text"}
                 */
                attrs: {},
                //商品类型,0= 普通商品, 1=多规格商品
                skuType: 0,
                //详细图组
                descImages: [],
                //退换货承诺
                promiseIds: [],
                //货品
                skus: [
                    {
                        //市场价
                        marketPrice: "",
                        //飞飞价
                        price: "",
                        //库存
                        quantityOnHand: "",
                        //重量
                        weight: "",
                        //长
                        length: "",
                        //宽
                        width: "",
                        //高
                        height: "",
                        //物流重量
                        carriage: null,
                        //条形码
                        barCode: '',
                        //商品型号
                        model: '',
                        /**
                         * sku规格json
                         * key: specId 规格id
                         * value : optionId 规格值id, optionValue 规格值的值
                         * 例如 {'101':{optionId:10000, optionValue:'#fff', optionName:'白'}, '201':{optionId:10001, optionValue:'#000', optionName:'黑'}}
                         */
                        specs: {},
                        //商品图片
                        images: []
                    }
                ]
                //--end skus

            };

            if ($globalSetting.isMockEnv) {
                //-- ====================================Start: Mock==============================================
                $scope.product = {
                    //商品名称
                    productName: "简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯简约欧式吊灯",
                    //商品特色
                    feature: "美式乡村复古全铜",
                    //商品副标题
                    subheading: "真正的纯铜，够分量",
                    //商品副标题
                    keywords: "灯,吊灯,欧式,简约,全铜",
                    //目录
                    categoryId: $stateParams.categoryId,
                    //品牌
                    brandId: $stateParams.brandId,

                    //是否有保修, 1=有，0=没有
                    hasWarranty: 0,

                    //保修期
                    warrantyPeriod: "",

                    //退换货承诺id列表
                    promiseIds: [],

                    //谁承担运费,1=卖家，2=买家
                    whoPayCarriage: 2,

                    //配送地区备注
                    shipRegionRemark: "这是个备注",

                    //运费模板
                    logisticsTemplateId: null,

                    //包装信息
                    packInfo: "灯泡*2 灯架*1 底座*1 灯罩*1 保修卡*1 说明书*1",

                    //售后说明
                    afterSaleDesc: "这是售后说明",

                    //商品类型,0= 普通商品, 1=多规格商品
                    skuType: 0,

                    /**
                     *详细描述图片
                     * each item is {
                  *     id :图片id,
                  *     url: 上传图片的url
                  * }
                     */

                    descImages: [
                        {
                            id: null,
                            tag: '商品情景',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/432081&text=Eric"},
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        },
                        {
                            id: null,
                            tag: '商品参数',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/d274f8&text=Patrick" },
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        },
                        {
                            id: null,
                            tag: '建议搭配',
                            items: [
                                { "id": null, "url": "http://dummyimage.com/200x200/9a7f2d&text=George"}
                            ]
                        }
                    ],

                    skus: [
                        {
                            //市场价
                            marketPrice: 150.80,
                            //飞飞价
                            price: 100,
                            //库存
                            quantityOnHand: 888,
                            //重量
                            weight: 0.68,
                            //长
                            length: 15,
                            //宽
                            width: 25,
                            //高
                            height: 35,
                            //运输重量
                            carriage: 21,
                            //条形码
                            barCode: '6901294179888',
                            //商品型号
                            model: 'M780',
                            //商家编码
                            mftProductCode: 'ERT397',
                            //规格
                            specs: {},
                            //商品图片
                            images: [
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/17d578&text=Larry"
                                },
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/9c9464&text=Anthony"
                                },
                                {
                                    "id": null, "url": "http://dummyimage.com/200x200/48743d&text=Helen"
                                }
                            ]
                        }
                    ]
                    //--end skus
                };
                //-- ====================================End:   Mock==============================================
            }

            //当前类目
            $scope.category = null;
            //当前品牌
            $scope.brand = null;

            //用户定义的所有运费模板
            $scope.logisticsTemplates = [];

            //当前类目的所有属性
            $scope.catAttrs = [];

            //用于标识是否提交过
            $scope.hasCommit = false;

            //当前类目的所有规格
            $scope.specs = [];
            //保存当前类目的所有规格初始状态
            $scope.specsOrigin = [];

            //获得售后类型常量列表 value 0=没选中，1=选中，2=强制选中不能修改
            $scope.afterSaleEnumList = [];


            //-- html模板
            $scope.templates = {
                //基本信息
                basicInfoSection: '/html/product/include/createProduct4BasicInfo.html?tag=' + $globalSetting.version,
                //商品属性
                attributeSection: '/html/product/include/createProduct4Attribute.html?tag=' + $globalSetting.version,
                //规格
                specSection: '/html/product/include/createProduct4Spec.html?tag=' + $globalSetting.version,
                //规格-普通商品
                specSection4SingleSku: '/html/product/include/createProduct4SpecSingleSku.html?tag=' + $globalSetting.version,
                //规格-多规格商品
                specSection4MultiSku: '/html/product/include/createProduct4SpecMultiSku.html?tag=' + $globalSetting.version,
                //规格-多规格商品（规格栏）
                specSection4MultiSku4Specs: '/html/product/include/createProduct4SpecMultiSku4Specs.html?tag=' + $globalSetting.version,
                //详细描述
                descSection: '/html/product/include/createProduct4Desc.html?tag=' + $globalSetting.version,
                //商品图
                imageSection: '/html/product/include/createProduct4Image.html?tag=' + $globalSetting.version,
                //物流配送
                logisticsSection: '/html/product/include/createProduct4Logistics.html?tag=' + $globalSetting.version,
                //包装
                packSection: '/html/product/include/createProduct4Pack.html?tag=' + $globalSetting.version,
                //售后
                afterSaleSection: '/html/product/include/createProduct4AfterSale.html?tag=' + $globalSetting.version,
                //选择规格与规格值
                chooseSpecsModal: '/html/product/include/createProduct4ChooseSpecsModal.html?tag=' + $globalSetting.version,
                //添加物流模板modal
                addLogisticsTemplateModal: '/html/product/include/addLogisticsTemplateModal.html?tag=' + $globalSetting.version,
                //物流模板body
                logisticsTemplatePageBody: '/html/logistics/createLogistics.html?tag=' + $globalSetting.version
            };

            //-- =======================================服务获得数据===========================================

            //-- 获得当前目录
            productService.getCategory({id: $scope.product.categoryId}).$promise.then(function (resp) {
                $scope.category = resp.model;
            });

            //-- 获得当前品牌
            productService.getBrand({id: $scope.product.brandId}).$promise.then(function (resp) {
                $scope.brand = resp.model;
            });

            //-- 获得用户定义的所有运费模板
            logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                $scope.logisticsTemplates = resp.models;
            });

            //-- 获得类目的所有属性
            categoryService.listAttrs({categoryId: $stateParams.categoryId}).$promise.then(function (resp) {
                $scope.catAttrs = resp.models;
            });

            //-- 获得类目的所有规格
            categoryService.listSpecs({categoryId: $stateParams.categoryId}).$promise.then(function (resp) {
                $scope.specs = resp.models;
                initSpecOptionNameAlias();
                $scope.specsOrigin = angular.copy($scope.specs);
            });

            //-- 获得所有售后保证项列表
            productService.listProdEnumByType({type: 1}).$promise.then(function (resp) {
                $scope.afterSaleEnumList = resp.models;
                angular.forEach($scope.afterSaleEnumList, function (promise) {
                    if (promise.value == 1 || promise.value == 2) {
                        $scope.product.promiseIds.push(promise.id);
                    }
                });

            });


            //-- =======================================函数===========================================

            //--单选属性取消选择
            $scope.cancelAttrSingleSelect = function (attrId) {
                delete $scope.product.attrs['' + attrId];
            };

            //上传单个描述图
            function uploadSingleDescImage(file, groupIndex) {
                if (file.size >= 1024 * 1024) {
                    $window.alert("文件'" + file.name + "'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png","image/gif"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.descImages[groupIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 101
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.descImages[groupIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.descImages[groupIndex].items.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    });
            }

            //-- 上传详细描述图片
            $scope.uploadDescImage = function ($files, groupIndex) {
                var remainLen = $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT - $scope.product.descImages[groupIndex].items.length;
                if ($files.length > remainLen) {
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传" + remainLen + "幅");
                    return;
                } else {
                    if ($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function (file, index) {
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.descImages[groupIndex].items.push(resp.model);
                            });
                        });
                    } else {
                        angular.forEach($files, function (file, index) {
                            uploadSingleDescImage(file, groupIndex);
                        });
                    }
                }

            };


            //-- 删除详细描述图片
            $scope.deleteDescImage = function (groupIndex, index) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.descImages[groupIndex].items.splice(index, 1);
                }
            };

            //-- 移动详细描述图片
            $scope.moveDescImage = function (groupIndex, oldIndex, newIndex) {
                $scope.product.descImages[groupIndex].items.move(oldIndex, newIndex);
            };

            //添加图片组
            $scope.addImageGroup = function () {
                $scope.product.descImages.push({
                    id: null,
                    tag: null,
                    uploading: false,
                    items: []
                });
            };

            //移动图片组
            $scope.moveImageGroup = function (oldGroupIndex, newGroupIndex) {
                $scope.product.descImages.move(oldGroupIndex, newGroupIndex);
            };

            //删除图片组
            $scope.deleteImageGroup = function (groupIndex) {
                if ($window.confirm("你确认删除这个图片组吗？")) {
                    $scope.product.descImages.splice(groupIndex, 1);
                }
            };

            //上传单幅SKU图片
            function uploadSingleSkuImage(file, skuIndex) {
                if(file.size >= 1024*1024){
                    $window.alert("文件'"+file.name+"'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.skus[skuIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.skus[skuIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.skus[skuIndex].images.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    });
            }

            //-- 上传SKU图片
            $scope.uploadSkuImage = function ($files, skuIndex) {
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[skuIndex].images.length;
                if ($files.length > remainLen) {
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传" + remainLen + "幅");
                    return;
                } else {
                    if ($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function (file, index) {
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.skus[skuIndex].images.push(resp.model);
                            });
                        });
                    } else {
                        angular.forEach($files, function (file, index) {
                            uploadSingleSkuImage(file, skuIndex);
                        });
                    }
                }

            };

            //-- 删除SKU图片
            $scope.deleteSkuImage = function (skuIndex, imgIndex) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.skus[skuIndex].images.splice(imgIndex, 1);
                }
            };

            //-- 移动SKU图片
            $scope.moveSkuImage = function (skuIndex, oldImgIndex, newImgIndex) {
                $scope.product.skus[skuIndex].images.move(oldImgIndex, newImgIndex);
            };

            //应用到所有相同的input
            $scope.applyToAllSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function (sku, index) {
                    sku[nameSelector] = value;
                });
            };
            //应用到所有相同但未填的input
            $scope.applyToNotInputSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function (sku, index) {
                    if (angular.isUndefined(sku[nameSelector]) || $.trim(sku[nameSelector]) === "") {
                        sku[nameSelector] = value;
                    }
                });
            };

            //切换到普通商品
            $scope.toggleToSingleSku = function ($event) {
                if ($scope.product.skuType === 0) {
                    //已经是普通商品
                    return;
                }
                var tip = "您是否确认将多规格商品切换为普通商品，你目前已生成" + $scope.product.skus.length + "个货品，";
                tip += "非默认货品的所有数据及相关图片将删除。\r\n【此操作不可逆，是否确认转换？】";
                if ($window.confirm(tip)) {
                    $scope.product.skuType = 0;
                    $scope.product.skus.splice(1, $scope.product.skus.length - 1);
                    $scope.product.skus[0].specs = {};
                    $scope.specs = angular.copy($scope.specsOrigin);
                } else {
                    //还原checkbox状态
                    $event.preventDefault();
                }


            };

            //切换到多规格商品
            $scope.toggleToMultiSku = function ($event) {
                //还原checkbox状态
                $event.preventDefault();

                if ($scope.product.skuType == 1) {
                    //已经是多规格
                    return;
                }
                //弹出规格选择框
                //生成规格项临时变量
                $scope.specsToGen = angular.copy($scope.specsOrigin);
                $('#chooseSpecsModal').modal('show');

            };

            /**
             *增加(乘以)一个维度的规格
             * specId 是规格id，
             * options是要增加规格值数组：[{optionId, optionValue, optionName}]
             */

            function multipleSpec(specId, options) {
                if (options.length === 0)return;

                var newArray = [];
                angular.forEach($scope.product.skus, function (sku, skuIndex) {
                    angular.forEach(options, function (option, optionIndex) {
                        var newSku = angular.copy(sku);
                        if (!newSku.specs)newSku.specs = {};
                        newSku.specs[specId + ''] = {
                            optionId: option.optionId,
                            optionValue: option.optionValue,
                            optionName: option.optionName,
                            optionNameAlias: option.optionNameAlias
                        };
                        newArray.push(newSku);

                    });
                });
                $scope.product.skus.splice(0, $scope.product.skus.length);
                angular.forEach(newArray, function (array, arrayIndex) {
                    $scope.product.skus.push(array);
                });

            }


            //-- 生成多货品
            $scope.generateSkus = function () {
                var canGen = false;
                angular.forEach($scope.specsToGen, function (spec, specIndex) {
                    if (spec.checked) {
                        canGen = true;
                    }
                });
                if (!canGen) {
                    $window.alert("请至少选择一个规格值哦");
                    return;
                }
                $('#chooseSpecsModal').modal('hide');
                //可以生成
                $scope.specs = $scope.specsToGen;
                $scope.product.skuType = 1;
                angular.forEach($scope.specs, function (spec, specIndex) {
                    if (spec.checked) {
                        optionsChecked = _.filter($scope.specs[specIndex].options, function (option) {
                            return option.checked;
                        });
                        multipleSpec($scope.specs[specIndex].id, optionsChecked);
                    }
                });

            };

            //-- 在规格生成对话框中选择规格
            $scope.chooseSpecInDialog = function (specId, optionId) {
                angular.forEach($scope.specsToGen, function (spec, specIndex) {
                    if (spec.id == specId) {
                        var noOptionChecked = true;
                        angular.forEach(spec.options, function (option, optionIndex) {
                            if (option.optionId == optionId) {
                                option.checked = !option.checked;
                            }
                            if (option.checked) {
                                noOptionChecked = false;
                            }
                        });
                        spec.checked = !noOptionChecked;
                    }
                });
            };


            //-- 判断sku在skuList 是否存在(通过规格与规格值判断)
            function existsInList(skuList, sku) {
                var flag = false;
                angular.forEach(skuList, function (item, itemIndex) {
                    if (!flag) {
                        flag = isSpecsEqual(item.specs, sku.specs);
                    }
                });
                return flag;
            }

            //-- 判断规格是否相等
            function isSpecsEqual(spec1, spec2) {
                var result = true;
                var len1 = 0;
                var len2 = 0;
                angular.forEach(spec1, function (value, key) {
                    if (angular.isUndefined(spec2[key]) || (spec2[key].optionId != value.optionId)) {
                        result = false;
                    }
                    len1++;
                });
                angular.forEach(spec2, function (value, key) {
                    len2++;
                });
                if (len1 != len2 || len1 === 0) {
                    result = false;
                }
                return result;
            }

            //-- 在多规格选项卡中选择规格
            $scope.secondChooseSpec = function ($event, specId, option) {
                //是否已有此规格
                var hasThisSpec;
                //提示信息
                var tip;
                //是否改变了sku
                var hasChangeSku = false;

                //第一步，改变$scope.product.skus
                if (!option.checked) {
                    //首先检查货品数量
                    if (isSkuNumExceedLimit()) {
                        //还原checkbox状态
                        $event.preventDefault();
                        return;
                    }
                    //=============================增加规格值=======================================
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (!hasThisSpec) {
                        //情况1-a, 增加一个新的规格的规格值 【方法思维：只需要将现有的skus乘以一个规格即可】
                        multipleSpec(specId, [
                            {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            }
                        ]);
                        hasChangeSku = true;

                    } else {
                        //情况1-b, 此规格已存在，只是单纯增加一个新的规格值
                        //【方法思维：循环检查每个sku，复制一个新的sku，此sku的规格对应的规格值是新值，最终模拟出互不相同的若干个sku，把它们添加到skus即可】
                        var toAddList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //假设增加一个sku
                            var mockSku = angular.copy(sku);
                            mockSku.specs[specId + ""] = {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            };
                            if (!existsInList(toAddList, mockSku) && !existsInList($scope.product.skus, mockSku)) {
                                toAddList.push(mockSku);
                            }
                        });
                        if (toAddList.length !== 0) {
                            angular.forEach(toAddList, function (sku, skuIndex) {
                                $scope.product.skus.push(sku);
                            });
                            hasChangeSku = true;
                        }

                    }

                } else {
                    //=============================减少规格值=======================================
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (hasThisSpec) {
                        //情况2, 删除一个规格值 【方法思维：用一个数组将可以保留下来的sku保存下来，过滤掉那些匹配的规格值】
                        var toRetainList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            if (sku.specs[specId + ""].optionId != option.optionId) {
                                toRetainList.push(angular.copy(sku));
                            }
                        });
                        if (toRetainList.length === 0) {
                            //情况2-a，可能每个sku都去掉一个规格，也可能变为普通商品
                            if (Object.keys($scope.product.skus[0].specs).length > 1) {
                                //情况A, 这种情况表示去掉某个规格的最后一个值
                                angular.forEach($scope.product.skus, function (sku, skuIndex) {
                                    delete sku.specs[specId + ""];
                                });
                                hasChangeSku = true;
                            } else {
                                //情况B,删掉最后一个规格的最后一个规格值，则表示会转换为普通商品
                                tip = "删除此规格值，将会导致多规格商品切换为普通商品";
                                tip += "\r\n【此操作不可逆，是否确认转换？】";
                                if ($window.confirm(tip)) {
                                    $scope.product.skuType = 0;
                                    $scope.product.skus.splice(1, $scope.product.skus.length - 1);
                                    $scope.product.skus[0].specs = {};
                                    hasChangeSku = true;

                                } else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            }
                        } else {
                            if (($scope.product.skus.length - toRetainList.length) > 0) {
                                //情况2-b,至少有一个货品的规格值不是optionId
                                tip = "您将删除" + ($scope.product.skus.length - toRetainList.length) + "个货品，";
                                tip += "这些货品的数据及相关图片将删除。\r\n【此操作不可逆，是否确认转换？】";
                                if ($window.confirm(tip)) {
                                    $scope.product.skus.splice(0, $scope.product.skus.length);
                                    angular.forEach(toRetainList, function (sku, skuIndex) {
                                        $scope.product.skus.push(sku);
                                    });
                                    hasChangeSku = true;

                                } else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            } else {
                                //do nothing
                            }
                        }
                    } else {
                        //不可能存在该情况，do nothing
                    }
                }

                if (hasChangeSku) {
                    //根据sku的规格状态更新specs
                    refreshSpecsBySkus();
                }
                //自检程序
                checkSkusSpecPerfect();

            };

            //-- 判断货品数量是否超过规定，如果超过则否则警告并返回false
            function isSkuNumExceedLimit() {
                if ($scope.product.skus.length >= $scope.MAX_SKU_NUM_LIMIT) {
                    tip = "亲，你的货品数量" + $scope.product.skus.length;
                    tip += "已超过限定值" + $scope.MAX_SKU_NUM_LIMIT + "，无法添加/保存，请删除部分货品。";
                    $window.alert(tip);
                    return true;

                }
                return false;
            }

            //-- 判断规格是否激活
            $scope.isSpecChecked = function (spec) {
                return spec.checked || false;
            };


            //-- 设置为默认SKU
            $scope.setDefaultSku = function ($event, skuIndex) {
                $scope.product.skus.move(skuIndex, 0);
            };

            //-- 删除SKU
            $scope.deleteSku = function (skuIndex) {
                var sku = $scope.product.skus[skuIndex];
                var tip = "";
                if ($scope.product.skus.length === 1) {
                    //已经是最后一个sku
                    tip = "这是最后一个规格货品，删除后商品会自动转换为“普通商品”，是否确认删除并转换？";
                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skuType = 0;
                        $scope.product.skus[0].specs = {};
                        $scope.specs = angular.copy($scope.specsOrigin);
                    }
                } else {
                    tip = "您是否确认删除此规格货品？";
                    if (sku.images.length > 0) {
                        tip += "注意：此货品已上传了" + sku.images.length + "张图片，这些图片将会一并被删除。";
                    }

                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skus.splice(skuIndex, 1);
                        //根据sku的规格状态更新specs
                        refreshSpecsBySkus();
                    }
                }
                //自检程序
                checkSkusSpecPerfect();

            };

            //--根据sku的规格状态更新specs
            function refreshSpecsBySkus() {
                angular.forEach($scope.specs, function (spec, specIndex) {
                    spec.checked = false;
                    angular.forEach(spec.options, function (option, optionIndex) {
                        option.checked = false;
                    });
                });
                angular.forEach($scope.specs, function (spec, specIndex) {
                    angular.forEach(spec.options, function (option, optionIndex) {
                        //对于每个规格值检查是否在sku中
                        var flag = false;
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            if (flag)return;
                            if (sku.specs[spec.id + ""] && sku.specs[spec.id + ""].optionId == option.optionId) {
                                flag = true;
                            }
                        });
                        if (flag) {
                            spec.checked = true;
                            option.checked = true;
                        }
                    });
                });
            }

            //-- 这是一个用来检测商品规格生成是否有问题的程序，其原理比较，为每个sku的规格及规格值的序列值
            function checkSkusSpecPerfect() {
                if ($scope.product.skuType == 1) {
                    var seriNumArray = [];
                    var hasAlert = false;
                    var tip = "亲，如果你见到这个提示，表示即使程序猿加班加点的工作，测试猿十分认真的检查，但是Ta的代码仍发生异常了，十分抱歉，本页面将重新加载，请把发生异常的情景转告给我们的客服人员";
                    angular.forEach($scope.product.skus, function (sku, skuIndex) {
                        var seriNum = "";
                        angular.forEach(sku.specs, function (option, specId) {
                            seriNum += "|" + specId + ":" + option.optionId;
                        });

                        if (hasAlert)return;

                        if (_.contains(seriNumArray, seriNum)) {
                            hasAlert = true;
                            $window.alert(tip);
                            $window.location.reload();
                        } else {
                            seriNumArray.push(seriNum);
                        }
                    });
                    if (hasAlert)return;
                    if (seriNumArray.length !== $scope.product.skus.length) {
                        $window.alert(tip);
                        $window.location.reload();
                    }
                }

            }

            //计算multisku 表格的样式
            $scope.getMultiSkuTableStyle = function () {
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width': (2380 + 200 * specsChecked.length) + 'px',
                    'min-width': '2380px'
                };
            };

            //计算物流重量表格的样式
            $scope.getLogisticsTableStyle = function () {
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width': (230 + 100 * specsChecked.length) + 'px'
                };
            };

            //设置别名，主要为了方便editable-text修改
            function initSpecOptionNameAlias() {
                angular.forEach($scope.specs, function (spec, index) {
                    angular.forEach(spec.options, function (option, index) {
                        option.optionNameAlias = option.optionName;
                    });
                });
            }

            //获得规格别名,如果有别名用别名
            $scope.getOptionRealName = function (option) {
                if (angular.isDefined(option)) {
                    if (angular.isDefined(option.optionNameAlias) && (option.optionNameAlias !== null) && (option.optionNameAlias !== "")) {
                        return option.optionNameAlias;
                    } else {
                        return option.optionName;
                    }
                }
            };


            //重命名规格别名
            $scope.renameOptionName = function (specId, option, data) {
                if ($.trim(data) === "") {
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                return true;
            };


            //重命名规格别名,需要对已生成的sku的规格的别名重新设置
            $scope.renameOptionName4Full = function (specId, option, data) {
                if ($.trim(data) === "") {
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                //对sku的规格的名称进行更改
                angular.forEach($scope.product.skus, function (sku, index) {
                    angular.forEach(sku.specs, function (value, key) {
                        if (key == specId && value.optionId == option.optionId) {
                            value.optionNameAlias = data;
                        }
                    });
                });
                return true;
            };

            //打开添加物流模板窗口
            $scope.showAddLogisticsTemplateModal = function () {
                $('#addLogisticsTemplateModal .modal-dialog').html("");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                $('#addLogisticsTemplateModal .modal-dialog').attr("ng-include", "templates.addLogisticsTemplateModal");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                //此变量用于logisticsCreateCtrl.js
                $scope.$fromProduct = true;
                $('#addLogisticsTemplateModal').modal('show');
            };

            //接收完成添加物流模板事件
            $scope.$on('finishAddLogisticsTemplateEvent', function (e, transFeeTempId) {
                $('#addLogisticsTemplateModal').modal('hide');
                //-- 重新获得用户定义的所有运费模板
                logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                    $scope.logisticsTemplates = resp.models;
                    if (transFeeTempId) {
                        //使得用户不需要再选择一次
                        $scope.product.logisticsTemplateId = parseInt(transFeeTempId);
                    }
                });
            });


            //-- event:提交Form
            $scope.create = function () {
                function _destoryPopover() {
                    $(this).popover('destroy');
                }


                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#productCreateForm :input.ng-invalid');
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

                //2. 检查货品数量
                if (isSkuNumExceedLimit()) {
                    return;
                }


                //3. 检查图片组数量
                if ($scope.product.descImages.length === 0) {
                    console.log('fail to validate image group length');
                    $('#addFirstImageGroupBtn').popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,务必至少新建一个图片组，并上传至少一幅商品详情图。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#addFirstImageGroupBtn').popover('show');
                    $('#addFirstImageGroupBtn').focus();
                    return;
                }

                //4.检查每个图片组是否至少上传了一幅商品详细描述图
                var i;
                for (i = 0; i < $scope.product.descImages.length; i++) {
                    if ($scope.product.descImages[i].items.length === 0) {
                        //show popover tip
                        console.log('fail to validate desc image item length');

                        $('#uploadFirstDescImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅商品详情图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstDescImageBtn-' + i).popover('show');
                        $('#uploadFirstDescImageBtn-' + i).focus();
                        return;
                    }
                }

                //5.检查每个SKU是否至少上传了一幅商品图
                for (i = 0; i < $scope.product.skus.length; i++) {
                    if ($scope.product.skus[i].images.length === 0) {
                        //show popover tip
                        console.log('fail to validate sku images length');
                        $('#uploadFirstSkuImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅货品图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstSkuImageBtn-' + i).popover('show');
                        $('#uploadFirstSkuImageBtn-' + i).focus();
                        return;
                    }
                }

                //6.检查风格是否最多选择了两个
                var styleAttrId = null;
                angular.forEach($scope.catAttrs, function(attr,index){
                    if(attr.name === "风格"){
                        styleAttrId = attr.id;
                    }
                });
                if(styleAttrId !== null && $scope.product.attrs[''+styleAttrId].length > 2){
                    $('#attr-'+styleAttrId+" input:checked:last").popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,风格最多只能选择两个。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#attr-'+styleAttrId+" input:checked:last").popover('show');
                    $('#attr-'+styleAttrId+" input:checked:last").focus();
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.product);

                var postJson = angular.copy($scope.product);
                //清除掉多余的规格值别名
                angular.forEach(postJson.skus, function (sku, index) {
                    angular.forEach(sku.specs, function (value, key) {
                        if (value.optionName == value.optionNameAlias) {
                            delete postJson.skus[index].specs[key].optionNameAlias;
                        }
                    });
                });
                productService.createProduct(angular.toJson(postJson)).$promise.then(function (resp) {
                    if (resp.success) {
                        $state.go('main.products', $stateParams);
                    } else {
                        $window.alert(resp.message);
                    }
                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });

            };


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_add');


        }



    ]);

/**
 * @name: 商品编辑控制器
 * @description: 此控制器兼容从列表跳入详细页，也兼容直接从url获得页面
 * @author: Patrick
 * @create : 2014/9/23.
 */

angular.module('flymvo.product.productEditCtrl', [])
    .controller('productEditCtrl', [
        '$compile',
        '$scope',
        '$filter',
        '$timeout',
        '$window',
        '$stateParams',
        '$upload',
        '$globalSetting',
        'ngTableParams',
        'productConstants',
        'productService',
        'categoryService',
        'logisticsService',
        'fileService',
        function ($compile, $scope, $filter, $timeout, $window, $stateParams, $upload, $globalSetting, TableParams, productConstants, productService,categoryService, logisticsService, fileService) {
            //-- =======================================常量===========================================
            $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT = productConstants.MAX_UPLOAD_SKU_IMAGE_LIMIT;
            $scope.MAX_UPLOAD_DESC_GROUP_LIMIT = productConstants.MAX_UPLOAD_DESC_GROUP_LIMIT;
            $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT = productConstants.MAX_UPLOAD_DESC_IMAGE_LIMIT;
            $scope.MAX_SKU_NUM_LIMIT = productConstants.MAX_SKU_NUM_LIMIT;

            //-- =======================================变量===========================================

            //--tabs
            $scope.tabs = [
                {
                    id: 'basicInfoTab',
                    label :"基本信息",
                    icon : "glyphicon glyphicon-file",
                    viewModeTemplate : '/html/product/include/viewProductTab4Basic.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Basic.html?tag='+$globalSetting.version
                },
                {
                    id: 'specsTab',
                    label :"销售规格与物流",
                    icon : "glyphicon glyphicon-th-large",
                    viewModeTemplate : '/html/product/include/viewProductTab4Specs.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Specs.html?tag='+$globalSetting.version
                },
                {
                    id: 'descTab',
                    label :"详情描述",
                    icon : "glyphicon glyphicon-picture",
                    viewModeTemplate : '/html/product/include/viewProductTab4Desc.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4Desc.html?tag='+$globalSetting.version
                },
                {
                    id: 'packAfterSaleInfo',
                    label :"包装售后",
                    icon :"glyphicon glyphicon-gift",
                    viewModeTemplate : '/html/product/include/viewProductTab4PackAfterSale.html?tag='+$globalSetting.version,
                    editModeTemplate : '/html/product/include/editProductTab4PackAfterSale.html?tag='+$globalSetting.version
                }
            ];


            //-- html模板
            $scope.templates = {
                productEditPage : '/html/product/editProduct.html?tag='+$globalSetting.version,
                //简要
                brief: '/html/product/include/viewProduct4Brief.html?tag='+$globalSetting.version,
                //基本信息(查看模式)
                basicInfoSection4ViewMode: '/html/product/include/viewProduct4BasicInfo.html?tag='+$globalSetting.version,
                //基本信息(编辑模式)
                basicInfoSection4EditMode: '/html/product/include/editProduct4BasicInfo.html?tag='+$globalSetting.version,
                //商品属性(查看模式)
                attributeSection4ViewMode: '/html/product/include/viewProduct4Attribute.html?tag='+$globalSetting.version,
                //商品属性(编辑模式)
                attributeSection4EditMode: '/html/product/include/editProduct4Attribute.html?tag='+$globalSetting.version,
                //包装(查看模式)
                packSection4ViewMode: '/html/product/include/viewProduct4Pack.html?tag='+$globalSetting.version,
                //包装(编辑模式)
                packSection4EditMode: '/html/product/include/editProduct4Pack.html?tag='+$globalSetting.version,
                //售后(查看模式)
                afterSaleSection4ViewMode: '/html/product/include/viewProduct4AfterSale.html?tag='+$globalSetting.version,
                //售后(编辑模式)
                afterSaleSection4EditMode: '/html/product/include/editProduct4AfterSale.html?tag='+$globalSetting.version,
                //详细描述(查看模式)
                descSection4ViewMode: '/html/product/include/viewProduct4Desc.html?tag='+$globalSetting.version,
                //详细描述(编辑模式)
                descSection4EditMode: '/html/product/include/editProduct4Desc.html?tag='+$globalSetting.version,

                //规格信息(查看模式)
                specSection4ViewMode: '/html/product/include/viewProduct4Spec.html?tag='+$globalSetting.version,
                //规格-普通商品(查看模式)
                specSection4SingleSku4ViewMode: '/html/product/include/viewProduct4SpecSingleSku.html?tag='+$globalSetting.version,
                //规格-多规格商品(查看模式)
                specSection4MultiSku4ViewMode: '/html/product/include/viewProduct4SpecMultiSku.html?tag='+$globalSetting.version,


                //规格信息(编辑模式)
                specSection4EditMode: '/html/product/include/editProduct4Spec.html?tag='+$globalSetting.version,
                //规格-普通商品(编辑模式)
                specSection4SingleSku4EditMode: '/html/product/include/editProduct4SpecSingleSku.html?tag='+$globalSetting.version,
                //规格-多规格商品(编辑模式)
                specSection4MultiSku4EditMode: '/html/product/include/editProduct4SpecMultiSku.html?tag='+$globalSetting.version,
                //规格-多规格商品（规格栏）(编辑模式)
                specSection4MultiSku4Specs4EditMode: '/html/product/include/editProduct4SpecMultiSku4Specs.html?tag='+$globalSetting.version,

                //商品图(查看模式)
                imageSection4ViewMode: '/html/product/include/viewProduct4Image.html?tag='+$globalSetting.version,
                //商品图(编辑模式)
                imageSection4EditMode: '/html/product/include/editProduct4Image.html?tag='+$globalSetting.version,

                //物流配送(查看模式)
                logisticsSection4ViewMode: '/html/product/include/viewProduct4Logistics.html?tag='+$globalSetting.version,
                //物流配送(编辑模式)
                logisticsSection4EditMode: '/html/product/include/editProduct4Logistics.html?tag='+$globalSetting.version,

                //图片库选取sku图(编辑模式)
                imageRepoModal4SkuImage: '/html/product/include/imageRepoModal4SkuImage.html?tag='+$globalSetting.version,
                //图片库选取详情图(编辑模式)
                imageRepoModal4DescImage: '/html/product/include/imageRepoModal4DescImage.html?tag='+$globalSetting.version,
                //添加物流模板modal
                addLogisticsTemplateModal: '/html/product/include/addLogisticsTemplateModal.html?tag='+$globalSetting.version,
                //物流模板body
                logisticsTemplatePageBody: '/html/logistics/createLogistics.html?tag=' + $globalSetting.version

            };


            $scope.initVariables = function(){
                //-- 商品(只读用) 含义：readonly product
                $scope.roPro = {};
                $scope.resetBasic();
                $scope.resetSpecs();
                $scope.resetDesc();
                $scope.resetPackAfterSale();
                //-- 商品(修改用)
                $scope.product = {};
                //当前类目
                $scope.category = null;
                //当前品牌
                $scope.brand = null;

                //用户定义的所有运费模板
                $scope.logisticsTemplates = [];

                //当前类目的所有属性
                $scope.catAttrs = [];

                //用于标识是否提交过
                $scope.hasCommit = false;

                //当前类目的所有规格
                $scope.specs = [];
                //保存当前类目的所有规格初始状态
                $scope.specsOrigin = [];

                //获得售后类型常量列表 value 0=没选中，1=选中，2=强制选中不能修改
                $scope.afterSaleEnumList = [];

                //将每个tab的当前template 设置为只读模式
                angular.forEach($scope.tabs, function(tab){
                    tab.currTemplate = tab.viewModeTemplate;
                    if(angular.isDefined(tab.loaded)){
                        delete tab.loaded;
                    }
                });
                //当前激活的tab
                $scope.actvieTab = $scope.tabs[0];


                //用于记录当前选取的sku index，暂时for 图库
                $scope.currentSkuIndex = null;

                //用于记录当前选取的详情图片组index，暂时for 图库
                $scope.currentDescImageGroupIndex = null;

                //货品图片库分页对象
                $scope.imageTableParams4Sku = null;
                $scope.imageRepoList4Sku = [];

                //详情图片库分页对象
                $scope.imageTableParams4Desc = null;
                $scope.imageRepoList4Desc = [];



            };

            //接收productListCtrl的改变商品事件
            $scope.$on('productChangeEven', function (e, module) {
                $scope.changeProduct();
            });


            //-- =======================================函数===========================================

            //改变商品函数
            $scope.changeProduct = function(){
                if($scope.$currProductId !== null){
                    $scope.initVariables();
                    //-- 设置菜单
                    $scope.$changeCurrMenuByCode('mvo_product_list');
                    //-- 激活第一个tab
                    $scope.setActiveTab($scope.tabs[0]);
                }
            };

            //--单选属性取消选择
            $scope.cancelAttrSingleSelect = function(attrId){
                delete $scope.product.attrs[''+attrId];
            };

            //获得sku图片路径
            $scope.getSkuImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_150_150_90" +image.substring(index);
                    }
                }
                return result;
            };

            //获得desc图片路径
            $scope.getDescImageUrl = function(image){
                var result = image;
                if(!$globalSetting.isMockEnv){
                    if(image && image.indexOf("img.feifei.cn/") != -1){
                        var index = image.lastIndexOf(".");
                        result = image.substring(0,index) + "_cache_150_150_90" +image.substring(index);
                    }
                }
                return result;
            };


            //-- 从options中获得optonId对应的optionName
            $scope.getSingleNameFromOptions = function(optionId, options){
                var result = "";
                var keepGoing = true;
                angular.forEach(options, function(option){
                    if(keepGoing){
                        if(option.optionId == optionId){
                            result = option.optionName;
                            keepGoing = false;
                        }
                    }
                });
                return result;
            };

            //-- 从options中获得optionIdArray对应的optionNames
            $scope.getMultiNamesFromOptions = function(optionIdArray, options){
                var result = [];
                angular.forEach(optionIdArray, function(optionId){
                    angular.forEach(options, function(option){
                        if(option.optionId == optionId){
                            result.push(option.optionName);
                        }
                    });
                });
                return result.join(" , ");
            };


            //tab激活样式
            $scope.tabClass = function(tabId) {
                if ($scope.actvieTab.id == tabId) {
                    return "active";
                } else {
                    return "";
                }
            };

            //tab content激活样式
            $scope.tabContentClass = function(tabId) {
                if ($scope.actvieTab.id == tabId) {
                    return "active in";
                } else {
                    return "";
                }
            };
            //根据新的属性列表将商品旧的不匹配的属性过滤掉
            function filterOldAttrs(){
                var deleteKeys = [];
                angular.forEach($scope.roPro.attrs, function(value, key){
                    var flag = false;
                    angular.forEach($scope.catAttrs, function(catAttr, index){
                        if(flag)return;
                        if(key == catAttr.id){
                            flag = true;
                        }
                    });
                    if(!flag){
                        deleteKeys.push(key);
                    }
                });
                angular.forEach(deleteKeys, function(value, index){
                    delete $scope.roPro.attrs[value];
                });
            }

            //选择tab
            $scope.setActiveTab = function(tab){
                $scope.actvieTab = tab;

                if((tab.id === $scope.tabs[0].id) && !$scope.tabs[0].loaded){
                    //【打开商品基本信息tab】
                    $scope.tabs[0].loaded = true;
                    //-- 1.获得商品基本信息
                    productService.getProductBasic({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeBasic(resp.model);

                        //-- 2.获得当前目录
                        productService.getCategory({id: $scope.roPro.categoryId}).$promise.then(function (resp) {
                            $scope.category = resp.model;

                            //-- 3.获得类目的所有属性
                            categoryService.listAttrs({categoryId: $scope.category.id}).$promise.then(function (resp) {
                                $scope.catAttrs = resp.models;
                                //根据新的属性将旧的属性去掉
                                filterOldAttrs();
                                //模拟商品属性数据
                                mockAttrValues();
                            });
                        });

                        //-- 2-b 获得当前品牌
                        productService.getBrand({id: $scope.roPro.brandId}).$promise.then(function (resp) {
                            $scope.brand = resp.model;
                        });

                    });

                }else if((tab.id === $scope.tabs[1].id) && !$scope.tabs[1].loaded) {
                    //【打开规格与物流描述tab】
                    $scope.tabs[1].loaded = true;

                    //-- 1.获得商品规格与物流信息
                    productService.getSpecsAndLogistics({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeSpecs(resp.model);

                        //-- 2.获得类目的所有规格
                        categoryService.listSpecs({categoryId: $scope.roPro.categoryId}).$promise.then(function (resp) {
                            $scope.specs = resp.models;
                            //1.模拟商品规格数据
                            mockSkuSpecs();
                            //2.初始化specs别名
                            initSpecOptionNameAlias4RoPro();
                            //3.备份specs
                            $scope.specsOrigin = angular.copy($scope.specs);

                            //刷新$product.roPro.specs
                            refreshSpecsByRoProSkus();
                        });

                    });

                    //-- 1-b 获得用户定义的所有运费模板
                    logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                        $scope.logisticsTemplates = resp.models;
                        //模拟商品物流数据
                        mockLogistics();
                    });


                }else if((tab.id === $scope.tabs[2].id) && !$scope.tabs[2].loaded) {
                    //【打开详细描述tab】
                    $scope.tabs[2].loaded = true;

                    productService.getProductDesc({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changeDesc(resp.model);
                    });

                }else if((tab.id === $scope.tabs[3].id) && !$scope.tabs[3].loaded) {
                    //【打开商品包装和售后信息tab】
                    $scope.tabs[3].loaded = true;
                    //-- 1.获得商品打包与售后信息
                    productService.getPackAndAfterSale({id: $scope.$currProductId}).$promise.then(function (resp) {
                        $scope.changePackAfterSale(resp.model);

                        //-- 2.获得所有售后保证项列表
                        productService.listProdEnumByType({type : 1}).$promise.then(function (resp) {
                            $scope.afterSaleEnumList = resp.models;
                            //模拟退换货承诺
                            mockPromiseIds();
                            //将强制选中不能修改的加入到roPro里面的promiseIds
                            perfectPromiseIds();
                        });

                    });
                }

            };


            //-- =======================================START: 基本信息Tab部分===========================================

            //basic Tab进入编辑模式
            $scope.editBasic = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象

                $scope.product.id = $scope.$currProductId;
                $scope.product.categoryId = $scope.roPro.categoryId;
                $scope.product.productName = $scope.roPro.productName;
                $scope.product.feature = $scope.roPro.feature;
                $scope.product.keywords = $scope.roPro.keywords;
                $scope.product.subheading = $scope.roPro.subheading;
                $scope.product.attrs = angular.copy($scope.roPro.attrs);
            };

            //初始化属性数组
            $scope.initAttr4MultiSelect = function(attrId){
                if(angular.isUndefined($scope.product.attrs[''+attrId])){
                    $scope.product.attrs[''+attrId] = [];
                }
            };

            //重置roPro basic部分
            $scope.resetBasic = function(){
                $scope.roPro.productName = '';
                $scope.roPro.feature = '';
                $scope.roPro.keywords = '';
                $scope.roPro.subheading = '';
                $scope.roPro.attrs = {};
            };

            //获取basic数据
            $scope.changeBasic = function(model){
                $scope.roPro.id = $scope.$currProductId;
                $scope.roPro.brandId = model.brandId;
                $scope.roPro.categoryId = model.categoryId;
                $scope.roPro.productName = model.productName;
                $scope.roPro.feature = model.feature;
                $scope.roPro.keywords = model.keywords;
                $scope.roPro.subheading = model.subheading;
                $scope.roPro.attrs = model.attrs;
            };

            //basic Tab进入只读模式
            $scope.viewBasic = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存basic Tab
            $scope.saveBasic = function(){
                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#basicForm :input.ng-invalid');
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

                //2.检查风格是否最多选择了两个
                var styleAttrId = null;
                angular.forEach($scope.catAttrs, function(attr,index){
                    if(attr.name === "风格"){
                        styleAttrId = attr.id;
                    }
                });
                if(styleAttrId !== null && $scope.product.attrs[''+styleAttrId].length > 2){
                    $('#attr-'+styleAttrId+" input:checked:last").popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,风格最多只能选择两个。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#attr-'+styleAttrId+" input:checked:last").popover('show');
                    $('#attr-'+styleAttrId+" input:checked:last").focus();
                    return;
                }

                if (!flag) {
                    console.log('validate form, fail!!!');
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#saveBasicBtn').button('loading');
                console.log($scope.product);
                productService.saveProductBasic(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getProductBasic({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeBasic(resp.model);
                            //再次模拟数据
                            if ($globalSetting.isMockEnv) {
                                categoryService.listAttrs({categoryId: $scope.category.id}).$promise.then(function (resp) {
                                    $scope.catAttrs = resp.models;
                                    mockAttrValues();
                                });
                            }

                            $scope.viewBasic();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveBasicBtn').button('reset');
                    }

                });
            };

            //-- 模拟测试数据
            function mockAttrValues(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的attr. 因为rap无法模拟
                    $scope.roPro.attrs = {};
                    angular.forEach($scope.catAttrs, function(attr){
                        if(attr.inputType == 3){
                            //输入框
                            $scope.roPro.attrs[''+attr.id] = "测试商品属性值"+ _.random(1,99);
                        }else if(attr.inputType == 1){
                            //单选,随机从options中取一个
                            $scope.roPro.attrs[''+attr.id] = _.sample(attr.options).optionId;
                        }else if(attr.inputType == 2){
                            //多选,随机从options中取3个
                            $scope.roPro.attrs[''+attr.id] = _.pluck(_.sample(attr.options, 2), 'optionId');
                        }
                    });

                }
            }

            //-- =======================================END  : 基本信息Tab部分===========================================

            //-- =======================================START:包装和售后信息Tab部分======================================
            //包装和售后信息Tab 进入编辑模式
            $scope.editPackAfterSale = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.packInfo = $scope.roPro.packInfo;
                $scope.product.hasWarranty = $scope.roPro.hasWarranty;
                $scope.product.warrantyPeriod = $scope.roPro.warrantyPeriod;
                $scope.product.promiseIds = angular.copy($scope.roPro.promiseIds);
                $scope.product.afterSaleDesc = $scope.roPro.afterSaleDesc;
                if(!$scope.product.promiseIds){
                    $scope.product.promiseIds = [];
                }
            };

            //重置roPro 打包和售后部分
            $scope.resetPackAfterSale = function(){
                $scope.roPro.packInfo = '';
                $scope.roPro.hasWarranty = 0;
                $scope.roPro.warrantyPeriod = '';
                $scope.roPro.promiseIds =  [];
                $scope.roPro.afterSaleDesc = '';
            };

            //重置roPro 打包和售后部分
            $scope.changePackAfterSale = function(model){
                $scope.roPro.packInfo = model.packInfo;
                $scope.roPro.hasWarranty = model.hasWarranty;
                $scope.roPro.warrantyPeriod = model.warrantyPeriod;
                $scope.roPro.promiseIds =  model.promiseIds;
                if(!$scope.roPro.promiseIds){
                    $scope.roPro.promiseIds = [];
                }
                $scope.roPro.afterSaleDesc = model.afterSaleDesc;
            };

            //包装和售后信息Tab进入只读模式
            $scope.viewPackAfterSale = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存包装和售后信息Tab
            $scope.savePackAfterSale = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#packAfterSaleForm :input.ng-invalid');
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

                //提交service
                console.log('validate form, success');
                $('#savePackAfterSaleBtn').button('loading');
                console.log($scope.product);
                productService.savePackAndAfterSale(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getPackAndAfterSale({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changePackAfterSale(resp.model);
                            //模拟退换货承诺数据
                            mockPromiseIds();
                            //将强制选中不能修改的加入到roPro里面的promiseIds
                            perfectPromiseIds();

                            $scope.viewPackAfterSale();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#savePackAfterSaleBtn').button('reset');
                    }

                });
            };

            //-- 模拟测试数据
            function mockPromiseIds(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的promiseIds
                    $scope.roPro.promiseIds = _.pluck( _.sample($scope.afterSaleEnumList, 3), 'id');
                }
            }

            //将强制选中不能修改的加入到roPro里面的promiseIds
            function perfectPromiseIds(){
                angular.forEach($scope.afterSaleEnumList, function(promise, index){
                    if(promise.value == 2 && $scope.roPro.promiseIds.indexOf(promise.id)== -1){
                        $scope.roPro.promiseIds.push(promise.id);
                    }
                });
            }

            //-- =======================================END:  包装和售后信息Tab部分======================================

            //-- =======================================START: 详情描述Tab部分===========================================
            //详情描述Tab 进入编辑模式
            $scope.editDesc = function(){
                //获取图库列表for详情图
                buildImageTableParams4Desc();

                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.descImages = angular.copy($scope.roPro.descImages);

            };

            //重置roPro desc部分
            $scope.resetDesc = function(){
                $scope.roPro.descImages = [];
            };

            //设置roPro desc部分
            $scope.changeDesc = function(model){
                $scope.roPro.descImages = model.descImages;
            };

            //详情描述Tab进入只读模式
            $scope.viewDesc = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存详情描述Tab
            $scope.saveDesc = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#descForm :input.ng-invalid');
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

                //2. 检查是否至少有一个图片组
                if ($scope.product.descImages.length === 0) {
                    console.log('fail to validate image group length');
                    $('#addFirstImageGroupBtn').popover({
                        container: 'body',
                        placement: 'top',
                        content: '亲,务必至少新建一个图片组，并上传至少一幅商品详情图。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#addFirstImageGroupBtn').popover('show');
                    $('#addFirstImageGroupBtn').focus();
                    return;
                }

                //3.检查每个图片组是否至少上传了一幅商品详细描述图
                var i;
                for (i = 0; i < $scope.product.descImages.length; i++) {
                    if ($scope.product.descImages[i].items.length === 0) {
                        //show popover tip
                        console.log('fail to validate desc image item length');

                        $('#uploadFirstDescImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅商品详情图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstDescImageBtn-' + i).popover('show');
                        $('#uploadFirstDescImageBtn-' + i).focus();
                        return;
                    }
                }

                //提交service
                console.log('validate form, success');
                $('#saveDescBtn').button('loading');
                console.log($scope.product);
                productService.saveProductDesc(angular.toJson($scope.product)).$promise.then(function (resp) {
                    if(resp.success){
                        //重新再读取一次并且将其设置为只读模式
                        productService.getProductDesc({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeDesc(resp.model);
                            $scope.viewDesc();
                        });
                    }else{
                        $window.alert(resp.message);
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveDescBtn').button('reset');
                    }

                });
            };


            //上传单个描述图
            function uploadSingleDescImage(file,groupIndex){
                if(file.size >= 1024*1024){
                    $window.alert("文件'"+file.name+"'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png","image/gif"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.descImages[groupIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 101
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.descImages[groupIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.descImages[groupIndex].items.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.descImages[groupIndex].uploading = false;

                    });
            }

            //-- 上传详细描述图片
            $scope.uploadDescImage = function ($files, groupIndex) {
                var remainLen = $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT - $scope.product.descImages[groupIndex].items.length;
                if($files.length > remainLen){
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传"+ remainLen + "幅");
                    return;
                }else{
                    if($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function(file, index){
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.descImages[groupIndex].items.push(resp.model);
                            });
                        });
                    }else{
                        angular.forEach($files, function(file, index){
                            uploadSingleDescImage(file, groupIndex);
                        });
                    }

                }

            };


            //-- 删除详细描述图片
            $scope.deleteDescImage = function (groupIndex, index) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.descImages[groupIndex].items.splice(index, 1);
                }
            };

            //-- 移动详细描述图片
            $scope.moveDescImage = function (groupIndex, oldIndex, newIndex) {
                $scope.product.descImages[groupIndex].items.move(oldIndex, newIndex);
            };

            //添加图片组
            $scope.addImageGroup = function () {
                $scope.product.descImages.push({
                    id : null,
                    tag: null,
                    uploading: false,
                    items: []
                });
            };

            //移动图片组
            $scope.moveImageGroup = function (oldGroupIndex, newGroupIndex) {
                $scope.product.descImages.move(oldGroupIndex, newGroupIndex);
            };

            //删除图片组
            $scope.deleteImageGroup = function (groupIndex) {
                if ($window.confirm("你确认删除这个图片组吗？")) {
                    $scope.product.descImages.splice(groupIndex, 1);
                }
            };

            //-- =======================================END: 详情描述Tab部分=============================================


            //-- =======================================START:规格与物流信息Tab部分======================================
            //规格与物流信息Tab 进入编辑模式
            $scope.editSpecs = function(){
                //获取图库列表for SKU
                buildImageTableParams4Sku();

                $scope.actvieTab.currTemplate = $scope.actvieTab.editModeTemplate;
                //将只读对象的数据拷贝到待编辑对象
                $scope.product.id = $scope.$currProductId;
                $scope.product.skuType = $scope.roPro.skuType;
                $scope.product.skus = angular.copy($scope.roPro.skus);
                $scope.product.logisticsTemplateId = $scope.roPro.logisticsTemplateId;
                $scope.product.whoPayCarriage = $scope.roPro.whoPayCarriage;
                $scope.product.shipRegionRemark = $scope.roPro.shipRegionRemark;

                //根据sku的规格状态更新specs
                refreshSpecsBySkus();
            };


            //重置roPro specs部分
            $scope.resetSpecs = function(){
                $scope.roPro.skuType = 0;
                $scope.roPro.skus =  [];
                $scope.roPro.logisticsTemplateId = null;
                $scope.roPro.whoPayCarriage = 1;
                $scope.roPro.shipRegionRemark = '';
            };

            //设置roPro specs部分
            $scope.changeSpecs = function(model){
                $scope.roPro.skuType = model.skuType;
                $scope.roPro.skus =  model.skus;
                $scope.roPro.logisticsTemplateId = model.logisticsTemplateId;
                $scope.roPro.whoPayCarriage = model.whoPayCarriage;
                if(!$scope.roPro.whoPayCarriage){
                    //如果没有whoPayCarriage，默认卖家承担运费
                    $scope.roPro.whoPayCarriage = 1;
                }
                $scope.roPro.shipRegionRemark = model.shipRegionRemark;
            };


            //规格与物流信息Tab进入只读模式
            $scope.viewSpecs = function(){
                $scope.actvieTab.currTemplate = $scope.actvieTab.viewModeTemplate;
                $scope.hasCommit = false;
            };

            //保存规格与物流信息Tab
            $scope.saveSpecs = function(){
                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#specsForm :input.ng-invalid');
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

                //2. 检查货品数量
                if(isSkuNumExceedLimit()){
                    return;
                }

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //3.检查每个SKU是否至少上传了一幅商品图
                for (i = 0; i < $scope.product.skus.length; i++) {
                    if ($scope.product.skus[i].images.length === 0) {
                        //show popover tip
                        console.log('fail to validate sku images length');
                        $('#uploadFirstSkuImageBtn-' + i).popover({
                            container: 'body',
                            placement: 'top',
                            content: '亲,务必至少上传一幅货品图。',
                            trigger: 'focus'
                        }).on('hidden.bs.popover', _destoryPopover);
                        $('#uploadFirstSkuImageBtn-' + i).popover('show');
                        $('#uploadFirstSkuImageBtn-' + i).focus();
                        return;
                    }
                }

                //提交service
                console.log('validate form, success');
                $('#saveSpecsBtn').button('loading');
                console.log($scope.product);

                var postJson = angular.copy($scope.product);
                //清除掉多余的规格值别名
                angular.forEach(postJson.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(value.optionName == value.optionNameAlias){
                            delete postJson.skus[index].specs[key].optionNameAlias;
                        }
                    });
                });

                productService.saveSpecsAndLogistics(angular.toJson(postJson)).$promise.then(function (resp) {
                    if(resp.success){
                        //1.重新再读取一次并且将其设置为只读模式
                        productService.getSpecsAndLogistics({id: $scope.$currProductId}).$promise.then(function (resp) {
                            $scope.changeSpecs(resp.model);

                            //-- 2.获得类目的所有规格
                            categoryService.listSpecs({categoryId: $scope.roPro.categoryId}).$promise.then(function (resp) {
                                $scope.specs = resp.models;
                                //1.模拟规格数据
                                mockSkuSpecs();
                                //2.模拟物流数据
                                mockLogistics();
                                //3.设置别名
                                initSpecOptionNameAlias4RoPro();
                                //4.备份初始specs
                                $scope.specsOrigin = angular.copy($scope.specs);
                                //5.刷新specs
                                refreshSpecsByRoProSkus();
                                $scope.viewSpecs();
                            });

                        });
                    }else{
                        $window.alert(resp.message);
                        $('#saveSpecsBtn').button('reset');
                    }

                },function(resp) {
                    if(resp.data.message){
                        $window.alert(resp.data.message);
                        $('#saveSpecsBtn').button('reset');
                    }

                });
            };

            //上传单幅SKU图片
            function uploadSingleSkuImage(file, skuIndex){
                if(file.size >= 1024*1024){
                    $window.alert("文件'"+file.name+"'的大小超过1024KB，不能上传。");
                    return;
                }else if(["image/jpeg","image/jpeg","image/png"].indexOf(file.type) === -1){
                    $window.alert("不支持文件'" + file.name + "'的文件格式，不能上传。");
                    return;
                }
                $scope.product.skus[skuIndex].uploading = true;
                $upload.upload({
                    url: '/data/upload/image',
                    data: {
                        type: 100
                    },
                    file: file,
                    fileFormDataName: 'uploadFiles'
                }).progress(function (evt) {
                        var uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + uploadPercent);
                        $scope.product.skus[skuIndex].uploadPercent = uploadPercent;
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        var uploadResult = data.models[0];
                        if (uploadResult && uploadResult.success) {
                            //成功
                            $scope.product.skus[skuIndex].images.push({
                                url: uploadResult.url,
                                id: ""
                            });
                        } else if (uploadResult && !uploadResult.success) {
                            $window.alert(uploadResult.message);
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        if (data && data.resultCode === "501") {
                            $window.alert("亲，你的文件太大了。本系统最大允许上传2M大小的文件。");
                        } else {
                            $window.alert("上传失败");
                        }

                        $scope.product.skus[skuIndex].uploading = false;

                    });
            }

            //-- 上传SKU图片
            $scope.uploadSkuImage = function ($files,skuIndex) {
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[skuIndex].images.length;
                if($files.length > remainLen){
                    $window.alert("亲，你一次过上传的图片太多了，现在只能上传"+ remainLen + "幅");
                    return;
                }else{
                    if($globalSetting.isMockEnv && !$globalSetting.isTestUploadController) {
                        angular.forEach($files, function(file, index){
                            fileService.uploadImage().$promise.then(function (resp) {
                                $scope.product.skus[skuIndex].images.push(resp.model);
                            });
                        });
                    }else{
                        angular.forEach($files, function(file, index){
                            uploadSingleSkuImage(file, skuIndex);
                        });
                    }
                }

            };

            //-- 删除SKU图片
            $scope.deleteSkuImage = function (skuIndex, imgIndex) {
                if ($window.confirm("你确认删除这个图片吗？")) {
                    $scope.product.skus[skuIndex].images.splice(imgIndex, 1);
                }
            };

            //-- 移动SKU图片
            $scope.moveSkuImage = function (skuIndex, oldImgIndex, newImgIndex) {
                $scope.product.skus[skuIndex].images.move(oldImgIndex, newImgIndex);
            };

            //应用到所有相同的input
            $scope.applyToAllSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function(sku, index){
                    sku[nameSelector] = value;
                });
            };
            //应用到所有相同但未填的input
            $scope.applyToNotInputSku = function (nameSelector, value) {
                angular.forEach($scope.product.skus, function(sku, index){
                    if (angular.isUndefined(sku[nameSelector]) || $.trim(sku[nameSelector]) === "") {
                        sku[nameSelector] = value;
                    }
                });
            };

            //-- 判断sku在skuList 是否存在(通过规格与规格值判断)
            function existsInList(skuList, sku) {
                var flag = false;
                angular.forEach(skuList, function (item, itemIndex) {
                    if (!flag) {
                        flag = isSpecsEqual(item.specs, sku.specs);
                    }
                });
                return flag;
            }

            //-- 判断规格是否相等
            function isSpecsEqual(spec1, spec2){
                var result = true;
                var len1 = 0;
                var len2 = 0;
                angular.forEach(spec1, function (value, key) {
                    if(angular.isUndefined(spec2[key]) || (spec2[key].optionId != value.optionId)){
                        result = false;
                    }
                    len1++;
                });
                angular.forEach(spec2, function (value, key) {
                    len2++;
                });
                if(len1 != len2 || len1 === 0){
                    result = false;
                }
                return result;
            }



            //-- 在多规格选项卡中选择规格 （修改商品版本与创建页面的不同：不能删除已有规格）
            $scope.secondChooseSpec = function ($event, specId, option) {
                //是否已有此规格
                var hasThisSpec;
                //提示信息
                var tip;
                //是否改变了sku
                var hasChangeSku = false;

                //第一步，改变$scope.product.skus [diff]
                if (!option.checked || option.deleteForbidden) {
                    //首先检查货品数量
                    if(isSkuNumExceedLimit()){
                        //还原checkbox状态
                        $event.preventDefault();
                        return;
                    }
                    //==========增加规格值
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (!hasThisSpec) {
                        //情况1-a, 增加一个新的规格的规格值
                        //在编辑页面不存在此情况
                        console.log("error,1-a");
                    } else {
                        //情况1-b, 此规格已存在，只是单纯增加一个新的规格值
                        //【方法思维：循环检查每个sku，复制一个新的sku，此sku的规格对应的规格值是新值，最终模拟出互不相同的若干个sku，把它们添加到skus即可】
                        //要增加的sku list
                        var toAddList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //假设增加一个sku
                            var mockSku = angular.copy(sku);
                            //[diff]
                            if(angular.isDefined(mockSku.id)){
                                //重要，去掉skuid
                                delete mockSku.id;
                            }
                            mockSku.specs[specId + ""] = {
                                optionId: option.optionId,
                                optionValue: option.optionValue,
                                optionName: option.optionName,
                                optionNameAlias: option.optionNameAlias
                            };
                            if (!existsInList(toAddList, mockSku) && !existsInList($scope.product.skus, mockSku) ) {
                                toAddList.push(mockSku);
                            }
                        });
                        if(toAddList.length !== 0){
                            angular.forEach(toAddList, function (sku, skuIndex) {
                                $scope.product.skus.push(sku);
                            });
                            hasChangeSku = true;
                        }

                        if(option.deleteForbidden){
                            //还原checkbox状态
                            $event.preventDefault();
                        }

                    }

                } else {
                    //============减少规格值
                    hasThisSpec = $scope.product.skus[0].specs.hasOwnProperty(specId + "");
                    if (hasThisSpec) {
                        //情况2, 删除一个规格值【方法思维：用一个数组将可以保留下来的sku保存下来，过滤掉那些匹配的规格值
                        var toRetainList = [];
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            //[diff]
                            if (sku.specs[specId + ""].optionId != option.optionId || angular.isDefined(sku.id)) {
                                toRetainList.push(angular.copy(sku));
                            }
                        });
                        if (toRetainList.length === 0) {
                            //在编辑页面不存在此情况
                            console.log("error,2-a");
                        } else {
                            if (($scope.product.skus.length - toRetainList.length) > 0) {
                                //情况2-b,至少有一个货品的规格值不是optionId
                                tip = "您将删除" + ($scope.product.skus.length - toRetainList.length) + "个货品，";
                                tip += "这些货品的数据及相关图片将删除。\r\n【此操作不可逆，是否确认转换？】";
                                if ($window.confirm(tip)) {
                                    $scope.product.skus.splice(0, $scope.product.skus.length);
                                    angular.forEach(toRetainList, function (sku, skuIndex) {
                                        $scope.product.skus.push(sku);
                                    });
                                    hasChangeSku = true;

                                }else {
                                    //还原checkbox状态
                                    $event.preventDefault();
                                }
                            } else {
                                //do nothing
                            }
                        }

                    } else {
                        //do nothing
                    }
                }

                if(hasChangeSku){
                    //根据sku的规格状态更新specs
                    refreshSpecsBySkus();
                }
                //自检程序
                checkSkusSpecPerfect();

            };

            $scope.isSkuExist = function(sku){
                return angular.isDefined(sku.id) && sku.id !== null;
            };

            //-- 判断规格是否激活
            $scope.isSpecChecked = function (spec) {
                return spec.checked || false;
            };


            //-- 设置为默认SKU
            $scope.setDefaultSku = function ($event, skuIndex) {
                $scope.product.skus.move(skuIndex, 0);
            };

            //-- 删除SKU
            $scope.deleteSku = function (skuIndex) {
                var sku = $scope.product.skus[skuIndex];
                var tip = "";
                if ($scope.product.skus.length === 1) {
                    //已经是最后一个sku
                    tip = "这是最后一个规格货品，删除后商品会自动转换为“普通商品”，是否确认删除并转换？";
                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skuType = 0;
                        $scope.product.skus[0].specs = {};
                        $scope.specs = angular.copy($scope.specsOrigin);
                    }
                } else {
                    tip = "您是否确认删除此规格货品？";
                    if (sku.images.length > 0) {
                        tip += "注意：此货品已上传了" + sku.images.length + "张图片，这些图片将会一并被删除。";
                    }

                    if ($window.confirm(tip)) {
                        //确认删除
                        $scope.product.skus.splice(skuIndex, 1);
                        //根据sku的规格状态更新specs
                        refreshSpecsBySkus();


                    }
                }

                checkSkusSpecPerfect();

            };

            //--根据product.skus的规格状态更新specs
            function refreshSpecsBySkus() {

                angular.forEach($scope.specs, function (spec, specIndex) {
                    spec.checked = false;
                    angular.forEach(spec.options, function (option, optionIndex) {
                        option.checked = false;
                    });
                });

                angular.forEach($scope.specs, function (spec, specIndex) {
                    angular.forEach(spec.options, function (option, optionIndex) {
                        //对于每个规格值检查是否在sku中
                        var flag = false;
                        angular.forEach($scope.product.skus, function (sku, skuIndex) {
                            if (flag)return;
                            if (sku.specs[spec.id + ""] && sku.specs[spec.id + ""].optionId == option.optionId) {
                                flag = true;
                                if(angular.isDefined(sku.id) && sku.id!==null){
                                    //[重要：此option标识为不能被删除]
                                    option.deleteForbidden = true;
                                }
                            }
                        });
                        if (flag) {
                            spec.checked = true;
                            option.checked = true;
                        }
                    });
                });
            }

            //--根据roPro.skus的规格状态更新specs,基本等同于方法refreshSpecsBySkus
            function refreshSpecsByRoProSkus() {
                $scope.specs = angular.copy($scope.specsOrigin);

                angular.forEach($scope.specs, function (spec, specIndex) {
                    angular.forEach(spec.options, function (option, optionIndex) {
                        //对于每个规格值检查是否在sku中
                        var flag = false;
                        angular.forEach($scope.roPro.skus, function (sku, skuIndex) {
                            if (flag)return;
                            if (sku.specs[spec.id + ""] && sku.specs[spec.id + ""].optionId == option.optionId) {
                                flag = true;
                            }
                        });
                        if (flag) {
                            spec.checked = true;
                            option.checked = true;
                        }
                    });
                });
            }


            //-- 这是一个用来检测商品规格生成是否有问题的程序，其原理比较，为每个sku的规格及规格值的序列值
            function checkSkusSpecPerfect() {
                if ($scope.product.skuType == 1) {
                    var seriNumArray = [];
                    var hasAlert = false;
                    var tip = "亲，如果你见到这个提示，表示即使程序猿加班加点的工作，测试猿十分认真的检查，但是Ta的代码仍发生异常了，十分抱歉，本页面将重新加载，请把发生异常的情景转告给我们的客服人员";
                    angular.forEach($scope.product.skus, function (sku, skuIndex) {
                        var seriNum = "";
                        angular.forEach(sku.specs, function (option, specId) {
                            seriNum += "|" + specId + ":" + option.optionId;
                        });

                        if(hasAlert)return;

                        if (_.contains(seriNumArray, seriNum)) {
                            hasAlert = true;
                            $window.alert(tip);
                            $window.location.reload();
                        } else {
                            seriNumArray.push(seriNum);
                        }
                    });
                    if(hasAlert)return;
                    if (seriNumArray.length !== $scope.product.skus.length) {
                        $window.alert(tip);
                        $window.location.reload();
                    }
                }

            }

            $scope.getLogisticsTemplateName = function(){
                var result = "";
                angular.forEach($scope.logisticsTemplates, function(value, index){
                   if(value.transFeeTempId == $scope.roPro.logisticsTemplateId){
                       result = value.transFeeTempName;
                   }
                });
                return result;
            };

            function isSkuNumExceedLimit(){
                //首先检查货品数量是否超过
                if($scope.product.skus.length >= $scope.MAX_SKU_NUM_LIMIT){
                    tip = "亲，你的货品数量"+ $scope.product.skus.length;
                    tip += "已超过限定值"+$scope.MAX_SKU_NUM_LIMIT+ "，无法添加/保存，请删除部分货品。";
                    $window.alert(tip);
                    return true;

                }
                return false;
            }

            //计算multisku 表格的样式
            $scope.getMultiSkuTableStyle = function(){
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width' : (2380 + 200*specsChecked.length)+'px',
                    'min-width': '2380px'
                };
            };

            //计算物流重量表格的样式
            $scope.getLogisticsTableStyle = function(){
                var specsChecked = $filter('filter')($scope.specs, $scope.isSpecChecked);
                return {
                    'width' : (230 + 100*specsChecked.length)+'px'
                };
            };

            //-- 模拟规格数据
            function mockSkuSpecs(){
                if ($globalSetting.isMockEnv) {
                    //模拟修改roPro里面的sku.specs. 因为rap无法模拟
                    if($scope.roPro.skuType === 0){
                        //去掉多余的sku
                        $scope.roPro.skus.splice(1, $scope.roPro.skus.length-1);
                    }else{
                        //方法：rap固定返回4个sku,随机取规格列表中的其中两个，每个sku取这两个的随机值.缺陷：有可能导致出现相同规格选项的skus
                        var specsSelected = _.sample($scope.specs,2);
                        angular.forEach($scope.roPro.skus, function(sku){
                            sku.specs = {};
                            angular.forEach(specsSelected, function(spec){
                                sku.specs[spec.id + ""] = angular.copy(_.sample(spec.options));
                                var alias = _.random(0, 100);
                                if(alias <= 50){
                                    //随机赋予一个别名
                                    sku.specs[spec.id + ""].optionNameAlias = "别名"+ alias;
                                }
                            });
                        });
                    }

                }
            }

            //-- 模拟物流模板数据
            function mockLogistics(){
                if ($globalSetting.isMockEnv) {
                    if(angular.isDefined($scope.logisticsTemplates)){
                        $scope.roPro.logisticsTemplateId = _.sample($scope.logisticsTemplates).transFeeTempId;
                    }
                }

            }


            //设置别名，主要为了方便editable-text修改
            function initSpecOptionNameAlias4RoPro(){
                                angular.forEach($scope.specs, function(spec, index){
                    angular.forEach(spec.options, function(option, index){
                        option.optionNameAlias = option.optionName;
                    });
                });
                //根据sku中的别名设置specs中的规格别名
                angular.forEach($scope.roPro.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(angular.isDefined(value.optionNameAlias) && (value.optionNameAlias !==null) && (value.optionNameAlias !=="")){
                            //找到有需要别名的规格与规格项，重新赋予名称
                            angular.forEach($scope.specs, function(spec, index){
                                if(key == spec.id){
                                    angular.forEach(spec.options, function(option, index){
                                        if(value.optionId == option.optionId){
                                            option.optionName = value.optionNameAlias;
                                            option.optionNameAlias = value.optionNameAlias;
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
                
            }

            //获得规格别名,如果有别名用别名
            $scope.getOptionRealName = function(option){
                if(angular.isDefined(option)){
                    if(angular.isDefined(option.optionNameAlias)  && (option.optionNameAlias !==null) && (option.optionNameAlias !=="")){
                        return option.optionNameAlias;
                    }else{
                        return option.optionName;
                    }
                }

            };


            //重命名规格别名,需要对已生成的sku的规格的别名重新设置
            $scope.renameOptionName4Full = function(specId, option, data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (data.length > 50) {
                    return "不能超过50个字符";
                }
                //对sku的规格的名称进行更改
                angular.forEach($scope.product.skus, function(sku, index){
                    angular.forEach(sku.specs, function(value, key){
                        if(key == specId && value.optionId == option.optionId){
                            value.optionNameAlias = data;
                        }
                    });
                });
                return true;
            };

            //打开添加物流模板窗口
            $scope.showAddLogisticsTemplateModal = function(){
                $('#addLogisticsTemplateModal .modal-dialog').html("");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                $('#addLogisticsTemplateModal .modal-dialog').attr("ng-include","templates.addLogisticsTemplateModal");
                $compile($('#addLogisticsTemplateModal').contents())($scope);

                //此变量用于logisticsCreateCtrl.js
                $scope.$fromProduct = true;
                $('#addLogisticsTemplateModal').modal('show');
            };

            //接收完成添加物流模板事件
            $scope.$on('finishAddLogisticsTemplateEvent',function(e, transFeeTempId){
                $('#addLogisticsTemplateModal').modal('hide');
                //-- 重新获得用户定义的所有运费模板
                logisticsService.listSupplierLogisticsTemplates().$promise.then(function (resp) {
                    $scope.logisticsTemplates = resp.models;
                    if(transFeeTempId){
                        //使得用户不需要再选择一次
                        $scope.product.logisticsTemplateId = parseInt(transFeeTempId);
                    }
                });
            });

            //-- =======================================END  :规格与物流信息Tab部分======================================

            //-- =======================================START:图库部分======================================

            //-- 获取图库列表for详情图
            function buildImageTableParams4Desc(){
                //-- ngTable对象构造
                $scope.imageTableParams4Desc = new TableParams({
                    page: 1,
                    count: 12
                }, {
                    counts: [12],
                    total: 0,
                    $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                    getData: function ($defer, params) {

                        //=========构造查询条件 start =========
                        var postData = {};
                        //商品id
                        postData.id = $scope.$currProductId;
                        //类型
                        postData.type = 2;
                        //页码
                        postData.pageIndex = params.page();
                        //每页多少条
                        postData.pageSize = params.count();


                        if(params.sorting() && (params.orderBy().length > 0)){
                            var str = params.orderBy()[0];
                            //排序field
                            //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                            postData.orderBy = str.substring(1,str.length);
                            postData.desc = (str.substring(0,1) !== "+");
                        }
                        //=========构造查询条件 end =========

                        productService.getImageRepoList(postData).$promise.then(function (resp) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.imageRepoList4Desc = list;
                            $defer.resolve(list);
                        });


                    }
                });
            }


            //打开选取详情图Modal
            $scope.showModal4SelectImages4Desc = function(descImageGroupIndex){
                $('#imageRepoModal4Desc').modal('show');
                $scope.currentDescImageGroupIndex = descImageGroupIndex;
            };

            //确认选取详情图
            $scope.confirmSelectImages4Desc = function(url){
                var remainLen = $scope.MAX_UPLOAD_DESC_IMAGE_LIMIT - $scope.product.descImages[$scope.currentDescImageGroupIndex].items.length;
                if(remainLen <= 0){
                    $window.alert("亲，该图片组图片已满，不能再增加了");
                    return;
                }else{
                    $scope.product.descImages[$scope.currentDescImageGroupIndex].items.push({
                        id : null,
                        url : url
                    });
                }
            };

            //取消选取详情图
            $scope.cancelSelectImages4Desc = function(){
                $('#imageRepoModal4Desc').modal('hide');
            };

            //判断图片组中是否已包含此url
            $scope.containDescImageUrl = function(url){
                var flag = false;
                if($scope.currentDescImageGroupIndex !== null){
                    angular.forEach($scope.product.descImages[$scope.currentDescImageGroupIndex].items, function(item, index){
                        if(flag)return;
                        if(item.url == url){
                            flag = true;
                        }
                    });
                }
                return flag;
            };



            //-- 获取图库列表forSKU图
            function buildImageTableParams4Sku(){
                //-- ngTable对象构造
                $scope.imageTableParams4Sku = new TableParams({
                    page: 1,
                    count: 12
                }, {
                    counts: [12],
                    total: 0,
                    $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                    getData: function ($defer, params) {

                        //=========构造查询条件 start =========
                        var postData = {};
                        //商品id
                        postData.id = $scope.$currProductId;
                        //类型
                        postData.type = 1;
                        //页码
                        postData.pageIndex = params.page();
                        //每页多少条
                        postData.pageSize = params.count();


                        if(params.sorting() && (params.orderBy().length > 0)){
                            var str = params.orderBy()[0];
                            //排序field
                            //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                            postData.orderBy = str.substring(1,str.length);
                            postData.desc = (str.substring(0,1) !== "+");
                        }
                        //=========构造查询条件 end =========

                        productService.getImageRepoList(postData).$promise.then(function (resp) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $scope.imageRepoList4Sku = list;
                            $defer.resolve(list);
                        });


                    }
                });
            }


            //打开选取SKU图Modal
            $scope.showModal4SelectImages4Sku = function(skuIndex){
                $('#imageRepoModal4Sku').modal('show');
                $scope.currentSkuIndex = skuIndex;
            };

            //确认选取详情图
            $scope.confirmSelectImages4Sku = function(url){
                var remainLen = $scope.MAX_UPLOAD_SKU_IMAGE_LIMIT - $scope.product.skus[$scope.currentSkuIndex].images.length;
                if(remainLen <= 0){
                    $window.alert("亲，该规格描述图片已满，不能再增加了");
                    return;
                }else{
                    $scope.product.skus[$scope.currentSkuIndex].images.push({
                        id : null,
                        url : url
                    });
                }
            };

            //取消选取详情图
            $scope.cancelSelectImages4Sku = function(){
                $('#imageRepoModal4Sku').modal('hide');
            };

            //判断图片组中是否已包含此url
            $scope.containSkuImageUrl = function(url){
                var flag = false;
                if($scope.currentSkuIndex !== null){
                    angular.forEach($scope.product.skus[$scope.currentSkuIndex].images, function(item, index){
                        if(flag)return;
                        if(item.url == url){
                            flag = true;
                        }
                    });
                }
                return flag;
            };
            //-- =======================================END  :图库部分======================================

            //-- =======================================初始化===========================================
            $scope.initVariables();

            if(angular.isDefined($stateParams.productId) && $stateParams.productId!==null){
                //获取商品id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currProductId = $stateParams.productId;
                $scope.changeProduct();
            }
        }



    ]);

/**
 * @name: 商品列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productListCtrl', [])
    .controller('productListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'productConstants',
        'productService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $globalSetting, productConstants, productService, TableParams) {

            //-- =======================================变量===========================================

            //-- 初始化常量
            $scope._productTypes = productConstants.productTypes;
            $scope._shelvesStatuses = productConstants.shelvesStatuses;
            $scope._watchStatuses = productConstants.watchStatuses;

            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {

                //商品类型
                productTypes : [],
                //上架状态
                shelvesStatuses : [],
                //监控状态
                watchStatuses : []
            };
            //-- 用于记录选择的商品id
            $scope.selectedItems = [];
            //-- 用于记录全部的商品id
            $scope.selectedItems4All = [];

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);

            //-- 用于记录当前选择的productId
            $scope.$currProductId = null;

            //-- 用于记录当前需要上架的skus
            $scope.skuIdArray4Shelve = [];
            //-- 用于记录当前需要下架的skus
            $scope.skuIdArray4OffShelve = [];
            //-- 用于记录当前需要删除的skus
            $scope.skuIdArray4Delete = [];
            //-- 用于记录当前需要申请上架的sku
            $scope.skuId4ApplyOnShelve = null;

            //-- 记录当前table的list
            $scope.skuList = [];


            //-- html模板
            $scope.templates = {
                multiShelveModal : '/html/product/include/multiShelveModal.html?tag='+$globalSetting.version,
                multiOffShelveModal : '/html/product/include/multiOffShelveModal.html?tag='+$globalSetting.version,
                multiDeleteModal : '/html/product/include/multiDeleteModal.html?tag='+$globalSetting.version,
                applyOnShelveModal : '/html/product/include/applyOnShelveModal.html?tag='+$globalSetting.version,
                noProductSelectAlert : '/html/product/include/noProductSelectAlert.html?tag='+$globalSetting.version
            };


            //-- =======================================函数===========================================

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.productSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#productSearchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#productSearchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.productTableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){

                //将错误移除
                $scope.productSearchForm.$setPristine(true);
                //处理验证的field
                $scope.productSearchForm.minPrice.$setViewValue("");
                $scope.productSearchForm.maxPrice.$setViewValue("");
                $scope.productSearchForm.minQuantityOnHand.$setViewValue("");
                $scope.productSearchForm.maxQuantityOnHand.$setViewValue("");
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);

            };

            //-- 显示详细商品
            $scope.showDetail = function(productId){
                $('#productListPage').hide();
                $('#productEditPage').slideDown("slow");
                // 设置当前商品id
                $scope.$currProductId = productId;
                //发送商品改变事件
                $scope.$broadcast('productChangeEven', true);
            };

            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.productTableParams.reload();
                $('#productListPage').show();
                $('#productEditPage').hide();
            };

            //--根据skuIdArray获得skuArray
            function getSkuArrayBySkuId(skuIdArray){
                var list = [];
                angular.forEach($scope.skuList, function(sku, index){
                    if(skuIdArray.indexOf(sku.id) != -1){
                        list.push(sku);
                    }
                });
                return list;
            }


            //-- 显示批量上架Modal
            $scope.showModal4MultiShelve = function(sku){
                if(sku){
                    $scope.skuIdArray4Shelve = [];
                    $scope.skuIdArray4Shelve.push(sku.id);
                    //show modal
                    $('#multiShelveModal .content').html("您确认上架商品'"+ sku.productName + "'吗？");
                    $('#multiShelveModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiShelveBtn').popover('destroy');
                        });
                        $('#multiShelveBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canShelve);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以上架的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiShelveBtn').popover('destroy');
                        });
                        $('#multiShelveBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiShelveModal .content').html("您确认上架以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiShelveModal').modal('show');

                        $scope.skuIdArray4Shelve = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量上架确认
            $scope.multiShelve = function(){
                $('#multiShelveModal').modal('hide');
                productService.shelve({ids: $scope.skuIdArray4Shelve}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();

                });
            };


            //-- 显示批量下架Modal
            $scope.showModal4MultiOffShelve = function(sku){
                if(sku){
                    $scope.skuIdArray4OffShelve = [];
                    $scope.skuIdArray4OffShelve.push(sku.id);
                    //show modal
                    $('#multiOffShelveModal .content').html("您确认下架商品'"+ sku.productName + "'吗？");
                    $('#multiOffShelveModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiOffShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiOffShelveBtn').popover('destroy');
                        });
                        $('#multiOffShelveBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canOffShelve);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiOffShelveBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以下架的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiOffShelveBtn').popover('destroy');
                        });
                        $('#multiOffShelveBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiOffShelveModal .content').html("您确认下架以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiOffShelveModal').modal('show');

                        $scope.skuIdArray4OffShelve = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量下架确认
            $scope.multiOffShelve = function(){
                $('#multiOffShelveModal').modal('hide');
                productService.offShelve({ids: $scope.skuIdArray4OffShelve}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();
                });
            };


            //-- 显示批量删除Modal
            $scope.showModal4MultiDelete = function(sku){
                if(sku){
                    $scope.skuIdArray4Delete = [];
                    $scope.skuIdArray4Delete.push(sku.id);
                    //show modal
                    $('#multiDeleteModal .content').html("您确认删除商品'"+ sku.productName + "'吗？");
                    $('#multiDeleteModal').modal('show');

                }else{
                    //check if sku selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiDeleteBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDeleteBtn').popover('destroy');
                        });
                        $('#multiDeleteBtn').popover('show');
                        return;
                    }
                    var skuArray = getSkuArrayBySkuId($scope.selectedItems);
                    skuArray = $filter('filter')(skuArray, $scope.canDelete);
                    //check if sku can offshelve
                    if(skuArray.length === 0){
                        //show popover tip
                        $('#multiDeleteBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的商品中没有可以删除的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDeleteBtn').popover('destroy');
                        });
                        $('#multiDeleteBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(skuArray,function(sku, index){
                            names += "<li>"+sku.productName+"</li>";
                        });
                        $('#multiDeleteModal .content').html("您确认删除以下"+skuArray.length+"个商品吗？<ul>"+names+"</ul>");
                        $('#multiDeleteModal').modal('show');

                        $scope.skuIdArray4Delete = _.pluck(skuArray, 'id');
                    }

                }
            };

            //-- 批量删除确认（移动到回收站）
            $scope.multiDelete = function(){
                $('#multiDeleteModal').modal('hide');
                productService.moveToRecycleBin({ids: $scope.skuIdArray4Delete}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.productTableParams.reload();

                });
            };


            //-- 显示申请上架Modal
            $scope.showModal4ApplyOnShelve = function(sku){
                $scope.skuId4ApplyOnShelve = sku.id;
                //show modal
                $('#applyOnShelveModal .content').html("您确认申请上架商品'"+ sku.productName + "'吗？");
                $('#applyOnShelveModal').modal('show');
            };

            //-- 申请上架确认
            $scope.applyOnShelve = function(){
                $('#applyOnShelveModal').modal('hide');
                productService.applyOnShelve({id: $scope.skuId4ApplyOnShelve}).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
            };


            //-- 是否可以上架
            $scope.canShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 0 || (sku.status === 2 && sku.watchStatus !== 2));
            };
            //-- 是否可以下架
            $scope.canOffShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 1);
            };
            //-- 是否可以申请上架
            $scope.canApplyOnShelve = function(sku){
                return (sku.pushStatus === 3) && (sku.status === 2 &&  sku.watchStatus === 2);
            };
            //-- 是否可以删除
            $scope.canDelete = function(sku){
                return (sku.status === 0 ||  sku.status === 2);
            };
            //-- 是否可以预览
            $scope.canPreview = function(sku){
                return (sku.pushStatus === 3) ;
            };

            //-- 保存价格
            $scope.savePrice = function(skuId,data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (! (FLOAT_REGEXP.test(data) && (parseFloat(data)>0)) ){
                    return "请输入大于0的有效的正浮点数(最多两位小数)";
                }
                var postData = {
                    id: skuId,
                    price: data
                };
                productService.changePrice(postData).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
                //必须返回false不执行修改，等异步请求后将结果输出
                return false;

            };
            //-- 保存库存
            $scope.saveQuantityOnHand = function(skuId, data){
                if($.trim(data) === ""){
                    return "必填";
                }
                if (!INTEGER_REGEXP.test(data)) {
                    return "请输入有效的整数";
                }

                var postData = {
                    id: skuId,
                    quantityOnHand: data
                };
                productService.changeQuantityOnHand(postData).$promise.then(function (resp) {
                    if(resp.success){
                        $scope.productTableParams.reload();
                    }else{
                        $window.alert(resp.message);
                    }

                });
                //必须返回false不执行修改，等异步请求后将结果输出
                return false;

            };


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


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_product_list');

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.productTableParams = new TableParams({
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
                        //orderBy的字段有productName，price，quantityOnHand，status，watchStatus
                        postData.orderBy = str.substring(1,str.length);
                        postData.desc = (str.substring(0,1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    productService.query(postData).$promise.then(function (resp) {
                        $('#productSearchForm #searchBtn').button('reset');
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

/**
 * @name: 回收站列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.product.productRecycleBinCtrl', [])
    .controller('productRecycleBinCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$globalSetting',
        function ($scope, $filter, $timeout, $globalSetting) {
        }

    ]);

/**
 * @name: 搭配组合列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/30.
 */
angular.module('flymvo.promo.bundlingListCtrl', [])
    .controller('bundlingListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.bundlingStatuses;

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);


            //-- html模板
            $scope.templates = {
            };

            //用于记录当前列表
            $scope.currList = [];

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

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.searchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#searchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#searchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.tableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.tableParams.reload();
                $('#listPage').show();
                $('#detailPage').hide();
            };

            //-- 创建/编辑详细
            $scope.upsertDetail = function(item){
                if(item){
                    // 设置当前id
                    $scope.$currBundlingId = item.id;
                }
                $('#detailPage').empty().append('<div ng-controller="bundlingUpsertCtrl" ng-include="\'/html/promo/upsertBundling.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 是否可以上架
            $scope.canShelve = function(item){
                return (item.status === 0) || (item.status === 2);
            };
            //-- 是否可以下架
            $scope.canOffShelve = function(item){
                return (item.status === 1);
            };
            //-- 是否可以删除
            $scope.canRemove = function(item){
                return (item.status === 0) || (item.status === 2);
            };
            //-- 是否可以编辑
            $scope.canEdit = function(item){
                return (item.status === 1);
            };

            //-- 删除
            $scope.remove = function(item){
                if($window.confirm("您确认删除'"+item.name+"'吗？")){
                    promoService.deleteBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };

            //-- 上架
            $scope.shelve = function(item){
                if($window.confirm("您确认上架'"+item.name+"'吗？")){
                    promoService.shelveBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };

            //-- 下架
            $scope.offShelve = function(item){
                if($window.confirm("您确认下架'"+item.name+"'吗？")){
                    promoService.offshelveBundling({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };





            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_bundling_list');

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
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

                    promoService.queryBundling(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.currList = list;
                        $defer.resolve(list);
                        $scope.$loaded = true;
                    });

                }
            });

        }

    ]);

/**
 * @name: 搭配组合的捆绑商品查看控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/30.
 */
angular.module('flymvo.promo.bundlingSkusViewCtrl', [])
    .controller('bundlingSkusViewCtrl', [
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
        'productService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, promoService, productService, TableParams) {

            //-- =======================================变量===========================================

            //-- =======================================函数===========================================


        }
    ]);

/**
 * @name: 搭配组合创建/修改控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/30.
 */
angular.module('flymvo.promo.bundlingUpsertCtrl', [])
    .controller('bundlingUpsertCtrl', [
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
            $scope.MAX_LIST_ITEM = 5;
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //当前核心模型（创建时候/编辑未初始化的时候）
            $scope.model ={
                //包含的skus
                skus : []
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

            //-- 获得搭配组合
            $scope.retrieveBundling = function(){
                promoService.getBundling({id:$scope.$currBundlingId}).$promise.then(function (resp) {
                    $scope.model = resp.model;
                    $scope.$loaded = true;
                });
            };

            //移动搭配组合内的商品
            $scope.moveBundlingItem = function (oldIndex, newIndex) {
                $scope.model.skus.move(oldIndex, newIndex);
            };

            //是否可以提交
            $scope.canSubmit = function(){
                return $scope.model.skus.length >= 2;
            };

            //删除搭配组合内的商品
            $scope.deleteBundlingItem = function (index) {
                if ($window.confirm("你确认删除这个商品吗？")) {
                    $scope.model.skus.splice(index, 1);
                }
            };

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };


            //货品选择器确认
            $scope.selectMultiSkus = function(skus){
                if(skus.length === 0)return;
                var idList = _.pluck($scope.model.skus,'id');
                var mockArray = angular.copy($scope.model.skus);
                angular.forEach(skus, function(item, index){
                    if(idList.indexOf(item.id) == -1){
                        item.promoPrice = item.price;
                        mockArray.push(item);
                    }
                });
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了，请删除部分商品再点击确定。");
                    return false;
                }else{
                    $scope.model.skus = mockArray;
                    $scope.skuSelector.emptySkus();
                    return true;
                }

            };

            //货品选择器是否可用
            $scope.canOpenSkuSelector = function(){
                return $scope.model.skus.length < $scope.MAX_LIST_ITEM;
            };


            //-- event:提交Form
            $scope.submit = function () {

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#bundlingForm :input.ng-invalid');
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

                //2.检查商品数量下限（界面不发生，仅为安全检查）
                if ($scope.model.skus.length === 0) {
                    console.log('fail to validate sku length');
                    $('#skuSelectorBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择两个商品。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#skuSelectorBtn').popover('show');
                    $('#skuSelectorBtn').focus();
                    return;
                }

                //3.检查商品数量上限（界面不发生，仅为安全检查）
                if($scope.model.skus.length > $scope.MAX_LIST_ITEM ){
                    $window.alert("亲，无法提交。最多只能选择5个搭配商品哦，请删掉部分商品。");
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                //--start: 构造提交数据
                var postJson = {
                    name : $scope.model.name,
                    skus : []
                };
                angular.forEach($scope.model.skus, function(item, index){
                    postJson.skus.push({
                        id: item.id,
                        promoPrice: item.promoPrice
                    });

                    if(item.failTip){
                        delete item.failTip;
                    }
                });
                if($scope.model.id){
                    postJson.id = $scope.model.id;
                }

                //--end: 构造提交数据

                promoService.upsertBundling(angular.toJson(postJson)).$promise.then(function (resp) {
                    //mockErrorResponse(resp);

                    if (resp.success) {
                       $scope.backToList();
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
                var failModels = resp.models;
                angular.forEach(failModels, function(failModel, failId){
                    angular.forEach($scope.model.skus, function(sku, skuIndex){
                        if(sku.id === failModel.id){
                            sku.failTip = "此商品已参与名为 '"+failModel.name+"' 的搭配组合，无法再参加此搭配组合,请删除此商品。";
                        }
                    });
                });

            }


            //模拟业务请求失败
            function mockErrorResponse(resp){
                if ($globalSetting.isMockEnv){
                    var failModels = [];
                    //随机抽取1条失败的
                    var randomList = _.sample($scope.model.skus, 1);
                    angular.forEach(randomList,function(item){
                        failModels.push({
                            id :item.id,
                            name: "活动"+item.id
                        });
                    });
                    resp.success = false;
                    resp.models = failModels;
                }
            }

            //-- =======================================初始化===========================================

            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_bundling_list');


            if(angular.isDefined($stateParams.id) && $stateParams.id!==null){
                //【编辑】
                $scope.$currBundlingId = $stateParams.id;
            }

            if($scope.$currBundlingId){
                //【编辑】
                //获得搭配
                $scope.retrieveBundling();

            }
            //-- 初始化多个货品选择器
            $scope.skuSelector = skuSelector({
                maxNum : 5,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);


        }
    ]);

/**
 * @name: 推荐组合列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoListCtrl', [])
    .controller('groupPromoListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'promoService',
        '$stateParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, promoService, $stateParams) {

            //-- =======================================常量===========================================


            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loadedGroupPromos = false;
            //-- 初始化模型
            $scope.models = [];

            //-- 当前激活的促销组合index
            $scope.activeGroupPromoIndex = 0;

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

            //显示某组合促销
            $scope.showGroupPromo = function(index){
                $scope.activeGroupPromoIndex = index;
            };

            //移动组合促销
            $scope.moveGroupPromo = function(oldIndex, newIndex){
                $scope.models.move(oldIndex, newIndex);
                $scope.activeGroupPromoIndex = newIndex;

                var idsArray = _.pluck($scope.models, 'id');
                promoService.sortGroupPromos({ids : idsArray.join(",")}).$promise.then(function (resp) {
                    if(resp.success){
                        console.log("sort success");
                    }else{
                        console.log(resp.message);
                    }
                });
            };

            //删除推荐组合
            $scope.removePromoGroup = function(promoGroupId, index){
                if($window.confirm("亲，你确认删除此推荐组合吗？")){
                    promoService.deleteGroupPromo({id : promoGroupId}).$promise.then(function (resp) {
                        if(resp.success){
                            $scope.models.splice(index,1);
                            if($scope.models.length >= 1){
                                $scope.activeGroupPromoIndex = 0;
                            }else{
                                //需要重新load某一条sku的状态
                                $scope.backToListAfterSingleUpsert($scope.$currSkuId, 0);
                            }
                        }else{
                            $window.alert(resp.message);
                        }
                    });
                }
            };

            //-- =======================================初始化===========================================
            if(angular.isDefined($stateParams.skuId) && $stateParams.skuId!==null){
                //获取id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currSkuId = $stateParams.skuId;
            }
            promoService.listGroupPromoBySku({id : $scope.$currSkuId}).$promise.then(function (resp) {
                $scope.models = resp.models;
                if($scope.$focusGroupPromoId){
                    if($scope.$focusGroupPromoId === -1){
                        //激活最后一个tab
                        $scope.activeGroupPromoIndex = $scope.models.length -1;
                    }else{
                        //激活某个tab （模拟环境无法测试）
                        angular.forEach($scope.models, function(item, index){
                           if(item.id == $scope.$focusGroupPromoId){
                               $scope.activeGroupPromoIndex = index;
                           }
                        });
                    }
                }
                $scope.$loadedGroupPromos = true;
            });
        }

    ]);

/**
 * @name: 推荐组合sku列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoSkuListCtrl', [])
    .controller('groupPromoSkuListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'productService',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, productService, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.groupPromoStatuses;

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);


            //-- html模板
            $scope.templates = {
            };

            //-- 用于记录选择的条目的id
            $scope.selectedItems = [];
            //-- 用于记录全部的条目的id
            $scope.selectedItems4All = [];

            //用于记录当前列表
            $scope.currList = [];

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

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.searchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#searchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#searchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.tableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 返回显示列表
            $scope.backToList = function(skuId){
                $('#listPage').show();
                $('#detailPage').hide();
            };
            //-- 返回显示列表,有过多个增加操作
            $scope.backToListAfterMultiCreate = function(){
                $scope.tableParams.reload();
                $('#listPage').show();
                $('#detailPage').hide();
            };
            //-- 返回显示列表,有过单个增加/修改操作
            $scope.backToListAfterSingleUpsert = function(skuId, focusGroupPromoId){
                //如果skuId存在表示对某sku的推荐组合做了增加/修改操作
                if(skuId){
                    promoService.queryGroupPromoSkus({ids:skuId}).$promise.then(function (resp) {
                        //重新加载具体sku
                        var newSku = resp.models[0];
                        angular.forEach($scope.currList, function(item,index){
                            if(item.id == skuId){
                                //更新状态
                                item.productName = newSku.productName;
                                item.status = newSku.status;
                            }
                        });
                    });
                    //重新加载促销组合列表
                    $scope.showPromoList(skuId, focusGroupPromoId);
                }
                $('#listPage').show();
                $('#detailPage').hide();
            };


            //-- 是否可以增加促销组合
            $scope.canAdd = function(item){
                return true;
            };
            //-- 是否可以查看促销组合列表
            $scope.canViewList = function(item){
                return (item.status === 1);
            };

            //批量创建新促销组合
            $scope.multiCreate = function(){
                if($scope.selectedItems.length === 0){
                    //show popover tip
                    $('#multiCreateBtn').popover({
                        container : 'body',
                        placement : 'top',
                        content : '亲,您没有选择任何商品,！请选择列表左边的勾选框。',
                        trigger : 'focus'
                    }).on('hidden.bs.popover', function () {
                        $('#multiCreateBtn').popover('destroy');
                    });
                    $('#multiCreateBtn').popover('show');
                    return;
                }

                var skuIds= $scope.selectedItems.join(",");
                $scope.upsertPromoGroup(skuIds, null);
            };

            //创建新促销组合
            $scope.createNew = function(skuId){
                $scope.upsertPromoGroup(skuId, null);
            };
            //编辑促销组合
            $scope.editDetail = function(skuId, groupPromoId){
                $scope.upsertPromoGroup(skuId, groupPromoId);
            };

            //-- 创建/编辑详细
            $scope.upsertPromoGroup = function(skuIds, groupPromoId){
                var newScope = $scope.$new();
                if(skuIds)newScope.$currSkuIds = skuIds;
                if(groupPromoId)newScope.$currGroupPromoId = groupPromoId;
                $('#detailPage').empty().append('<div ng-controller="groupPromoUpsertCtrl" ng-include="\'/html/promo/upsertGroupPromo.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())(newScope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };

            //查看/隐藏促销组合列表
            $scope.togglePromoList = function(skuId){
                if(!$scope.isPromoListShow(skuId)){
                    $scope.showPromoList(skuId);
                }else{
                    $('#skuTd-'+skuId).next('tr.list').remove();
                    $scope['isShowPromoList-'+skuId] = false;
                }
            };

            /**
             * 显示组合促销列表
             * skuId :skuId
             * focusGroupPromoId: 促销组合加载后focus在哪个id,特别地如果focusGroupPromoId==-1表示focus在最后一个item
             */
            $scope.showPromoList = function(skuId, focusGroupPromoId){
                $('#skuTd-'+skuId).next('tr.list').remove();
                var jDom = $('<tr class="list"><td class="full" colspan="7"><div ng-controller="groupPromoListCtrl" ng-include="\'/html/promo/groupPromoList.html?tag=' + $globalSetting.version+'\'"></div></td></tr>');
                jDom.insertAfter($('#skuTd-'+skuId));
                $scope['isShowPromoList-'+skuId] = true;

                var newScope = $scope.$new();
                newScope.$currSkuId = skuId;
                newScope.$focusGroupPromoId = focusGroupPromoId;
                $compile(jDom.contents())(newScope);
            };

            $scope.isPromoListShow = function(skuId){
                return $scope['isShowPromoList-'+skuId];
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_group_promo_sku_list');

            //-- 获得供应商可用目录
            productService.listSupplierCategories().$promise.then(function (resp) {
                $scope.supplierCategories = resp.models;
            });

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
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
                    //因为table区域重新加载，所以选择的商品需要重置
                    $scope.selectedItems = [];
                    $scope.selectedItems4All = [];

                    promoService.queryGroupPromoSkus(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.currList = list;
                        $defer.resolve($scope.currList);

                        $scope.$loaded = true;
                    });
                }
            });
        }
    ]);

/**
 * @name: 推荐组合创建/修改控制器
 * @description:
 * @author: Patrick
 * @create : 2014/12/09.
 */
angular.module('flymvo.promo.groupPromoUpsertCtrl', [])
    .controller('groupPromoUpsertCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$state',
        '$stateParams',
        '$globalSetting',
        'hourOptions',
        'promoConstants',
        'productService',
        'promoService',
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, productService, promoService, skuSelector) {

            //-- =======================================常量===========================================
            $scope.MAX_LIST_ITEM = 3;
            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;
            //-- 是否显示主商品
            $scope.showSourceList = false;

            //当前核心模型（创建时候/编辑未初始化的时候）
            $scope.model ={
                //主sku列表
                sourceList : [],
                //推荐的sku列表
                list : []
            };


            //-- =======================================函数===========================================
            //显示/隐藏主商品信息
            $scope.toggleSourceList = function(){
                $scope.showSourceList = !$scope.showSourceList;
            };
            // 是否显示主商品信息
            $scope.isShowSourceList = function(){
                return $scope.showSourceList;
            };

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

            //-- 获得组合促销
            $scope.retrieveGroupPromo = function(){
                promoService.getGroupPromo({id:$scope.$currGroupPromoId}).$promise.then(function (resp) {
                    $scope.model = resp.model;
                    $scope.model.sourceList = [];
                    $scope.model.sourceList.push($scope.model.mainSku);
                    $scope.showSourceList = true;
                    $scope.$loaded = true;
                });
            };

            //移动推荐组合内的商品
            $scope.moveGroupItem = function (oldIndex, newIndex) {
                $scope.model.list.move(oldIndex, newIndex);
            };

            //是否加载完成
            $scope.isLoadSuccess = function(){
                return $scope.model.sourceList.length > 0;
            };

            //删除推荐组合内的商品
            $scope.deleteGroupItem = function (index) {
                if ($window.confirm("你确认删除这个商品吗？")) {
                    $scope.model.list.splice(index, 1);
                }
            };

            //打开货品选择器
            $scope.openSkuSelector = function(){
                $scope.skuSelector.open();
            };

            //打开安装服务选择器
            $scope.openInstallServiceSelector = function(){
                $scope.installServiceSelector.open();
            };

            //货品选择器确认
            $scope.selectMultiSkus = function(skus){
                if(skus.length === 0)return;
                var idList = _.pluck($scope.model.list,'id');
                var mockArray = angular.copy($scope.model.list);
                angular.forEach(skus, function(item, index){
                    if(idList.indexOf(item.id) == -1){
                        item.promoPrice = item.price;
                        item.type = 1;
                        mockArray.push(item);
                    }
                });
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配推荐商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了，请删除部分商品再点击确定。");
                    return false;
                }else{
                    $scope.model.list = mockArray;
                    $scope.skuSelector.emptySkus();
                    return true;
                }

            };

            //货品选择器是否可用
            $scope.canOpenSkuSelector = function(){
                return $scope.model.list.length < $scope.MAX_LIST_ITEM;
            };

            //安装服务选择器确认
            $scope.selectInstallService = function(sku){
                if(!sku)return;
                var idList = _.pluck($scope.model.list,'id');

                var mockArray = angular.copy($scope.model.list);
                if(idList.indexOf(sku.id) == -1){
                    sku.type = 2;
                    mockArray.push(sku);
                }
                if( mockArray.length > $scope.MAX_LIST_ITEM){
                    $window.alert("亲，搭配推荐商品个数已超过"+$scope.MAX_LIST_ITEM+"个,不能再添加了。");
                    return true;
                }else{
                    $scope.model.list = mockArray;
                    return true;
                }

            };


            //安装服务选择器是否可用
            $scope.canOpenInstallServiceSelector = function(){
                var flag = $scope.model.list.length <= $scope.MAX_LIST_ITEM;
                if(flag){
                    angular.forEach($scope.model.list, function(item, index){
                        if(item.type === 2){
                            flag = false;
                        }
                    });
                }
                return flag;
            };


            //-- event:提交Form
            $scope.submit = function () {

                function _destoryPopover() {
                    $(this).popover('destroy');
                }

                //0. 设置变量使得错误能够显示
                $scope.hasCommit = true;

                //1. 检查错误信息
                var fields = $('#groupPromoForm :input.ng-invalid');
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

                //2.检查商品数量下限
                if ($scope.model.list.length === 0) {
                    console.log('fail to validate sku length');
                    $('#skuSelectorBtn').popover({
                        container: 'body',
                        placement: 'bottom',
                        content: '亲,请至少选择一个商品或者安装服务。',
                        trigger: 'focus'
                    }).on('hidden.bs.popover', _destoryPopover);
                    $('#skuSelectorBtn').popover('show');
                    $('#skuSelectorBtn').focus();
                    return;
                }

                //3.检查商品数量上限（不存在，仅为安全检查）
                if($scope.model.list.length > $scope.MAX_LIST_ITEM ){
                    $window.alert("亲，无法提交。最多只能选择3个搭配推荐商品哦，请删掉部分商品。");
                    return;
                }

                //提交service
                console.log('validate form, success');
                $('#submitBtn').button('loading');
                console.log($scope.model);

                //--start: 构造提交数据
                var postJson = {
                    mainSkus : [],
                    list:[]
                };
                angular.forEach($scope.model.sourceList, function(item, index){
                    postJson.mainSkus.push({
                        id: item.id,
                        promoPrice: item.promoPrice
                    });
                });
                angular.forEach($scope.model.list, function(item, index){
                    postJson.list.push({
                        id: item.id,
                        promoPrice: item.promoPrice,
                        type: item.type
                    });
                });
                if($scope.model.id){
                    postJson.id = $scope.model.id;
                }

                //--end: 构造提交数据

                promoService.upsertGroupPromo(angular.toJson(postJson)).$promise.then(function (resp) {
                    if (resp.success) {
                        if($scope.$currGroupPromoId){
                            //编辑成功
                            $scope.backToListAfterSingleUpsert($scope.$currSkuIds, $scope.$currGroupPromoId);
                        }else if($scope.$currSkuIds){
                            if(($scope.$currSkuIds+"").indexOf(",") === -1){
                                //添加单个成功
                                $scope.backToListAfterSingleUpsert($scope.$currSkuIds, -1);
                            }else{
                                //添加多个个成功
                                $scope.backToListAfterMultiCreate();
                            }

                        }
                    } else {
                        $window.alert(resp.message);
                    }

                    $('#submitBtn').button('reset');

                }, function (resp) {
                    if (resp.data.message) {
                        $window.alert(resp.data.message);
                        $('#submitBtn').button('reset');
                    }

                });
            };

            //-- =======================================初始化===========================================

            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_group_promo_sku_list');


            if(angular.isDefined($stateParams.id) && $stateParams.id!==null){
                //【编辑】
                $scope.$currGroupPromoId = $stateParams.id;
            }else  if(angular.isDefined($stateParams.skuIds) && $stateParams.skuIds!==null){
                //【创建】
                $scope.$currSkuIds = $stateParams.skuIds;
            }

            if($scope.$currGroupPromoId){
                //【编辑】
                //获得组合
                $scope.retrieveGroupPromo();

            }else if($scope.$currSkuIds){
                //【创建】
                //获得主商品
                productService.listFullProducts({ids : $scope.$currSkuIds}).$promise.then(function (resp) {
                    //批量修改被屏蔽，所以必定返回一个
                    //$scope.model.sourceList = resp.models;
                    $scope.model.sourceList.push(resp.models[0]);
                    angular.forEach($scope.model.sourceList, function(item, index){
                        item.promoPrice = item.price;
                    });
                    $scope.$loaded = true;
                });
            }
            //-- 初始化多个货品选择器
            $scope.skuSelector = skuSelector({
                maxNum : 3,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);

            //-- 初始化单个安装服务选择器
            $scope.installServiceSelector = skuSelector({
                multi: false,
                onSelect: 'selectInstallService',
                isInstallService : true
            }, $scope);


        }
    ]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.promo.controllers', [
  'flymvo.promo.promoPriceListCtrl',
  'flymvo.promo.promoPriceCreateCtrl',
  'flymvo.promo.salesRuleListCtrl',
  'flymvo.promo.salesRuleUpsertCtrl',
  'flymvo.promo.salesRuleViewCtrl',
  'flymvo.promo.bundlingListCtrl',
  'flymvo.promo.bundlingUpsertCtrl',
  'flymvo.promo.bundlingSkusViewCtrl',
  'flymvo.promo.groupPromoSkuListCtrl',
  'flymvo.promo.groupPromoUpsertCtrl',
  'flymvo.promo.groupPromoListCtrl'
]);

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

/**
 * @name: 促销价列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/18.
 */

angular.module('flymvo.promo.promoPriceListCtrl', [])
    .controller('promoPriceListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'promoConstants',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $globalSetting, promoConstants, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.promoPriceStatuses;
            //日期格式
            var dateFormat = "YYYY-MM-DD";

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);


            //-- html模板
            $scope.templates = {
                multiDisableModal : '/html/promo/include/multiDisableModal.html?tag='+$globalSetting.version
            };

            //-- 用于记录选择的条目的recordNo
            $scope.selectedItems = [];
            //-- 用于记录全部的条目的recordNo
            $scope.selectedItems4All = [];

            //用于记录当前促销价列表
            $scope.promoPriceList = [];
            //用于记录需要批量失效的recordNo
            $scope.recordNoArray4Disable = [];


            //-- =======================================函数===========================================

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.searchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#searchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#searchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.tableParams.reload();
                }

            };

            //-- 是否可以设置为失效
            $scope.canDisable = function(item){
                return (item.promotionalStatus === 1 ||  item.promotionalStatus === 4);
            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 将促销开始时间变为规定格式
            $scope.$watch("query.startTimeMin", function () {
                if($scope.query.startTimeMin){
                    $scope.query.startTimeMin = moment($scope.query.startTimeMin).format(dateFormat);
                }
            });

            //-- 将促销结束时间变为规定格式
            $scope.$watch("query.endTimeMax", function () {
                if($scope.query.endTimeMax){
                    $scope.query.endTimeMax = moment($scope.query.endTimeMax).format(dateFormat);
                }
            });


            //--根据recordNoArray获得itemArray
            function getPromoPriceArrayByRecordNo(recordNoArray){
                var list = [];
                angular.forEach($scope.promoPriceList, function(item, index){
                    if(recordNoArray.indexOf(item.recordNo) != -1){
                        list.push(item);
                    }
                });
                return list;
            }


            //-- 显示批量设置失效Modal
            $scope.showModal4MultiDisable = function(item){
                if(item){
                    $scope.recordNoArray4Disable = [];
                    $scope.recordNoArray4Disable.push(item.recordNo);
                    //show modal
                    $('#multiDisableModal .content').html("您确认设置失效'"+ item.productName + "'吗？");
                    $('#multiDisableModal').modal('show');

                }else{
                    //check if item selected
                    if($scope.selectedItems.length === 0){
                        //show popover tip
                        $('#multiDisableBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您没有选择任何条目,！请选择列表左边的勾选框。',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDisableBtn').popover('destroy');
                        });
                        $('#multiDisableBtn').popover('show');
                        return;
                    }
                    var promoPriceArray = getPromoPriceArrayByRecordNo($scope.selectedItems);
                    promoPriceArray = $filter('filter')(promoPriceArray, $scope.canDisable);
                    //check if item can disable
                    if(promoPriceArray.length === 0){
                        //show popover tip
                        $('#multiDisableBtn').popover({
                            container : 'body',
                            placement : 'top',
                            content : '亲,您选择的条目中没有可以设置失效的！',
                            trigger : 'focus'
                        }).on('hidden.bs.popover', function () {
                            $('#multiDisableBtn').popover('destroy');
                        });
                        $('#multiDisableBtn').popover('show');
                    }else{
                        //show modal
                        var names = "";
                        angular.forEach(promoPriceArray,function(item, index){
                            names += "<li>"+item.productName+"</li>";
                        });
                        $('#multiDisableModal .content').html("您确认设置失效以下"+promoPriceArray.length+"个条目吗？<ul>"+names+"</ul>");
                        $('#multiDisableModal').modal('show');

                        $scope.recordNoArray4Disable = _.pluck(promoPriceArray, 'recordNo');
                    }

                }
            };

            //-- 批量失效确认
            $scope.multiDisable = function(){
                $('#multiDisableModal').modal('hide');
                promoService.multiDisablePromoPrices({recordNos: $scope.recordNoArray4Disable}).$promise.then(function (resp) {
                    if(!resp.success){
                        $window.alert(resp.message);
                    }
                    $scope.tableParams.reload();

                });
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_price_list');

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);

                    if(postData.startTimeMin){
                        postData.startTimeMin += " 00:00:00";
                    }
                    if(postData.endTimeMax){
                        postData.endTimeMax += " 23:59:59";
                    }
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

                    promoService.queryPromoPrices(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.promoPriceList = list;
                        $defer.resolve(list);

                        $scope.$loaded = true;
                    });


                }
            });

        }

    ]);

/**
 * @name: 店铺优惠列表控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/18.
 */
angular.module('flymvo.promo.salesRuleListCtrl', [])
    .controller('salesRuleListCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$compile',
        '$globalSetting',
        'promoConstants',
        'promoService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $compile, $globalSetting, promoConstants, promoService, TableParams) {

            //-- =======================================常量===========================================

            //-- 初始化常量
            $scope._statuses = promoConstants.salesRuleStatuses;
            $scope._salesRuleRangeTypes = promoConstants.salesRuleRangeTypes;
            //日期格式
            var dateFormat = "YYYY-MM-DD";

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;

            //-- 初始化模型
            $scope.query = {
            };

            //-- 用于记录下用户点击查询按钮时候的查询条件
            $scope.querySaved = angular.copy($scope.query);
            //--  用于记录下初始的查询条件
            $scope.queryOrigin = angular.copy($scope.query);


            //-- html模板
            $scope.templates = {
            };

            //-- 用于记录选择的条目的id
            $scope.selectedItems = [];
            //-- 用于记录全部的条目的id
            $scope.selectedItems4All = [];

            //用于记录当前列表
            $scope.currList = [];

            //-- =======================================函数===========================================

            //--  查询函数
            $scope.search = function(){
                //validate form first
                if($scope.searchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#searchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $('#searchForm #searchBtn').button('loading');
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.tableParams.reload();
                }

            };

            //--  重置查询函数
            $scope.resetSearch = function(){
                //将错误移除
                $scope.searchForm.$setPristine(true);
                //还原查询条件
                $scope.query = angular.copy($scope.queryOrigin);
            };

            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.tableParams.reload();
                $('#listPage').show();
                $('#detailPage').hide();
            };

            //-- 编辑详细
            $scope.editDetail = function(item){
                // 设置当前id
                $scope.$currSalesRuleId = item.id;
                $('#detailPage').empty().append('<div ng-controller="salesRuleUpsertCtrl" ng-include="\'/html/promo/upsertSalesRule.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 查看详细
            $scope.viewDetail = function(item){
                // 设置当前id
                $scope.$currSalesRuleId = item.id;
                $('#detailPage').empty().append('<div ng-controller="salesRuleViewCtrl" ng-include="\'/html/promo/salesRuleDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#detailPage').contents())($scope);

                $('#listPage').hide();
                $('#detailPage').slideDown("slow");
            };


            //-- 将开始时间变为规定格式
            $scope.$watch("query.startTime", function () {
                if($scope.query.startTime){
                    $scope.query.startTime = moment($scope.query.startTime).format(dateFormat);
                }
            });

            //-- 将结束时间变为规定格式
            $scope.$watch("query.endTime", function () {
                if($scope.query.endTime){
                    $scope.query.endTime = moment($scope.query.endTime).format(dateFormat);
                }
            });


            //-- 是否可以撤销
            $scope.canCancel = function(item){
                return (item.status === 2);
            };
            //-- 是否可以删除
            $scope.canDelete = function(item){
                return (item.status === 1);
            };
            //-- 是否可以编辑
            $scope.canEdit = function(item){
                return (item.status === 1);
            };

            //-- 删除
            $scope.remove = function(item){
                if($window.confirm("您确认删除'"+item.title+"'吗？")){
                    promoService.deleteSalesRule({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };



            //-- 撤销
            $scope.cancel = function(item){
                if($window.confirm("您确认撤销'"+item.title+"'吗？")){
                    promoService.cancelSalesRule({id: item.id}).$promise.then(function (resp) {
                        if(!resp.success){
                            $window.alert(resp.message);
                        }
                        $scope.tableParams.reload();

                    });
                }
            };


            //-- 是否满赠
            $scope.isKindOfGift = function(model){
                return model.type === "gift";
            };

            //-- 是否不封顶满减
            $scope.isKindOfNoCapMinus = function(model){
                return model.type === "minus" && model.noCap === 1;
            };

            //-- 是否阶梯满减
            $scope.isKindOfStepMinus = function(model){
                return model.type === "minus" && model.noCap === 0;
            };



            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_sales_rule_list');

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);

                    if(postData.startTime){
                        postData.startTime += " 00:00:00";
                    }
                    if(postData.endTime){
                        postData.endTime += " 23:59:59";
                    }
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

                    promoService.querySalesRules(postData).$promise.then(function (resp) {
                        $('#searchForm #searchBtn').button('reset');
                        params.total(resp.query.totalRecord);
                        var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                        if($globalSetting.isMockEnv) {
                            list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        }
                        $scope.currList = list;
                        $defer.resolve(list);
                        $scope.$loaded = true;
                    });

                }
            });

        }

    ]);

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

/**
 * @name: 店铺优惠查看控制器
 * @description:
 * @author: Patrick
 * @create : 2014/11/20.
 */
angular.module('flymvo.promo.salesRuleViewCtrl', [])
    .controller('salesRuleViewCtrl', [
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
        'productService',
        'ngTableParams',
        function ($scope, $window, $filter, $timeout, $state, $stateParams, $globalSetting,hourOptions, promoConstants, promoService, productService, TableParams) {

            //-- =======================================变量===========================================

            $scope.model = {
                skus :[]
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
                    data.skus = [];
                    $scope.model = data;
                    var skuIds = "";
                    var giftIds = "";
                    if($scope.model.rangeType+"" === "2"){
                        skuIds = data.skuList.join(",");

                        //获取商品列表
                        productService.listFullProducts({ids : skuIds}).$promise.then(function (resp) {
                            $scope.model.skus = resp.models;

                            //构造分页对象
                            $scope.tableParams.reload();
                        });


                    }
                    if($scope.model.type === 'gift'){
                        giftIds = data.giftList.join(",");
                        //获取赠品列表
                        productService.listFullProducts({ids : giftIds}).$promise.then(function (resp) {
                            $scope.model.gifts = resp.models;
                        });
                    }
                });
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


            //-- =======================================初始化===========================================
            //-- 设置菜单
            $scope.$changeCurrMenuByCode('mvo_promo_sales_rule_list');


            if(angular.isDefined($stateParams.salesRuleId) && $stateParams.salesRuleId!==null){
                //获取id，如果直接从URL中过来，则从urlpath中获得
                $scope.$currSalesRuleId = $stateParams.salesRuleId;
            }
            //获取店铺优惠
            $scope.retrieveSalesRule();

            //-- ngTable对象构造
            $scope.tableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10],
                total: 0,
                $scope: $scope , // add this line, fix bug https://github.com/esvit/ng-table/issues/362
                getData: function ($defer, params) {
                    var list = $scope.model.skus;
                    params.total(list.length);
                    list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(list);
                }
            });



        }
    ]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: caibin
 */

angular.module('flymvo.refund.controllers', [
  'flymvo.refund.refundListCtrl',
  'flymvo.refund.refundDetailCtrl',
  'flymvo.refund.refundInfoCtrl',
  'flymvo.refund.refundAddressCtrl',
  'flymvo.refund.refundLogisticsCtrl',
  'flymvo.refund.refundAddressListCtrl' 
]);

angular.module('flymvo.refund.refundAddressCtrl',[])
  .controller('refundAddressCtrl',[
    '$scope',
    '$filter',
    '$state',
    '$globalSetting',
    'ngDialog',
    'ngPopover',
    function ($scope, $filter, $state, $globalSetting, ngDialog, ngPopover ) {
      "use strict";
      console.log("enter refund refundAddressCtrl");

      $scope.editAddressDialog = function() {
        ngDialog.open({
          template: '/html/refund/info/refundAddressList.html?tag=' + $globalSetting.version,
          scope   : $scope,
          className: 'ngdialog-theme-default  size-large' 
        });
      };  

      // ngPopover
      $scope.addAddressPopover = function (event) {
          ngPopover.open(
            event.toElement,  //element
            $scope,  //scope
            {  //options
              template: '/html/refund/info/refundAddressAdd.html?tag=' + $globalSetting.version,
              placement: 'top'
            }
          ); 
      };

      $scope.closePopover = function () {
        ngPopover.close();
      };
       
      

      } 
 ]); 

angular.module('flymvo.refund.refundAddressListCtrl',[])
  .controller('refundAddressListCtrl',[
    '$scope',
    '$filter',
    '$state',
    '$globalSetting',
    'ngDialog',
    'ngPopover',
    'refundService', 
    function ($scope, $filter, $state, $globalSetting, ngDialog, ngPopover , refundService) {
      "use strict";  
      
      //售后地址
      //-- 初始化常量
      $scope.addressArray = [];
      $scope.defaultId = 0;

      //-- 获取地址列表
      refundService.queryAddress(angular.toJson({
        pageIndex: 1,
        pageSize:  10
      })).$promise.then(function(resp) {
        console.log($scope.address);
        $scope.addressArray = resp.models;
        angular.forEach($scope.addressArray, function(address, index) {
          if(address.defaultFlag) {
            $scope.defaultId = index;
            return;
          }
        });
      });

      //-- 设为默认按钮 
      $scope.setDefault = function(index, tmsMftAddressId) {

        refundService.defaultAddress({id: tmsMftAddressId}).$promise.then(function(resp) {
          if(resp.success) {
            $scope.addressArray[$scope.defaultId].defaultFlag = false;
            $scope.defaultId = index;
            $scope.addressArray[$scope.defaultId].defaultFlag = true;
            alert("设置成功");  

          }else{
            alert("设置失败: " + resp.message);
          }
           $scope.$emit("setDefault");
        });
      };





       //-- 初始化模型
        $scope.address   = {};
        $scope.hasCommit = false;
        $scope.address.defaultFlag = false;
          //-- 获取级联下拉框
            $scope.stateArray = [];
            $scope.cityArray = [];
            $scope.areaArray = []; 
           
     
           var getRegions = function(regionArray, parentId, callback) {
              if(!parentId) return;
              refundService.getRegion({parentId: parentId}).$promise.then(function(resp) {
                regionArray.length = 0;
                for(var i=0, len=resp.models.length; i<len; i++) {
                  regionArray.push(resp.models[i]);
                }
                if(callback) callback();
              });
            };

          

            $scope.$watch('address.stateId', function(newVal, oldVal) {
              getRegions($scope.cityArray, newVal);
              $scope.address.cityId = '';
              $scope.address.areaId = '';
            });
            $scope.$watch('address.cityId', function(newVal, oldVal) {
              getRegions($scope.areaArray, newVal);
              $scope.address.areaId = '';
            });

            getRegions($scope.stateArray, 1, function() {
              //-- 构造省份数组
              $scope._provinceArray = [];
              for(var i=0, len=$scope.stateArray.length; i<len; i++) {
                $scope._provinceArray[$scope.stateArray[i].regionId] = $scope.stateArray[i].regionName;
              }
            });

            //提交表单函数
            $scope.submitForm = function() { 
              $scope.hasCommit = true; 
              if($scope.addressForm.$valid) {
                refundService.createAddress(angular.toJson($scope.address)).$promise.then(function(resp) {
                  if(resp.success) {
                    alert("添加地址成功");  
                    ngPopover.close();  
                  }else{
                    alert("操作失败：" + resp.message);
                  }
                });

              }
            };    
     }
    ]); 

angular.module('flymvo.refund.refundDetailCtrl', [])
    .controller('refundDetailCtrl', [
        '$scope',
        '$filter',
        '$state',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'ngDialog',
        function ($scope, $filter, $state, $stateParams, $globalSetting, refundConstants, refundService, ngDialog) {
            "use strict";
            //-- =======================================变量===========================================
            //售后信息模板
            $scope.template = {
                //物流信息
                refundLogistics: 'html/refund/info/logistics.html?tag=' + $globalSetting.version,
                //补发重发
                redeliver: 'html/refund/info/redeliver.html?tag=' + $globalSetting.version,
                //回收地址
                recycleAddress: 'html/refund/info/recycleAddress.html?tag=' + $globalSetting.version,
                //退货回收地址
                returnAddress: 'html/refund/info/refundReturnAddress.html?tag=' + $globalSetting.version,
                //是否需要回收商品Dialog
                isNeedReceive: 'html/template/isNeedReceive.html?tag=' + $globalSetting.version,
                //详细信息
                refundInfoTemplate: '/html/refund/info/refundInfo.html?tag=' + $globalSetting.version
            };

            //获取售后状态
            $scope.refund = {};

            //-- =======================================函数===========================================
            //获取详情
            $scope.loadRefundDetail = function () {
                refundService.get({
                    refundId: $scope.$returnNo
                }).$promise.then(function (resp) {
                        $scope.refund = resp.model;
                        console.log($scope.refund);
                        $scope.refundType = $filter('refundTypeRevers')($scope.refund.resolution);
                        $scope.refundStatus = $filter('refundStatusRevers')($scope.refund.resolution, $scope.refund.foregroundStatusDesc);

                        /*** 重要
                         * 类型与状态二维表（x,y轴均从1开始）
                         退货： 待受理 待退货 退货中 退款中 完成 取消
                         换货： 待受理 待退货 退货中 待重发 重发中 完成 取消
                         退款： 待受理 退款中 完成 取消
                         补发： 待受理 待补发 配送中 完成 取消
                         例如：
                         refundType = 2 表示换货
                         refundStatus = 4 表示待重发
                         可以直接写类型与状态进行测试
                         //测试设定，待删除 TODO
                         $scope.refundType =2;
                         $scope.refundStatus =4;
                         */
                        console.log($scope.refundType);
                        console.log($scope.refundStatus);
                        // if($scope.refundStatus == null)
                        //   return;

                        $scope.refundConstants = angular.copy(_.findWhere(refundConstants.refundType, {
                            value: "" + $scope.refundType
                        }));

                        //合并进度条设定
                        _.extend($scope.refundConstants.progress, _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).progress);

                        //合并计时器
                        _.extend($scope.refundConstants.timer, _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).timer);

                        //处理信息模板
                        var tmp = _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).template;
                        if (!_.isUndefined(tmp)) {
                            $scope.refundConstants.template = tmp;
                        }


                        //运单号类型
                        tmp = _.findWhere($scope.refundConstants.refundStatus, {
                            value: "" + $scope.refundStatus
                        }).trackingType;
                        if (!_.isUndefined(tmp)) {
                            $scope.refundConstants.trackingType = tmp;
                        }

                        //进度条设定
                        $scope.progressBar = {};
                        $scope.progressBar = $scope.refundConstants.progress;
                        _.each($scope.refund.refundProgress, function (item, index) {
                            $scope.progressBar.content[index].time = item;
                        });

                        //计时器设定
                        $scope.timeCounter = $scope.refundConstants.timer;
                        $scope.timeCounter.start = $scope.refund.createTime;

                        //处理信息模板
                        $scope.handleTemplate = $scope.refundConstants.template;
                        console.log($scope.progressBar);

                    });


                refundService.queryAddress(angular.toJson({
                    pageIndex: 1,
                    pageSize: 10
                })).$promise.then(function (resp) {
                        $scope.recycleAddress = resp.models;
                        for (var i = 0; i < resp.models.length; i++) {
                            if (resp.models[i].defaultFlag === true) {
                                $scope.recycleDefaultAddress = resp.models[i];
                                break;
                            }
                        }
                    });
            };

            //同意
            $scope.agree = function () {
                console.log($scope.refund.returnNo);
                console.log($scope.refund.resolution);
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 1
                }).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("操作成功");
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };

            //回收
            $scope.recycle = function () {
                console.log($scope.refund.returnNo);
                refundService.recycle({
                    "returnNo": $scope.refund.returnNo
                }).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("操作成功");
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };


            //打开dialog
            $scope.openIsNeedReceiveDialog = function () {
                $scope.currentReturnNo = $scope.refund.returnNo;
 
                ngDialog.open({
                    template: $scope.template.isNeedReceive, 
                    scope: $scope,
                    placement: "top"
                });
            };
            //重新发货

            //获取物流公司
            refundService.getLogisticsCompany().$promise.then(function (resp) {
                if (resp.success === true) {
                    $scope.logisticsCompany = resp.models;
                }
            });

            //重新发货
            $scope.deliver = function(deliverInfo) {  
              var returnNo = $scope.refund.returnNo;
              var trackingNo = deliverInfo.trackingNo;
              var carrier = deliverInfo.logisticsCompany.code; 
              var carrierName = deliverInfo.logisticsCompany.name; 
              refundService.deliver(angular.toJson({
                "orderReturnNo": returnNo,
                "trackingNo": trackingNo,
                "carrier": carrier,
                "carrierName": carrierName 
              })).$promise.then(function(resp) {
                if (resp.success === true) {
                  alert("发货成功！");
                  //重刷页面
                  $scope.loadRefundDetail();
                } else {
                  alert("发货失败！");
                }
              });
            };

            //打开需要回收商品
            $scope.openIsNeedReceiveDialog = function (returnNo) {
                $scope.currentReturnNo = returnNo; 
                ngDialog.open({
                    template: $scope.template.isNeedReceive, 
                    scope: $scope,
                    placement: "top"
                });
            };

            //回收商品
            $scope.isNeedReceive = function (isNeedReceive) {
                $scope.agreeNeedReceive($scope.currentReturnNo, isNeedReceive);
            };

            //退货中的同意，不需要回收商品
            $scope.agreeApply = function () {
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 0
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            $scope.showDetail();
                            //重新刷新表单
                        } else {
                            alert("操作失败");
                        }
                    });
            };

            //需要回收商品
            $scope.agreeNeedReceive = function (returnNo, isNeedReceive) {
                console.log(isNeedReceive);
                console.log(returnNo);
                refundService.agree({
                    "returnNo": returnNo,
                    "isNeedReceive": isNeedReceive
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                             $scope.showDetail();
                            if (isNeedReceive === 1) {
                                //重刷页面
                                $scope.showDetail();
                            }
                        } else {
                            alert("操作失败");
                        }
                        ngDialog.close();
                    });
            };


            //退货里的同意，不需要回收商品
            $scope.agreeDontNeedReceive = function () {
                refundService.agree({
                    "returnNo": $scope.refund.returnNo,
                    "isNeedReceive": 0
                }).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            //重新刷新表单
                            $scope.showDetail();
                        } else {
                            alert("操作失败");
                        }
                    });
            };
            //监听物流地址的变化
            $scope.$on("setDefault",function(){
                $scope.showDetail();            
            });

            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };


            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_refund_list');

            if(angular.isDefined($stateParams.productId) && $stateParams.productId!==null){
                //获取售后单号，如果直接从URL中过来，则从urlpath中获得
                $scope.$returnNo = $stateParams.returnNo;
            }

            $scope.loadRefundDetail();

        }
    ]);
/**
 * name:refundInfoCtrl
 * author:caibin
 * date:2014/10/20
 */
angular.module("flymvo.refund.refundInfoCtrl",[])
    .controller("refundInfoCtrl",[
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'orderService',
        'ngTableParams',
        '$rootScope',
        '$state',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, orderService, TableParams, $rootScope, $state){

            //-- =======================================变量===========================================
           /* //模拟数据，真实数据来自上层controller 的$scope
            $scope.item = {
                resolution:"1",
                refundMoney:"200",
                reasonType:"1",
                returnNo:"10000",
                submitTime:1413775330119,
                reason:"漏液",
                picture:[
                    {id:1,src:"/img/weixinfuwu.jpg"},
                    {id:2,src:"/img/weixinfuwu.jpg"},
                    {id:3,src:"/img/weixinfuwu.jpg"}
                ],
                product:{
                    image:"/img/weixindingyue.jpg",
                    title:"舒肤佳活力运动劲能活力沐浴露",
                    productId:"12321"
                },
                salesOrderNo:"111111"
            };
           */

            $scope.item = {};
            $scope.logisticsCompany = null;

            //-- =======================================函数===========================================

            //获取售后信息
            $scope.$watch('refund', function(newVal, oldVal) {
              $scope.item = $scope.refund;
            });
            //refundService.get().$promise.then(function(resp) {
                //$scope.item = resp.model;
            //});

            //获取物流公司
            refundService.getLogisticsCompany().$promise.then(function(resp){
                if(resp.success === true){
                    $scope.logisticsCompany = resp.models; 
                }
            }); 
 
            //重新发货
            $scope.deliver = function(salesOrderNo,deliverInfo){
                var trackingNo = deliverInfo.trackingNo;
                var logisticsCompany = deliverInfo.logisticsCompany.code;
                var logisticsCompanyName = deliverInfo.logisticsCompany.name;
                refundService.deliver(angular.toJson({"orderNo":salesOrderNo,"trackingNo":trackingNo,"logisticsCompany":logisticsCompany,"logisticsCompanyName":logisticsCompanyName})).$promise.then(function (resp) {
                    if(resp.result === true){
                        alert("发货成功！");
                    }else{
                        alert("发货失败！");
                    }
                });
            };

        }
    ]);

/**
 *  name：refundListCtrl
 *  author: caibin
 *  date: 2014/10/18
 */
angular.module('flymvo.refund.refundListCtrl', [])
    .controller('refundListCtrl', [
        '$compile',
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'ngTableParams',
        '$rootScope',
        '$state',
        '$window',
        'ngPopover',
        'ngDialog',
        function ($compile, $scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, TableParams, $rootScope, $state, $window, ngPopover, ngDialog) {
            "use strict";

            //-- =======================================变量===========================================
            //-- 是否已加载完成
            $scope.$loaded = false;
            //表格模板
            $scope.templates = {
                //退货表格
                refundReturnTable: '/html/refund/include/refundReturnTable.html?tag=' + $globalSetting.version,
                //换货表格
                refundExchangeTable: '/html/refund/include/refundExchangeTable.html?tag=' + $globalSetting.version,
                //退款表格
                refundChargeBackTable: '/html/refund/include/refundChargeBackTable.html?tag=' + $globalSetting.version,
                //补发表格
                refundRedeliverTable: '/html/refund/include/refundRedeliverTable.html?tag=' + $globalSetting.version,

                //重发货
                redeliver: '/html/refund/info/redeliver.html?tag=' + $globalSetting.version,
                //是否需要回收商品
                "isNeedReceive": 'html/template/isNeedReceive.html?tag=' + $globalSetting.version,
                //售后单详情
                "detail" : 'html/refund/refundDetail.html?tag=' + $globalSetting.version,
                //重发货/补发 模态框
                reDeliverModal : '/html/refund/include/redeliverModal.html?tag=' + $globalSetting.version
            };

            //初始化查询条件
            $scope.query = {};

            //当前选择的标签页 - 退货
            $scope.currentTab = 1;
            $scope.listTemplate = $scope.templates.refundReturnTable;

            //下拉状态
            $scope.foregroundStatusDesc = null;

            //保存查询条件
            $scope.querySaved = angular.copy($scope.query);

            $scope._refundConstants = refundConstants;


            //-- =======================================函数===========================================
            //退货
            $scope.returnGoods = function () {
                $scope.currentTab = 1;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundReturnTable;
                $scope.$loaded = false;
            };
            //换货
            $scope.exchangeGoods = function () {
                $scope.currentTab = 2;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundExchangeTable;
                $scope.$loaded = false;
            };
            //退款
            $scope.refund = function () {
                $scope.currentTab = 3;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundChargeBackTable;
                $scope.$loaded = false;
            };
            //补发
            $scope.supplyAgain = function () {
                $scope.currentTab = 4;
                $scope.foregroundStatusDesc = null;
                $scope.listTemplate = $scope.templates.refundRedeliverTable;
                $scope.$loaded = false;
            };

            //重新加载列表
            $scope.reloadList = function(){
                $scope.refundTableParams.reload();
            };

            //搜索
            $scope.search = function () {
                //validate form first
                if($scope.refundSearchForm.$invalid){
                    console.log('validate form, fail!!!');
                    $('#refundSearchForm :input.ng-invalid').first().focus();
                }else{
                    console.log('validate form, success');
                    $("#refundSearchForm #refundSearchBtn").button("loading");
                    $scope.querySaved = angular.copy($scope.query);
                    $scope.refundTableParams.reload();
                }
            };

            //重置
            $scope.resetForm = function () {
                $scope.query.orderReturnNo = "";
                $scope.query.orderNo = "";
                $scope.query.createTimeGEStr = null;
                $scope.query.createTimeLEStr = null;
                $scope.query.skuName = "";
                $scope.query.skuNumber = "";
                $scope.query.totalAmountS = null;
                $scope.query.totalAmountE = null;

            };

            //显示发货单内所有sku
            $scope.showOtherSkus = function(o){
                o.flag4ShowOtherSkus = true;
            };

            //隐藏发货单内除第一个以外的所有skus
            $scope.hideOtherSkus = function(o){
                o.flag4ShowOtherSkus = false;
            };


            //返回订单号字符串
            $scope.isShowOtherSkus = function(o, index){
                if(index === 0){
                    return true;
                }else{
                    return o.flag4ShowOtherSkus || false;
                }
            };

            //时间转换
            $scope.$watch("query.createTimeLEStr", function () {
                if ($scope.query.createTimeLEStr) {
                    $scope.query.createTimeLEStr = moment($scope.query.createTimeLEStr).format("YYYY-MM-DD");
                }
            });
            $scope.$watch("query.createTimeGEStr", function () {
                if ($scope.query.createTimeGEStr) {
                    $scope.query.createTimeGEStr = moment($scope.query.createTimeGEStr).format("YYYY-MM-DD");
                }
            });


            //-- 显示详细
            $scope.showDetail = function(returnNo){
                $('#refundListPage').hide();
                $('#refundDetailPage').slideDown("slow");
                // 设置当前售后单号
                if(returnNo){
                    $scope.$returnNo = returnNo;
                }else{
                    //表示更新detail
                }

                // 设置当前订单号（多个）
                $('#refundDetailPage').empty().append('<div ng-controller="refundDetailCtrl" ng-include="\'/html/refund/refundDetail.html?tag=' + $globalSetting.version+'\'"></div>');
                $compile($('#refundDetailPage').contents())($scope);

                $('#refundListPage').hide();
                $('#refundDetailPage').slideDown("slow");

            };


            //-- 返回显示列表
            $scope.backToList = function(){
                $scope.reloadList();
                $('#refundListPage').show();
                $('#refundDetailPage').hide();
            };

            //-- =======================================表格内函数===========================================
            //下拉框状态改变时，重新加载tab
            $scope.statusChange = function (selectedStatus) {
                if (selectedStatus) {
                    $scope.foregroundStatusDesc = selectedStatus.label;
                } else {
                    $scope.foregroundStatusDesc = "";
                }
                $scope.reloadList();
            };


            //打开发货模态框，保存当前salesOrderNo，resendAddressDTO
            $scope.openDeliverModal = function (resendAddressDTO, returnNo) {
                $scope.resendAddressDTO = resendAddressDTO;
                $scope.salesOrderNoForModal = returnNo;
                //获取物流公司列表
                refundService.getLogisticsCompany().$promise.then(function (resp) {
                    if (resp.success === true) {
                        $scope.logisticsCompany = resp.models;
                    }
                });
            };

            //重发货--补发
            $scope.redeliver = function (deliverInfo) { 
                var returnNo  = $scope.salesOrderNoForModal;
                var trackingNo = deliverInfo.trackingNo;
                var carrier = deliverInfo.logisticsCompany.code; 
                var carrierName = deliverInfo.logisticsCompany.name;
                refundService.deliver(
                    angular.toJson({
                        "orderReturnNo": returnNo,
                        "trackingNo": trackingNo,
                        "carrier": carrier,
                        "carrierName": carrierName
                    })
                ).$promise.then(function (resp) {
                        if (resp.success === true) {
                            alert("发货成功！");

                            $scope.reloadList();
                            $('#reDeliverModal').modal('hide');
                            $scope.deliverInfo = null;
                            //刷新页面
                        } else {
                            alert("发货失败,请检查参数");
                        }
                    });
            };

            //已回收
            $scope.recycle = function (returnNo) {
                if($window.confirm("您确认回收此单商品吗？")){
                    refundService.recycle({"returnNo": returnNo}).$promise.then(function (resp) {
                        if (resp.success) {
                            $window.alert("操作成功");
                            //重新刷新
                            $scope.reloadList();
                        }
                        else {
                            $window.alert("操作失败");
                        }
                    });
                }

            };

            // //已补发
            // $scope.reSupply = function (returnNo) {
            //     refundService.reSupply({"returnNo": returnNo}).$promise.then(function (resp) {
            //         if (resp.success) {
            //             alert("操作成功");
            //             //重新刷新
            //             $scope.reloadList();
            //         }
            //         else {
            //             alert("操作失败");
            //         }
            //     });
            // };

            //打开dialog
            $scope.openIsNeedReceiveDialog = function (returnNo) {
                $scope.currentReturnNo = returnNo;  
                ngDialog.open(
                    {
                        template: $scope.templates.isNeedReceive,
                        //controller: "refundListCtrl",
                        scope: $scope
                    });
            };

            //回收商品
            $scope.isNeedReceive = function (isNeedReceive) {
                $scope.agree($scope.currentReturnNo, isNeedReceive);
            };

            //退款里的 同意
            $scope.agree = function (returnNo, isNeedReceive) {
                if($window.confirm("您确认同意此单退款吗？")){
                    refundService.agree({"returnNo": returnNo, "isNeedReceive": isNeedReceive}).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");

                            $scope.reloadList();
                            if (isNeedReceive === 1) {
                                //需要回收商品，跳转到退货Tab
                                $scope.returnGoods();

                            } else if (isNeedReceive === 0) {
                                //不需要回收商品，刷新退款Tab
                                $scope.refund();
                            }
                            ngDialog.close();

                        }
                        else {
                            alert("操作失败");
                            ngDialog.close();
                        }
                    });
                }

            };

            //退货或补发里面的同意，不需要回收商品
            $scope.agreeDontNeedReceive = function (returnNo) {
                if($window.confirm("您确认同意此单的受理申请吗？")){
                    refundService.agree({"returnNo": returnNo, "isNeedReceive": 0}).$promise.then(function (resp) {
                        if (resp.success) {
                            alert("操作成功");
                            //重新刷新表单
                            $scope.reloadList();
                        }
                        else {
                            alert("操作失败");
                        }
                    });
                }
            };

            //提醒发货
            $scope.remindShipment = function (returnNo) {

                refundService.remindShipment({"returnNo": returnNo}).$promise.then(function (resp) {
                    if (resp.success) {
                        alert("操作成功");
                    }
                    else {
                        alert("操作失败");
                    }
                });
            };

            //退货原因 详情
            $scope.checkReturnReason = function (description, imgUrls, event) {
                $scope.returnReason = {};
                $scope.returnReason.description = description;
                $scope.returnReason.imgUrls = [];
                if (imgUrls && imgUrls.length > 0) {
                    for (var i = 0, len = imgUrls.length; i < len; i++) {
                        $scope.returnReason.imgUrls.push({url: imgUrls[i]});
                    }
                }
                ngPopover.open(
                    event.toElement,  //element
                    $scope,  //scope
                    {  //options
                        template: '/html/refund/include/resolutionPopover.html?tag=' + $globalSetting.version,
                        placement: 'bottom',
                        maxwidth: 440
                    }
                );
            };


            //---绑定运单号格式放大显示事件
            $scope.trackingNoOnFocus4List = function(event) {
                $(event.target).parent().find('.largerView').css('display','inline-block');
            };
            $scope.trackingNoOnBlur4List = function(event) {
                $(event.target).parent().find('.largerView').hide();
            };

            //-- =======================================初始化===========================================
            $scope.$changeCurrMenuByCode('mvo_refund_list');

            //ngTable对象构造
            $scope.refundTableParams = new TableParams({
                page: 1,
                count: 10
            }, {
                counts: [10, 20, 50],
                total: 0,
                $scope: $scope,
                getData: function ($defer, params) { 
                    //=========构造查询条件 start =========
                    var postData = angular.copy($scope.querySaved);     

                    if (postData.createTimeLEStr) {
                        postData.createTimeLEStr = moment(postData.createTimeLEStr).format("YYYY-MM-DD") + " 00:00:00";
                    }
                    if (postData.createTimeGEStr) {
                        postData.createTimeGEStr = moment(postData.createTimeGEStr).format("YYYY-MM-DD") + " 23:59:59";
                    }
                    //页码
                    postData.pageIndex = params.page();
                    //每页多少条
                    postData.pageSize = params.count();
                    //查询类型
                    postData.resolution = $filter('refundType')($scope.currentTab);
                    //下拉状态
                    postData.foregroundStatusDesc = $scope.foregroundStatusDesc;

                    if (params.sorting() && (params.orderBy().length > 0)) {
                        var str = params.orderBy()[0];
                        //排序field
                        postData.orderBy = str.substring(1, str.length);
                        postData.desc = (str.substring(0, 1) !== "+");
                    }
                    //=========构造查询条件 end =========
                    refundService.query(angular.toJson(postData)).$promise.then(function (resp) {
                        $('#refundSearchForm #searchBtn').button('reset');
                        if (resp.models) {
                            params.total(resp.query.totalRecord);
                            var list = (params.sorting() && (params.orderBy().length > 0)) ? $filter('orderBy')(resp.models, params.orderBy()) : resp.models;
                            if ($globalSetting.isMockEnv) {
                                list = list.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }
                            $("#refundSearchForm #refundSearchBtn").button("reset");
                            $defer.resolve(list);
                            $scope.$loaded = true;

                        }
                    });
                }
            });
        }
    ]); 

/**
 *  name：refundLogisticsCtrl
 *  author: Allen
 *  date: 2014/10/21
 */
angular.module('flymvo.refund.refundLogisticsCtrl', [])
    .controller('refundLogisticsCtrl', [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$globalSetting',
        'refundConstants',
        'refundService',
        'ngTableParams',
        '$rootScope',
        '$state',
        function ($scope, $filter, $timeout, $stateParams, $globalSetting, refundConstants, refundService, TableParams, $rootScope, $state) {
            "use strict";
            //-- =======================================函数===========================================
            $scope.logistics = {};
            //获取物流信息
            var trackingType = $scope.refundConstants.trackingType;

            var trackingNo = 0;
            if (trackingType == 1) {
                trackingNo = $scope.refund.receiveTrackingCode;
            } else if (trackingType == 2) {
                trackingNo = $scope.refund.resendTrackingCode;
            }

            if (!(trackingType && trackingNo)) return;

            refundService.getLogistics({trackingNo: trackingNo}).$promise.then(function (resp) {
                $scope.logistics = resp.model;
                console.log($scope.logistics);
            });

        }

    ]);

/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.test.controllers', [
  'flymvo.test.testSkuSelectorCtrl',
  'flymvo.test.testMsgBoxCtrl'
]);

/**
 * @name: 测试飞飞信鸽盒子
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.test.testMsgBoxCtrl', [])
    .controller('testMsgBoxCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'msgBox',
        function ($scope, $window, $filter, $timeout, $globalSetting, msgBox) {

            //飞飞信鸽
            $scope.msgBox = msgBox({
            }, $scope);

            $scope.open = function(){
                $scope.msgBox.open();
            };

            $scope.send =function(msg) {
                $scope.msgBox.send(msg);
            };

        }

    ]);

/**
 * @name: 测试货品选择器
 * @description:
 * @author: Patrick
 * @create : 2014/9/17.
 */

angular.module('flymvo.test.testSkuSelectorCtrl', [])
    .controller('testSkuSelectorCtrl', [
        '$scope',
        '$window',
        '$filter',
        '$timeout',
        '$globalSetting',
        'skuSelector',
        function ($scope, $window, $filter, $timeout, $globalSetting, skuSelector) {
            $scope.selectSingleSku = function(result){
                $window.alert("已选择"+result.productName);
            };

            $scope.selectMultiSkus = function(result){
                $window.alert("已选择个数"+result.length);
            };

            //多个货品
            $scope.skuSelector1 = skuSelector({
                maxNum : 50,
                multi: true,
                onSelect: 'selectMultiSkus',
                skuIds : '1,2,3'
            }, $scope);

            //多个货品
            $scope.skuSelector2 = skuSelector({
                maxNum : 25,
                multi: true,
                onSelect: 'selectMultiSkus'
            }, $scope);

            //单个货品
            $scope.skuSelector3 = skuSelector({
                onSelect: 'selectSingleSku'
            }, $scope);

            $scope.openSkuSelector1 = function(){
                $scope.skuSelector1.open();
            };
            $scope.openSkuSelector2 = function(){
                $scope.skuSelector2.open();
            };
            $scope.openSkuSelector3 = function(){
                $scope.skuSelector3.open();
            };

            $scope.removeSingleSkuByExternal = function(){
                var array = $scope.skuSelector1.getSkus();
                $scope.skuSelector1.removeSingleSkuByExternal(array[0]);
            };



        }

    ]);


angular.module('flymvo.validate.directives', [
]);

/**
 * @description: 验证是否符合面额
 * @author: allen.chan
 **/

angular.module('flymvo.validate.directives')
    .directive('validateAmount', [function () {
        return {
          require: "ngModel",
          link: function (scope, element, attr, ngModel) {
              if (ngModel) {
                 // var Regexp = /(^[1-9][0-9]{0,2}$)|(^1000$)/;
                 // var Regexp = /^(?:0\.\d{1,2}|[1-9]\d{0,2}(?:\.\d{1,2})?|1000)$/;
                  //var Regexp = ^(?:0\.(?:[1-9]{1,2}|0[1-9])|[1-9]\d{0,2}(?:\.[1-9]{1,2}|\.0[1-9])?|1000)$;
                  //var Regexp = /^(?!00)(?:[0-9]{1,3}|1000)$/;
                  //var Regexp1 = /^([1-9]\d*)*[0|5]$/; 
                  //var Regexp = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;
                  var Regexp = /^\d+(\.{0,1}\d+){0,1}$/;
              }
              var customValidator = function (value) {
                  var validity = ngModel.$isEmpty(value) ; 
                  validity =  Regexp.test(value) && (value%5 === 0)&& (value >0) && (value <= 1000.00); 
                  
                  ngModel.$setValidity("validateAmount", validity); 
                  return validity ? value : undefined;
              };
              ngModel.$formatters.push(customValidator);
              ngModel.$parsers.push(customValidator);
          }
      };
    }]);

/**
 * @description: 验证数组是否为空
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateArrayRequired', [function () {
        return {
            require: 'ngModel',
            scope: {
                validateArrayRequired: '='
            },
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch('validateArrayRequired', function(value) {
                    if (value.length) {
                        ctrl.$setViewValue(value);
                        ctrl.$setValidity('arrayRequired', true);
                    } else {
                        ctrl.$setValidity('arrayRequired', false);
                    }
                });

            }
        };
    }]);

/**
 * @description: 验证是否浮点数
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateFloat', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('float', true);
                        return viewValue;
                    }else{
                        if (FLOAT_REGEXP.test(viewValue) && !isNaN(parseFloat(viewValue))) {
                            ctrl.$setValidity('float', true);
                            return parseFloat(viewValue);
                        }else {
                            ctrl.$setValidity('float', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);

/**
 * @description: 验证是否整数
 * @author: Patrick.he
 **/
angular.module('flymvo.validate.directives')
    .directive('validateInteger', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    }else{
                        if (INTEGER_REGEXP.test(viewValue)) {
                            ctrl.$setValidity('integer', true);
                            return parseInt(viewValue);
                        } else {
                            ctrl.$setValidity('integer', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);
/**
 * @description: 验证两个field大小
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateLargeThan', [function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {

                var validate = function(viewValue) {
                    var comparisonModel = $attrs.validateLargeThan;
                    if(!viewValue || !comparisonModel || (comparisonModel==="")){
                        // It's valid because we have nothing to compare against
                        ctrl.$setValidity('largeThan', true);
                    }else{
                        // It's valid if model is large than the model we're comparing against
                        ctrl.$setValidity('largeThan', parseFloat(viewValue) > parseFloat(comparisonModel) );
                    }
                    return viewValue;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('validateLargeThan', function(comparisonModel){
                    // Whenever the comparison model changes we'll re-validate
                    return validate(ctrl.$viewValue);
                });

            }
        };

    }]);

/**
 * @description: 验证两个field大小
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateLowerThan', [function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {

                var validate = function(viewValue) {
                    var comparisonModel = $attrs.validateLowerThan;
                    if(!viewValue || !comparisonModel || (comparisonModel==="")){
                        // It's valid because we have nothing to compare against
                        ctrl.$setValidity('lowerThan', true);
                    }else{
                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('lowerThan', parseFloat(viewValue) < parseFloat(comparisonModel) );
                    }


                    return viewValue;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('validateLowerThan', function(comparisonModel){
                    // Whenever the comparison model changes we'll re-validate
                    return validate(ctrl.$viewValue);
                });

            }
        };

    }]);

/**
 * @description: 验证两个field大小
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validateLowerThanOrEqualTo', [function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {
                var validate = function(viewValue) {
                    var comparisonModel = $attrs.validateLowerThanOrEqualTo;
                    if(!viewValue || !comparisonModel || (comparisonModel==="")){
                        // It's valid because we have nothing to compare against
                        ctrl.$setValidity('lowerThanOrEqualTo', true);
                    }else{
                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('lowerThanOrEqualTo', parseFloat(viewValue) <= parseFloat(comparisonModel) );
                    }


                    return viewValue;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('validateLowerThanOrEqualTo', function(comparisonModel){
                    // Whenever the comparison model changes we'll re-validate
                    return validate(ctrl.$viewValue);
                });

            }
        };

    }]);

/**
 * @description: 验证电话
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validatePhone', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('phone', true);
                        return viewValue;
                    }
                    if (PHONE_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('phone', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('phone', false);
                        return undefined;
                    }
                });
            }
        };
    }]);

/**
 * @description: 验证是否浮点数
 * @author: Patrick.he
 **/

angular.module('flymvo.validate.directives')
    .directive('validatePositiveFloat', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('float', true);
                        return viewValue;
                    }else{
                        if (FLOAT_REGEXP.test(viewValue) && !isNaN(parseFloat(viewValue))) {
                            var floatVar = parseFloat(viewValue);
                            if(floatVar > 0){
                                ctrl.$setValidity('float', true);
                                return parseFloat(viewValue);
                            }else{
                                ctrl.$setValidity('float', false);
                                return viewValue;
                            }
                        } else {
                            ctrl.$setValidity('float', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);
/**
 * @description: 验证是否正整数
 * @author: Patrick.he
 **/
angular.module('flymvo.validate.directives')
    .directive('validatePositiveInteger', [function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if($.trim(viewValue) === ""){
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    }else{
                        if (INTEGER_REGEXP.test(viewValue)) {
                            var intVar = parseInt(viewValue);
                            if(intVar && intVar > 0){
                                ctrl.$setValidity('integer', true);
                                return intVar;
                            }else{
                                ctrl.$setValidity('integer', false);
                                return viewValue;
                            }
                        } else {
                            ctrl.$setValidity('integer', false);
                            return viewValue;
                        }
                    }

                });
            }
        };
    }]);
angular.module('flymvo.account.service', [])
    .factory('accountService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/account/', {},
                {
                    //修改密码
                    'updatePassword': {url: "/data/mftUser/changePw", method: 'POST', isArray: false},
                    //获取制造商信息
                    'getManufacturerInfo': {url: "/data/mft/info", method: 'GET', isArray: false},
                    //保存制造商信息（商城部分）
                    'saveStoreInfo': {url: "/data/mft/saveStoreInfo", method: 'POST', isArray: false},
                    //获取品牌信息
                    'getBrandInfo':{url:"/data/mftBrand/get",method:'GET',isArray:false},
                   //保存上传图片
                   'uploadImage':{url:'/data/mftBrand/uploadImage',method:'POST',isArray:false}
                });
            return service;
        }]);
/**
 * @name: 授权菜单
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.authMenu.service', [])
    .factory('authMenuService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/auth/lisModules', {},
                {
                    // 返回用户授权的菜单，目前只返回第一级
                    'lisAuthModules': {url :'/data/auth/lisModules' ,method: 'GET', isArray: false},
                    'logout': {url: '/data/upms/logout', method: "POST"},
                    'userInfo': {url:'/data/upms/getInfo', method: "POST"}
                }
            );
            return service;
        }]);

/**
 * @name: cookie统一服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.cookie.service', [])
    .factory('cookieService', ['$resource', '$globalSetting', '$cookies',
        function ($resource, $globalSetting, $cookies) {
            var service = {
                //--获得当前版本
                getVersion : function(){
                    return $cookies.version;
                },
                //--设置当前版本
                setVersion : function(version){
                    $cookies.version = version;
                }
            };
            return service;
        }]);

/**
 * @name: 文件、图片服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.file.service', [])
    .factory('fileService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {id: '@id'},
                {
                    // 上传图片
                    'uploadImage': {url :'/data/upload/image' ,method: 'POST', isArray: false}
                }
            );
            return service;
        }]);

/**
 * @name: 文件、图片服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.login.service', [])
    .factory('loginService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service = $resource('/data/upms/login', null, {
            'getVerification' : {url: '/data/upms/kaptcha'}
          });
          return service;
        }]);

/**
 * @name: 信息服务
 * @author: Patrick
 * @creat on: 2014/11/18.
 */
angular.module('flymvo.message.service', [])
    .factory('messageService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {},
                {
                    //获得分类及未读条数
                    'listCategories': {url :'/data/message/listCategories' ,method: 'GET', isArray: false},
                    //根据分类分页获得信息
                    'search': {url :'/data/message/search' ,method: 'POST', isArray: false}

                }
            );
            return service;
        }]);

/**
 * @component: service
 * @name: flymvo.coupon.service
 * @description: coupon模块相关服务
 * @author: allen.chan
 * @creat on: 2014/11/17.

 */
angular.module('flymvo.coupon.service', [])
    .factory('couponService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var headers = {};
            // if(!$globalSetting.isMockEnv){
            //     headers = {'Content-Type': 'application/json;charset=UTF-8'};
            // }
          var service = $resource('/data/', null,
              { 
                'query': {url: '/data/mft/mftCoupon/searchCoupon', method: "POST", isArray: false },
                'queryDetail':{url: '/data/mft/mftCoupon/couponDetail', method: "POST" ,isArray :false},
                'saveOrUpdate' : {url: '/data/mft/mftCoupon/saveOrUpdateCoupon', method: 'POST', isArray: false},
                //'update' : {url: '/data/tms/mftAddress/update', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'remove': {url: '/data/mft/mftCoupon/deleteCoupon' ,method: 'POST' ,isArray:false} ,
                'updateStatus': {url: '/data/mft/mftCoupon/updateCouponStatus',method: 'POST',  isArray: false}
              }
          );
          return service;
        }]);

/**
 * @name: 结算列表服务
 * @author: Allen
 * @creat on: 2014/9/29.
 */
 angular.module('flymvo.finance.service', [])
    .factory('financeService',['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service;
            if($globalSetting.isMockEnv){
              service = $resource("/finance/",{id:'@id'},
                {
                  'listFinance':{url:'/data/finance/getAll',method:'GET',isArray:false},
                  'commissionList': { url: '/data/finance/settlementReport', method:'GET' ,isArray:false}
                });
            }else{
              service = $resource('/data/finance/mftCashierReport',{id: '@id'},
               {
                   //获得结算数据
                   'listFinance': { url: '/data/finance/mftCashierReport',method:'GET', isArray: false} ,
                   'commissionList': { url: '/data/finance/settlementReport', method:'GET' ,isArray:false}
                   //下载明细 
                   //'downLoadDetail':{ url: '/data/finance/downLoadDetail',method:'POST'}
               });
            }
            
            return service;
      }]);
 
/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.finance.controllers', [
  'flymvo.finance.financeListCtrl'
]);

/**
 * @component: service
 * @name: flymvo.logistics.service
 * @description: logistics模块相关服务
 * @author: max.huang
 * @creat on: 2014/9/24.

 */
angular.module('flymvo.address.service', [])
    .factory('addressService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service = $resource('/data/', {id: '@id'},
              {
                'query'  : {url: '/data/tms/mftAddress/get', method: "POST", isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'create' : {url: '/data/tms/mftAddress/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'update' : {url: '/data/tms/mftAddress/update', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                'setDefault': {url: '/data/tms/mftAddress/setDefaultAddress/:id'},
                'get'    : {url: '/data/tms/mftAddress/getById/:addressId', isArray: false}
              }
          );
          return service;
        }]);

/**
 * @component: service
 * @name: flymvo.logistics.service
 * @description: logistics模块相关服务
 * @author: max.huang
 * @creat on: 2014/9/24.
 */
angular.module('flymvo.logistics.service', [])
    .factory('logisticsService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
          var service;
          if($globalSetting.isMockEnv) {
            service = $resource('/data/', {id: '@id'},
                {
                  'query'    : {url: '/mock/tms/transFeeTemp/getAll.json', isArray: false},
                  'getRegion': {url:'/mock/tms/region/get.json', method: 'GET', isArray: false},
                  'get'    : {url: '/mock/tms/transFeeTemp/get.json', isArray: false},
                  'deleteLogistics': {url: '/data/tms/transFeeTemp/delete/:transFeeTempId', method: 'GET', isArray: false},
                  'createLogistics':      {url: '/data/tms/transFeeTemp/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                  'deleteDetail'   : {url: '/data/tms/transFeeTemp/deleteDetail/:transFeeTempId/:areaGroup', parmas: {transFeeTempId: '@transFeeTempId', areaGroup: '@areaGroup'}, method: 'GET', isArray: false},

                  // 返回用户定义的所有运费模板
                  'listSupplierLogisticsTemplates': {url :'/data/tms/transFeeTemp/getAll' ,method: 'GET', isArray: false}
                }
            );
            return service;
          }else{
            service = $resource('/data/', {id: '@id'},
                {
                  'query'          : {url: '/data/tms/transFeeTemp/getAll', isArray: false},
                  'getRegion'      : {url :'/data/tms/region/get/:parentId' , parmas: {parentId: '@parentId'}, isArray: false},
                  'get'            : {url: '/data/tms/transFeeTemp/getById/:transFeeTempId', parmas: {transFeeTempId: '@transFeeTempId'}, isArray: false},
                  'deleteLogistics': {url: '/data/tms/transFeeTemp/delete/:transFeeTempId', method: 'GET', isArray: false},
                  'createLogistics': {url: '/data/tms/transFeeTemp/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                  'deleteDetail'   : {url: '/data/tms/transFeeTemp/deleteDetail/:transFeeTempId/:areaGroup', parmas: {transFeeTempId: '@transFeeTempId', areaGroup: '@areaGroup'}, method: 'GET', isArray: false},
                  // 返回用户定义的所有运费模板
                  'listSupplierLogisticsTemplates': {url :'/data/tms/transFeeTemp/getAll' ,method: 'GET', isArray: false}
                }
            );
            return service;
          }

        }]);

/**
 * @name: 类目功能服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.category.service', [])
    .factory('categoryService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data', {id: '@id'},
                {
                    // 获得类目所有属性
                    'listAttrs': {url :'/data/category/attrs/:categoryId/$' ,method: 'GET', isArray: false},
                    // 获得类目所有规格
                    'listSpecs': {url :'/data/category/specs/:categoryId/$' ,method: 'GET', isArray: false}
                }
            );
            return service;
        }]);

/**
 * @name: 商品咨询模块服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.consult.service', [])
    .factory('consultService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/consults/search', {},
                {
                    // 搜索咨询
                    'query': {method: 'POST', isArray: false},
                    // 回复咨询
                    'reply': {url :'/data/consult/reply' ,method: 'POST', isArray: false}

                }
            );
            return service;
        }]);

/**
 * @name: 商品模块服务
 * @author: Patrick
 * @creat on: 2014/6/29.
 */
angular.module('flymvo.product.service', [])
    .factory('productService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/products/search', {},
                {
                    // 搜索商品
                    'query': {method: 'POST', isArray: false},
                    // 根据ids获得商品列表（简要）
                    'listProducts': {url :'/data/products/list' ,method: 'POST', isArray: false},
                    // 根据ids获得商品列表（复杂）
                    'listFullProducts': {url :'/data/products/listFull' ,method: 'POST', isArray: false},
                    // 获得供应商可用目录
                    'listSupplierCategories': {url :'/data/category/supplierCategories' ,method: 'GET', isArray: false},
                    // 获得供应商可用品牌
                    'listSupplierBrands': {url :'/data/brand/supplierBrands' ,method: 'GET', isArray: false},
                    // 获得类目信息
                    'getCategory': {url :'/data/category/:id/$' ,method: 'GET', isArray: false},
                    // 获得品牌信息
                    'getBrand': {url :'/data/brand/:id/$' ,method: 'GET', isArray: false},
                    // 创建商品
                    'createProduct': {url :'/data/product/create' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 上架商品
                    'shelve': {url :'/data/product/shelve' ,method: 'POST', isArray: false},
                    // 下架商品
                    'offShelve': {url :'/data/product/offShelve' ,method: 'POST', isArray: false},
                    // 删除商品（移动到回收站）
                    'moveToRecycleBin': {url :'/data/product/moveToRecycleBin' ,method: 'POST', isArray: false},
                    // 申请上架商品
                    'applyOnShelve': {url :'/data/product/applyOnShelve' ,method: 'POST', isArray: false},
                    // 修改sku价格
                    'changePrice': {url :'/data/product/changePrice' ,method: 'POST', isArray: false},
                    // 修改sku库存
                    'changeQuantityOnHand': {url :'/data/product/changeQuantityOnHand' ,method: 'POST', isArray: false},
                    // 获得商品常量
                    'listProdEnumByType': {url :'/data/product/enum' ,method: 'GET', isArray: false},

                    // 获得商品基本信息和属性信息
                    'getProductBasic': {url :'/data/product/:id/getBasic' ,method: 'GET', isArray: false},
                    // 保存商品基本信息和属性信息
                    'saveProductBasic': {url :'/data/product/saveBasic' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品包装信息和售后信息
                    'getPackAndAfterSale': {url :'/data/product/:id/getPackAndAfterSale' ,method: 'GET', isArray: false},
                    // 保存商品包装信息和售后信息
                    'savePackAndAfterSale': {url :'/data/product/savePackAndAfterSale' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品详情信息
                    'getProductDesc': {url :'/data/product/:id/getDesc' ,method: 'GET', isArray: false},
                    // 保存商品详情信息
                    'saveProductDesc': {url :'/data/product/saveDesc' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 获得商品规格与物流信息
                    'getSpecsAndLogistics': {url :'/data/product/:id/getSpecsAndLogistics' ,method: 'GET', isArray: false},
                    // 保存商品规格与物流信息
                    'saveSpecsAndLogistics': {url :'/data/product/saveSpecsAndLogistics' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    // 获得商品图库列表
                    'getImageRepoList': {url :'/data/product/:id/getImageRepoList' ,method: 'GET', isArray: false}

                }
            );
            return service;
        }]);

/**
* @name:订单模块服务
* @author:caibin
* @create on: 2014/10/04
**/
angular.module('flymvo.order.service',[])
    .factory('orderService',['$resource',
        function ($resource){
            var service = $resource('/data/order/',{id: '@id'},
                {
                    //搜索
                    'query': {url: '/data/order/search',method: 'POST',isArray: false},
                    //订单追踪（配送中 和订单详情用同一个接口）
                    'getTrackOrderDistributing': {url :'/data/order/detail/:orderNumber/$',method: 'GET',isArray: false},
                    //获取发票信息
                    'getBillInfo': {url: '/data/order/invoice/:orderId/$',method: 'GET',isArray: false},
                    //获取商品信息
                    'getProductByOrderNumber': {url: '/data/order/skuList/:orderNumber/$',method: 'GET',isArray: false},
                    //获取订单详情
                    'getOrderDetailInfo': {url: '/data/order/detail/:orderNumber/$', method: 'GET',isArray: false},
                    //发货
                    'deliver': {url: '/data/order/deliver',method: 'POST',isArray: false,headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取物流/快递公司
                    'getLogisticsCompany': {url: '/data/order/companyList',method: 'GET',isArray: false},
                    //获取发货模态框中的收货信息
                    'getReceiveInfo': {url: '/data/order/receive/:orderNumber/$',method: 'GET',isArray: false},
                    //打印清单
                    'getPrintOrderList': {url: '/data/order/shoppingList/:orderNumber/$',method: 'GET',isArray: false},
                    //获取发货列表
                    'queryDeliver': {url:'/data/order/deliver/search',method:'POST',isArray:false},
                    //批量导出订单
                    'multiExport': {url:'/data/order/export/excel', method:'POST',isArray:false},
                    //问题订单号列表
                    'errTrackingNo': {url:'/data/order/errTrackingNo', method:'POST',isArray:false},
                    //订单/运单号查询
                    'queryOrderDeliverList': {url:'/data/order/orderDeliverList', method:'POST',isArray:false},
                    //修改运单号日志
                    'searchTrackingNoLog': {url:'/data/order/trackingNoLog',method:'POST',isArray:false},
                    //修改运单号
                    'updateTrackingNo': {url:'/data/order/updateTrackingNo', method:'POST',isArray:false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //批量发货
                    'multiDeliver': {url:'/data/order/multiDeliver',method:'POST',isArray:false,headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //批量打印清单
                    'multiShoppingList':{url:'/data/order/multiShoppingList',method:'POST',isArray:false,headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                });
          return service;
        }]);
/**
 * @name: 促销模块服务
 * @author: Patrick
 * @creat on: 2014/11/18.
 */
angular.module('flymvo.promo.service', [])
    .factory('promoService', ['$resource', '$globalSetting',
        function ($resource, $globalSetting) {
            var service = $resource('/data/', {},
                {
                    //-- ===========================商品促销价===========================
                    // 查询促销价列表
                    'queryPromoPrices': {url :'/data/promotionalprice/search' ,method: 'POST', isArray: false},
                    // 批量设置商品促销价失效
                    'multiDisablePromoPrices': {url :'/data/promotionalprice/invalid' ,method: 'POST', isArray: false},
                    // 添加商品促销价
                    'addPromoPrices': {url :'/data/promotionalprice/add' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================店铺优惠===========================
                    // 查询店铺优惠列表
                    'querySalesRules': {url :'/data/salesRule/search' ,method: 'POST', isArray: false},
                    // 删除店铺优惠
                    'deleteSalesRule': {url :'/data/salesRule/delete' ,method: 'POST', isArray: false},
                    // 撤销店铺优惠
                    'cancelSalesRule': {url :'/data/salesRule/cancel' ,method: 'POST', isArray: false},
                    // 获得店铺优惠
                    'getSalesRule': {url :'/data/salseRule/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑店铺优惠
                    'upsertSalesRule': {url :'/data/salesRule/upsert' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================推荐组合/飞荐不可===========================
                    // 查询推荐组合sku列表
                    'queryGroupPromoSkus': {url :'/data/groupPromo/searchSkus' ,method: 'POST', isArray: false},
                    // 根据sku获得推荐组合列表
                    'listGroupPromoBySku': {url :'/data/groupPromo/listBySku/:id/$' ,method: 'GET', isArray: false},
                    // 删除推荐组合
                    'deleteGroupPromo': {url :'/data/groupPromo/delete' ,method: 'POST', isArray: false},
                    // 排序推荐组合
                    'sortGroupPromos': {url :'/data/groupPromo/sort' ,method: 'POST', isArray: false},
                    // 上架推荐组合(已取消)
                    //'shelveGroupPromo': {url :'/data/groupPromo/shelve' ,method: 'POST', isArray: false},
                    // 下架推荐组合(已取消)
                    //'offshelveGroupPromo': {url :'/data/groupPromo/offshelve' ,method: 'POST', isArray: false},
                    // 获得推荐组合
                    'getGroupPromo': {url :'/data/groupPromo/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑推荐组合
                    'upsertGroupPromo': {url :'/data/groupPromo/save' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},

                    //-- ===========================搭配组合/非常优惠===========================
                    // 查询搭配组合
                    'queryBundling': {url :'/data/bundling/search' ,method: 'POST', isArray: false},
                    // 上架搭配组合
                    'shelveBundling': {url :'/data/bundling/shelve' ,method: 'POST', isArray: false},
                    // 下架搭配组合
                    'offshelveBundling': {url :'/data/bundling/offshelve' ,method: 'POST', isArray: false},
                    // 删除搭配组合
                    'deleteBundling': {url :'/data/bundling/delete' ,method: 'POST', isArray: false},
                    // 获得捆绑组合列表
                    'getBundlingSkus': {url :'/data/bundling/skus/:id/$' ,method: 'POST', isArray: false},
                    // 获得搭配组合
                    'getBundling': {url :'/data/bundling/:id/$' ,method: 'GET', isArray: false},
                    // 创建或者编辑搭配组合
                    'upsertBundling': {url :'/data/bundling/save' ,method: 'POST', isArray: false, headers: { 'Content-Type': 'application/json'}},
                    // 检查sku是否参与了其他搭配
                    'checkBundlingSkus': {url :'/data/bundling/checkSkus' ,method: 'POST', isArray: false}


                }
            );
            return service;
        }]);

/**
 * @name:售后模块服务
 * @author:caibin
 * @create on: 2014/10/04
 **/
angular.module('flymvo.refund.service', [])
    .factory('refundService', ['$resource', "$globalSetting",
        function ($resource, $globalSetting) {
            var headers = {};
            if(!$globalSetting.isMockEnv){
                headers = {'Content-Type': 'application/json;charset=UTF-8'};
            }
            var service = $resource('/data/order/', null,
                {
                    //查询售后单
                    query: {url: '/data/orderReturn/search', method: 'POST', isArray: false, headers: headers},
                    //获取物流公司
                    getLogisticsCompany: {url: '/data/order/companyList', method: 'GET', isArray: false},

                    //审核同意
                    agree: {url: '/data/orderReturn/verify', method: "POST"},

                    //发货和重发
                    deliver: {url: '/data/orderReturn/confirmResend/$', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //回收
                    recycle: {url: '/data/orderReturn/confirmReceive/:returnNo/$' },

                    //补发  
                    reSupply: {url: '/data/orderReturn/confirmResend/$',method: 'POST', isArray:false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},

                    //详情-获取售后状态
                    get: {url: '/data/orderReturn/get/:refundId/$', params: {refundId: '@refundId'}},
                    //详情-获取物流信息
                    getLogistics: {url: '/data/orderReturn/logistics/:trackingNo/$'},

                    //提醒发货
                    getRecycleInfo: {url: '/none', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取默认地址
                    defaultAddress: {url: '/data/tms/mftAddress/setDefaultAddress/:id'},
                    //查询地址
                    queryAddress: {url: '/data/tms/mftAddress/get', method: "POST", isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}},
                    //获取区域
                    getRegion: {url: '/data/tms/region/get/:parentId', parmas: {parentId: '@parentId'}, isArray: false},
                    //添加地址
                    createAddress: {url: '/data/tms/mftAddress/save', method: 'POST', isArray: false, headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                });

            return service;
        }]);
