'use strict';

var _profilePoJs = require('./profile.po.js');

var _skeletonPoJs = require('./skeleton.po.js');

describe('dark.social app', function () {
  var po_profile, po_skeleton;

  beforeEach(function () {
    po_skeleton = new _skeletonPoJs.PageObject_Skeleton();
    po_profile = new _profilePoJs.PageObject_Profile();

    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });

  it('should load the page and display the initial page title', function () {
    expect(po_skeleton.getCurrentPageTitle()).toBe('Dark.Social');
  });

  it('should display defaul profile', function () {
    expect(po_profile.getGreeting()).toBe('Matt Mccabe');
  });

  it('should switch users', function () {
    po_profile.setUseName('dalton');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(po_profile.getGreeting()).toBe('Dalton Caldwell');
  });

  it('should navigate to profile page', function () {
    po_skeleton.navigateTo('#/profile');
    expect(po_skeleton.getCurrentPageTitle()).toBe('Profile | Dark.Social');
  });
});