import { bindable, inject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';

@inject(AuthenticationService, Router)
export class NavBarCustomElement {
  @bindable router = null;

  constructor(authenticationService, router) {
    this.auth = authenticationService;
    this.theRouter = router;
  }

  attached() {
    this.auth.checkLogin().then(user => {
      if (user) {
        this.LogInOutText = "Logout";
      }
    }).catch(() => {
      console.log("error");
    });
  }

  LogInOutText = "Login";
  LogInOut() {
    if (this.LogInOutText === "Login") {
      this.theRouter.navigate("login");
    } else {
      this.LogInOutText = "Login";
      this.theRouter.navigate("logout");
    }
  }
}