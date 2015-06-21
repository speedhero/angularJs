angular.module("flymvo.coupon.constants", [])
    .constant('couponConstants', {
        //优惠劵状态
        couponStatus: [ 
            {value: '0', label: '未派发'}, 
            {value: '1', label: '派发中'}, 
            {value: '2', label: '已结束'}
        ]
    });