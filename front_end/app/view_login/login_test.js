/**
 * Created by Lijingjing on 15/11/18.
 */
'use strict';

describe('myApp.login module', function() {

    beforeEach(module('myApp.login'));

    describe('login controller', function(){

        it('should exist', inject(function($controller) {
            //spec body
            var loginCtrl = $controller('LoginCtrl');
            expect(loginCtrl).toBeDefined();
        }));

    });

    //describe('login service',function(){
    //
    //});
});