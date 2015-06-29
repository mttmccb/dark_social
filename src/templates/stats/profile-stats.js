import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router'; 

@inject(Router)
export class ProfileStatsCustomElement {
  @bindable posts = null;

  constructor(router) {
    this.theRouter = router;
    this.numberOfTopMentions = 5;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}