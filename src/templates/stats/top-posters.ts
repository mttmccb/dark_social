import { bindable, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class TopPostersCustomElement {
  @bindable posts: any = null;

  constructor(private router: Router) { }

  loadUserRoute(user: number) {
    this.router.navigateToRoute("userprofile", { user_id: user });
  }
}