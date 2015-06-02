import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TopMentionsCustomElement {
  @bindable posts = null;

  constructor(router) {
    this.theRouter = router;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}