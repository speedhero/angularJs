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
