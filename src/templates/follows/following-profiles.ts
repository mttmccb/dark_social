import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class FollowingProfiles {
  @bindable profiles = null;
  theRouter: Router;
  constructor(router: Router) {
    this.theRouter = router;
  }

  loadUserRoute(user: number) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}