import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router'; 

@inject(Router)
export class ProfileStatsCustomElement {
  @bindable posts: any = null;
  theRouter: Router;
  numberOfTopMentions: number;
  constructor(router: Router) {
    this.theRouter = router;
    this.numberOfTopMentions = 5;
  }

  loadUserRoute(user: number) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}