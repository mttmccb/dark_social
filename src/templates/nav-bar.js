import { bindable, inject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn, ApiStatus } from 'resources/messages';

@inject(AuthenticationService, Router, EventAggregator)
export class NavBarCustomElement {
  @bindable router = null;

  constructor(authenticationService, router, ea) {
    this.auth = authenticationService;
    this.theRouter = router;
    this.ea = ea;
    ea.subscribe(LoggedIn, msg => this.showProfile());
    ea.subscribe(ApiStatus, msg => this.displayStatus(msg.apistatus));
    this.showProfile();
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
    
  apiStatusMessage = "";
  
  displayStatus(status) {
    this.apiStatusMessage = status;
  }
  
  showProfile() {
    this.auth.checkLogin().then(user => {
      if (user) {
        this.LogInOutText = `Logout (${user.username})`;
      }
    }).catch(() => {
      console.log("error");
    });    
  }
}