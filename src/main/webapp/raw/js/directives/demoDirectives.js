
/**
 * @description: Demo directives
 * @author: Patrick.he
 **/
angular.module('flymvo.demo.directives', [])
    .directive('hello', [function () {
        return {
            restrict: 'E',
            scope: {
                who: '@expanderWho'
            },
            replace: true,
            template: '<div>Hello {{who}} !!</div>',
            link: function (scope, element, attrs) {
                console.log(element.scope());
            }
        };
    }]);