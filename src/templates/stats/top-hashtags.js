import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class TopHashtagsCustomElement {
  @bindable posts = null;

  constructor(router) {
    this.theRouter = router;
  }

  loadUserRoute(hashtag) {
    this.theRouter.navigateToRoute("hashtag", { hashtag: hashtag });
  }

}