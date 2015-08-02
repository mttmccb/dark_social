import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TopHashtagsCustomElement {
  @bindable posts: any = null;

  theRouter: Router;
  constructor(router: Router) {
    this.theRouter = router;
  }

  loadUserRoute(hashtag: string) {
    this.theRouter.navigateToRoute("hashtag", { hashtag: hashtag });
  }

}