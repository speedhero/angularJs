'use strict';

/**
 * @description: jasmine specs for filters go here
 * @author: Patrick.he
 **/

describe('productFilter', function () {
    beforeEach(module('flymvo'));

    it('get text by status of product shelve', inject(function (productShelvesStatusFilter) {  //xxx+"Filter"
        console.log(productShelvesStatusFilter(1));
        expect(productShelvesStatusFilter(1)).toBe('\u5df2\u4e0a\u67b6'); //已上架unicode
    }));
});
