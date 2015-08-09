import { autoinject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { State } from '../services/state';
import { AuthenticationService } from '../services/auth';
import { LoggedIn, NewPost } from '../resources/messages';

@autoinject
export class NavBarCustomElement {
  @bindable router: any = null;
  theRouter: Router;
  toggleExplore: boolean;

  constructor(private auth: AuthenticationService, router: Router, private ea: EventAggregator, private state: State) {
    ea.subscribe(LoggedIn, (msg: any) => this.showProfile());
    this.showProfile();
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

  get isLoggedIn() { return this.state.token !== null; }

  showNewPost() { this.ea.publish(new NewPost()); }

  showExplore() { this.toggleExplore = !this.toggleExplore; }

  showProfile() {
    this.auth.checkLogin().then(user => {
      if (user.id > 0) { this.LogInOutText = `Logout`; }
    }).catch(() => {
      console.log("error");
    });
  }
}