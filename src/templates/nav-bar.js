import { State } from '../services/state';
import { bindable, inject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn, NewPost } from 'resources/messages';

@inject(AuthenticationService, Router, EventAggregator, State)
export class NavBarCustomElement {
  @bindable router = null;

  constructor(authenticationService, router, ea, state) {
    this.auth = authenticationService;
    this.theRouter = router;
    this.ea = ea;
    ea.subscribe(LoggedIn, msg => this.showProfile());
    this.showProfile();
    this.state = state;
    this.toggleExplore = false;
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
  
  get isLoggedIn(){
    return this.state.token !== null;
  } 
  
  showNewPost() {
    this.ea.publish(new NewPost());
  }
  
  showExplore() {
    this.toggleExplore = !this.toggleExplore;
    console.log(this.toggleExplore);
  }
  
  showProfile() {
    this.auth.checkLogin().then(user => {
      if (user.id!=='') {
        this.LogInOutText = `Logout`;
      }
    }).catch(() => {
      console.log("error");
    });    
  }
}