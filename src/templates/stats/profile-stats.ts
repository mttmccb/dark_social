import { bindable, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router'; 

@autoinject
export class ProfileStatsCustomElement {
  @bindable posts: any = null;
  numberOfTopMentions: number;
  
  constructor(private router: Router) {
    this.numberOfTopMentions = 5;
  }

  loadUserRoute(user: number) {
    this.router.navigateToRoute("userprofile", { user_id: user });
  }
}