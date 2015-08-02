import { State } from '../services/state';
import { bindable, autoinject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn, NewPost } from '../resources/messages';

@autoinject
export class NavBarCustomElement {
  @bindable router: any = null;
  theRouter: Router;
  toggleExplore: boolean;
  constructor(private auth: AuthenticationService, router: Router, private ea: EventAggregator, private state: State) {
    this.auth = auth;
    this.theRouter = router;
    this.ea = ea;
    ea.subscribe(LoggedIn, (msg: any) => this.showProfile());
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
  }
  
  showProfile() {
    this.auth.checkLogin().then(user => {
      if (user.id>0) {
        this.LogInOutText = `Logout`;
      }
    }).catch(() => {
      console.log("error");
    });    
  }
}