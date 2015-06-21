/**
 * @description: 进度条 directives
 * @author: max.huang
 **/
angular.module('flymvo.timeCounter.directives', [])
  .directive('timecounter', [
    '$timeout',
    function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      replace: true,
      templateUrl: '/html/template/timeCounter.html',
      link: function (scope, element, attrs) {
        scope.$watch('config', function(newVal, oldVal) {
          if(_.isUndefined(scope.config) || !scope.config.enable)  return;

          scope.config.start = parseInt(scope.config.start);
          var now = new Date();
          var leftTime = Math.floor((scope.config.start + scope.config.period - now.getTime()) / 1000);

          var count = function() {
            leftTime -= 1;
            scope.day = Math.floor(leftTime / 3600 / 24); 
            scope.hour = Math.floor((leftTime - scope.day * 3600 * 24) / 3600);
            scope.min = Math.floor((leftTime - scope.day * 3600 * 24 - scope.hour * 3600) / 60);
            scope.sec = Math.floor(leftTime - scope.day * 3600 * 24 - scope.hour * 3600 - scope.min * 60);
            $timeout(count, 1000);
          };
          count();
        });
      }
    };
  }]);

