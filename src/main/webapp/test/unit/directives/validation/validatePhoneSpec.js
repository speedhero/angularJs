'use strict';

/**
 * @description: jasmine specs for directives go here
 * @author: Patrick.he
 * 参考： http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
 **/

describe('validatePhone', function () {
    var $scope, form;

    beforeEach(module('flymvo'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
                '<form name="form">' +
                '<input ng-model="model.phone" name="phone" validate-phone />' +
                '</form>'
        );
        $scope.model = { phone: null };
        $compile(element)($scope);
        form = $scope.form;
    }));

    it('pass with phone', function() {
        form.phone.$setViewValue('18620004815');
        $scope.$digest();
        expect($scope.model.phone).toEqual('18620004815');
        expect(form.phone.$valid).toBe(true);
    });

    it('pass with letters', function() {
        form.phone.$setViewValue('abcdefg');
        $scope.$digest();
        expect($scope.model.phone).not.toEqual('18620004815');
        expect(form.phone.$valid).toBe(false);
    });
});