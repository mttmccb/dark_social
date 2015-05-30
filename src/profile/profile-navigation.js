import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Validation } from 'aurelia-validation';

@inject(Router, Validation)
export class ProfileNavigationCustomElement {
  @bindable user = { username: null };

  constructor(router, validation) {
    this.theRouter = router;
    var resolve = this.user.username;
    this.user.validation = validation.on(this.user)
      .ensure('username')
      .isNotEmpty()
      .hasLengthBetween(1, 20)
      .containsOnly(/^[a-zA-Z0-9_]+$/);
  }

  loadRandomUserRoute() {
    this.theRouter.navigateToRoute("randomprofile");
  }

  loadUserRoute() {
    console.log(this.user);
    this.user.validation.validate().then(() => {
      this.theRouter.navigateToRoute("userprofile", { user_id: this.user.username });
    });
  }
}