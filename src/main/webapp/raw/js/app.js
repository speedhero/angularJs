var app = angular.module('CustomerManager', ['ngAnimate', 'ui.router']);

/**
 * 由于整个应用都会和路由打交道，这里把$state和$stateParams两个对象放到$rootScope上，方便其他地方引用和注入
 */
app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state("index",{
            url: "/index",
            views : {
                '' : {
                    templateUrl: "html/index.html"
                },
                'header@index' :{
                    templateUrl: "html/header.html"
                },
                'main@index' :{
                    templateUrl: "html/customer/customers.html"
                },
                'footer@index' :{
                    templateUrl: "html/footer.html"
                }
            }
        })
        .state("customer",{
            url: "/customer",
            views : {
                'main@index' :{
                    templateUrl: "html/customer/customers.html"
                }
            }
        });
});

