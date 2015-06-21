angular.module('flymvo.refund.refundAddressCtrl',[])
  .controller('refundAddressCtrl',[
    '$scope',
    '$filter',
    '$state',
    '$globalSetting',
    'ngDialog',
    'ngPopover',
    function ($scope, $filter, $state, $globalSetting, ngDialog, ngPopover ) {
      "use strict";
      console.log("enter refund refundAddressCtrl");

      $scope.editAddressDialog = function() {
        ngDialog.open({
          template: '/html/refund/info/refundAddressList.html?tag=' + $globalSetting.version,
          scope   : $scope,
          className: 'ngdialog-theme-default  size-large' 
        });
      };  

      // ngPopover
      $scope.addAddressPopover = function (event) {
          ngPopover.open(
            event.toElement,  //element
            $scope,  //scope
            {  //options
              template: '/html/refund/info/refundAddressAdd.html?tag=' + $globalSetting.version,
              placement: 'top'
            }
          ); 
      };

      $scope.closePopover = function () {
        ngPopover.close();
      };
       
      

      } 
 ]); 
