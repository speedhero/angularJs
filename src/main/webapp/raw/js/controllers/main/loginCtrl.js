/**
 * @name: 登陆模块控制器
 * @description:
 * @author: Max.huang
 * @create : 2014/10/8.
 */

angular.module('flymvo.main.loginCtrl', [])
  .controller('loginCtrl', [
    '$scope',
    '$state',
    '$globalSetting',
    'loginService',
    function ($scope, $state, $globalSetting, loginService) {

      // 初始化
      $scope.login = {};
      $scope.error = {};
      $scope.error.result = 1;
      $scope.hasCommit = false;
      var tempPassword;


      //获取验证码图片
      $scope.getVerification = function() {
        $('#verification img').remove();
        //$('#verification').append('<img src="http://dummyimage.com/55x24/000/FFF?'+ Math.random() +'" width="55" height="24" align="absmiddle">');
        $('#verification').append('<img src="/data/upms/kaptcha?'+ Math.random() +'" width="55" height="24" align="absmiddle">');
      };

      //提交登陆表单
      $scope.submitLogin = function() {
        $scope.hasCommit = true;
        tempPassword = $scope.login.password;

        if($scope.loginForm.$valid) {
          $scope.login.password = hex_md5($scope.login.password);
          loginService.save($scope.login).$promise.then(function(resp) {
            $scope.error = resp;
            console.log(resp);

            if($scope.error.result) {
              $state.go('main.welcome');
            }else{
              $scope.getVerification();
              $scope.login.verification = '';
              $scope.login.password = tempPassword;
              return;
            }

          });
        }

      };

    }
  ]);
