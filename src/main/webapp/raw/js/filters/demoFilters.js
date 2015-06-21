/**
 * @description: Dmo filters
 * @author: Patrick.he
 **/

angular.module('flymvo.demo.filters', [])
    //-- 订单状态
    .filter('demoStatus', ['demoConstants', function (orderConstants) {
        return function (value) {
            return demoConstants.statuses[value];
        };
    }])
    //-- 货币
    .filter('demoCurrency', ['demoConstants', '$filter', '$sce', function (demoConstants, $filter, $sce) {
        return function (amount, currencyId) {
              var symbol = demoConstants.currencyIcons[currencyId];
              if(angular.isUndefined(symbol) || null === amount || "" === amount){
                  return "";
              }else{
                  if(symbol.indexOf("fa-")>=0){
                      return $sce.trustAsHtml('<i class="fa '+ symbol+'"></i> ' + $filter('currency')(amount, "") );
                  }else{
                      return $filter('currency')(amount, symbol  + " ") ;
                  }

              }
        };
    }])

;

