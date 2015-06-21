'use strict';

/**
 * @description: jasmine specs for controller go here
 * @author: Patrick.he
 * https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB0QFjAA&url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F12474571%2Funittest-for-nested-controllers&ei=aoN1VJzPJJCvogSRjIGgDw&usg=AFQjCNGv9UwyMx9jk5fdw1PNquTy5xxRcw&sig2=7hmneFazZx5pS3viQKrEFQ&bvm=bv.80642063,d.cGU
 **/

describe('mainCtrl', function () {
    //先获取mainController
    var scope, mainCtrl, $httpBackend;
    beforeEach(module('flymvo'));
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        mainCtrl = $controller('mainCtrl', {$scope: scope});
    }));

    it('test mainCtrl defined', inject(function () {
        expect(mainCtrl).toBeDefined();
    }));

    describe('productListCtrl', function () {
        //再获取productListCtrl
        var ctrl;
        beforeEach(inject(function ($controller) {
            ctrl = $controller('productListCtrl', {$scope: scope});
        }));

        it('test productListCtrl defined', inject(function () {
            expect(ctrl).toBeDefined();
            console.log("productListCtrl当前scope的query对象");
            console.log(scope.query);
        }));
    });



});


/* jasmine specs for controllers go here */
//describe('PhoneCat controllers', function() {
//
//  beforeEach(function(){
//    this.addMatchers({
//      toEqualData: function(expected) {
//        return angular.equals(this.actual, expected);
//      }
//    });
//  });
//
//  beforeEach(module('phonecatApp'));
//  beforeEach(module('phonecatServices'));
//
//  describe('PhoneListCtrl', function(){
//    var scope, ctrl, $httpBackend;
//
//    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
//      $httpBackend = _$httpBackend_;
//      $httpBackend.expectGET('phones/phones.json').
//          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
//
//      scope = $rootScope.$new();
//      ctrl = $controller('PhoneListCtrl', {$scope: scope});
//    }));
//
//
//    it('should create "phones" model with 2 phones fetched from xhr', function() {
//      expect(scope.phones).toEqualData([]);
//      $httpBackend.flush();
//
//      expect(scope.phones).toEqualData(
//          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
//    });
//
//
//    it('should set the default value of orderProp model', function() {
//      expect(scope.orderProp).toBe('age');
//    });
//  });
//
//
//  describe('PhoneDetailCtrl', function(){
//    var scope, $httpBackend, ctrl,
//        xyzPhoneData = function() {
//          return {
//            name: 'phone xyz',
//                images: ['image/url1.png', 'image/url2.png']
//          }
//        };
//
//
//    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
//      $httpBackend = _$httpBackend_;
//      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());
//
//      $routeParams.phoneId = 'xyz';
//      scope = $rootScope.$new();
//      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
//    }));
//
//
//    it('should fetch phone detail', function() {
//      expect(scope.phone).toEqualData({});
//      $httpBackend.flush();
//
//      expect(scope.phone).toEqualData(xyzPhoneData());
//    });
//  });
//});
