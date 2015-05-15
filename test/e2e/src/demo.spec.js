import {PageObject_Profile} from './profile.po.js';
import {PageObject_Skeleton} from './skeleton.po.js';

describe('dark.social app', function() {
  var po_profile,
      po_skeleton;

  beforeEach( () => {
    po_skeleton = new PageObject_Skeleton();
    po_profile = new PageObject_Profile();

    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });

  it('should load the page and display the initial page title', () => {
    expect(po_skeleton.getCurrentPageTitle()).toBe('Dark.Social');
  });

  it('should display defaul profile', () => {
    expect(po_profile.getGreeting()).toBe('Matt Mccabe');
  });

  it('should switch users', () => {
    po_profile.setUseName('dalton');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(po_profile.getGreeting()).toBe('Dalton Caldwell');
  });

  it('should navigate to profile page', () => {
    po_skeleton.navigateTo('#/profile');
    expect(po_skeleton.getCurrentPageTitle()).toBe('Profile | Dark.Social');
  });
});
