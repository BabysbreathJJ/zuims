/**
 * Created by Lijingjing on 15/11/12.
 */
'use strict';

describe('myApp.register module', function() {

    beforeEach(module('myApp.register'));

    describe('Pay register controller', function(){

        it('should exist', inject(function($controller) {
            //spec body
            var registerCtrl = $controller('PayRegisterCtrl');
            expect(registerCtrl).toBeDefined();
        }));

    });

    describe('Experience register controller', function(){

        it('should exist', inject(function($controller) {
            //spec body
            var registerCtrl = $controller('ExperienceRegisterCtrl');
            expect(registerCtrl).toBeDefined();
        }));

    });

    //describe('register service',function(){
    //
    //});
});