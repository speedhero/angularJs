/**
 * @description: 进度条 directives
 * @author: max.huang
 **/
angular.module('flymvo.progressBar.directives', [])
  .directive('progressbar', [function () {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      replace: true,
      templateUrl: '/html/template/progressBar.html',
      link: function (scope, element, attrs) {
        scope.$watch('config', function(newVal, oldVal) {
          if(_.isUndefined(scope.config))  return;

          scope.items = scope.config.content;
          scope.liWidth = {width: 100 / scope.items.length + "%"};
          scope.progressWidth = {
            width: 100 / (scope.items.length * 2) * (scope.items.length * 2 - 2) + "%",
            left: 100 / (scope.items.length * 2) + "%"
          };

          scope.progress = scope.config.active / (scope.items.length - 1) * 100;
        });
      }
    };
  }]);

