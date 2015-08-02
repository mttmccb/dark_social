import { bindable, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class FollowerProfiles {
  @bindable profiles: any = null;
  constructor(private router: Router) {
    this.router = router;
  }

  loadUserRoute(user: number) {
    this.router.navigateToRoute("userprofile", { user_id: user });
  }
}