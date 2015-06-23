import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class PostBackCustomElement {
  @bindable post = null;

  constructor(router) {
    this.theRouter = router;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}