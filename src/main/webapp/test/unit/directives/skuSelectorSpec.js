'use strict';

/**
 * @description: jasmine specs for directives go here
 * @author: Patrick.he
 **/

describe('skuSelector', function () {
    beforeEach(module('flymvo'));

    describe('test skuSelector', function () {
        it('test skuSelector defined', inject(function (skuSelector) {
            expect(skuSelector).toBeDefined();

        }));

        it('test skuSelector defined', inject(function ($rootScope, skuSelector) {
            var scope = $rootScope.$new();
            var mySkuSelector = skuSelector({
                maxNum : 50,
                multi: true
            }, scope);
            expect(mySkuSelector.open).toBeDefined();

        }));
    });
});