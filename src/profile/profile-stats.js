import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router'; 

@inject(Router)
export class ProfileStatsCustomElement {
  @bindable posts = null;

  constructor(api, router) {
    this.theRouter = router;
    this.numberOfTopMentions = 5;
  }

  moreMentions() {
    this.numberOfTopMentions += 5;
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user || this.user_id });
  }
}