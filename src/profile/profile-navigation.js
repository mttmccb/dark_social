import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class ProfileNavigationCustomElement {
  @bindable user = null;

  constructor(router) {
    this.theRouter = router;
  }
  
  loadRandomUserRoute() {
    this.theRouter.navigateToRoute("randomprofile");
  }

  loadUserRoute() {
    this.theRouter.navigateToRoute("userprofile", { user_id: this.user.username });
  }
}