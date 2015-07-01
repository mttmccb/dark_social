import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class FollowerProfiles {
  @bindable profiles = null;

  constructor(router) {
    this.theRouter = router;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}