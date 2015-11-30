'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /register when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/about");
  });


  describe('view_register', function() {

    beforeEach(function() {
      browser.get('#/experience_register');
    });


    it('should render register when user navigates to /experience_register', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view register/);
    });

  });



});
