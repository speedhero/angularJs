'use strict';

/**
 * @description: jasmine specs for service go here
 * @author: Patrick.he
 **/

describe('productService', function () {
    beforeEach(module('flymvo'));

    describe('test productService', function () {
        it('test product service defined', inject(function (productService, $httpBackend) {
            expect(productService).toBeDefined();

        }));

        it('test response', inject(function (productService, $httpBackend) {
            $httpBackend.expect('GET', 'http://rap.feifeiit.cn/mockjsdata/23/data/brand/supplierBrands').respond(200, 'success');

            productService.listSupplierBrands().$promise.then(function (data) {
                console.log(data);
            });

            $httpBackend.flush();




        }));
    });
});
