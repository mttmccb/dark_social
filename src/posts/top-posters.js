import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TopPostersCustomElement {
  @bindable posts = null;
  @bindable type = "";

  constructor(router) {
    this.theRouter = router;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}