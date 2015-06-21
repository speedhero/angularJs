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