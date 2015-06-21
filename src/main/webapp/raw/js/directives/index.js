/**
 * @description: Directives 集合器。所有需要注入app的directive，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.directives', [
  'flymvo.demo.directives',
  'flymvo.checkboxRadioButtonToggle.directives',
  'flymvo.validate.directives',
  'flymvo.greedy.directives',
  'flymvo.provinces.directives',
  'flymvo.progressBar.directives',
  'flymvo.product.directives',
  'flymvo.message.directives',
  'flymvo.urlReload.directives',
  'flymvo.timeCounter.directives'
]);
