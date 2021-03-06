import { bindable, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class TopHashtagsCustomElement {
  @bindable posts: any = null;

  constructor(private router: Router) { }

  loadUserRoute(hashtag: string) {
    this.router.navigateToRoute("hashtag", { hashtag: hashtag });
  }
}