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
