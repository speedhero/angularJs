/**
 * @component: core
 * @name: top module
 * @description:  Declare app level module which depends on filters、 services、etc
 */
angular.module('CustomerManager', [
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
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                
        }
    ]);

