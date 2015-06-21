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
