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
