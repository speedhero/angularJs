/**
 * @description: 控制器集合器,所有需要注入app的controller，都要在这里注册
 * @author: Patrick.he
 */

angular.module('flymvo.promo.controllers', [
  'flymvo.promo.promoPriceListCtrl',
  'flymvo.promo.promoPriceCreateCtrl',
  'flymvo.promo.salesRuleListCtrl',
  'flymvo.promo.salesRuleUpsertCtrl',
  'flymvo.promo.salesRuleViewCtrl',
  'flymvo.promo.bundlingListCtrl',
  'flymvo.promo.bundlingUpsertCtrl',
  'flymvo.promo.bundlingSkusViewCtrl',
  'flymvo.promo.groupPromoSkuListCtrl',
  'flymvo.promo.groupPromoUpsertCtrl',
  'flymvo.promo.groupPromoListCtrl'
]);
