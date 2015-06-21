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
