/**
 * @name updatePasswordCtrl
 * @author caibin
 * @time 2014/10/8
 **/
angular.module("flymvo.account.updatePasswordCtrl", [])
    .controller("updatePasswordCtrl", [
        '$scope',
        '$filter',
        '$timeout',
        '$stateParams',
        '$rootScope',
        '$state',
        'accountService',
        function ($scope, $filter, $timeout, $stateParams, $rootScope, $state, accountService) {
            $scope.$changeCurrMenuByCode('mvo_account_change_password');
            $scope.account = {};
            $scope.account.newPassword = "";

            $scope.updatePassword = function () {
                //密码用md5加密
                var newPw = hex_md5($scope.account.newPassword),
                    newPwCon = hex_md5($scope.account.newPasswordAgain),
                    oldPw = hex_md5($scope.account.oldPassword);
                accountService.updatePassword({'oldPw': oldPw, 'newPw': newPw, 'newPwCon': newPwCon}).$promise.then(function (resp) {
                    //成功
                    if (resp.success === true) {
                        $scope.successMsg = resp.message;
                        $scope.isSuccess = resp.success;
                        $scope.account.oldPassword = "";
                        $scope.account.newPassword = "";
                        $scope.account.newPasswordAgain = "";
                    }
                    //出错
                    else {
                        $scope.isSuccess = resp.success;
                        $scope.errorMsg = resp.message;
                    }
                });
            };


        }])
    //密码强度指示条 ：http://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password
    .directive('checkStrength', function () {
        return {
            replace: false,
            restrict: 'EACM',
            link: function ($scope, iElement, iAttrs) {
                var strength = {
                    colors: ['#F00', '#F90', '#FF0', '#0F0'],
                    measureStrength: function (p) {

                        var _force = 0;//强度
                        var _regex = /[~!@#$%^&*()_+,\.\/\?\'\;\:]/g; //符号正则表达式

                        var _lowerLetters = /[a-z]+/.test(p);//小写符号
                        var _upperLetters = /[A-Z]+/.test(p);//大写符号
                        var _numbers = /[0-9]+/.test(p);//数字
                        var _symbols = _regex.test(p);//符号

                        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                        var _passedMatches = $.grep(_flags,function (el) {
                            return el === true;
                        }).length;

                        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                        _force += _passedMatches * 10;

                        // 短密码
                        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

                        // 字符种类单一
                        _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                        _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                        _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

                        return _force;

                    },
                    getColor: function (s) {
                        var idx = 0;
                        if (s <= 10) {
                            idx = 0;
                        }
                        else if (s <= 20) {
                            idx = 1;
                        }
                        else if (s <= 30) {
                            idx = 2;
                        }
                        else if (s <= 40) {
                            idx = 3;
                        }
                        else {
                            idx = 4;
                        }
                        return { idx: idx + 1, col: this.colors[idx] };
                    }
                };
                //根据viewValue的值来判定强度
                var updatePasswordStrength = function (viewValue) {
                    if (viewValue || viewValue !== '') {
                        var force = strength.measureStrength(viewValue);
                        var color = strength.getColor(force);
                        iElement.css({ "display": "inline" });
                        iElement.children('li')
                            .css({ "background": "#DDD"})
                            .slice(0, color.idx)
                            .css({ "background": color.col, "color": "#FFF" });
                    } else {
                        iElement.children('li')
                            .css({"background": "#DDD", "color": "#000"});
                    }
                    return viewValue;
                };
                $scope.form[iAttrs.checkStrength].$parsers.unshift(updatePasswordStrength);
                $scope.form[iAttrs.checkStrength].$formatters.unshift(updatePasswordStrength);
            },
            template: '<li class="password-strength-point">弱</li><li class="password-strength-point">中</li><li class="password-strength-point">强</li>'
        };
    });
  