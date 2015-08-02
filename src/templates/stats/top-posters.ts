import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TopPostersCustomElement {
  @bindable posts: any = null;

  theRouter: Router;
  constructor(router: Router) {
    this.theRouter = router;
  }

  loadUserRoute(user: any) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
}