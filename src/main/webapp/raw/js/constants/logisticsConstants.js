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
