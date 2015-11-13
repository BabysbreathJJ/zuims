/**
 * Created by Lijingjing on 15/11/12.
 */
'use strict';

describe('myApp.register module', function() {

    beforeEach(module('myApp.register'));

    describe('register controller', function(){

        it('should exist', inject(function($controller) {
            //spec body
            var registerCtrl = $controller('RegisterCtrl');
            expect(registerCtrl).toBeDefined();
        }));

    });

    describe('register service',function(){

    });
});