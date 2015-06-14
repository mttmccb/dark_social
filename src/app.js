import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { Redirect } from 'aurelia-router';
import { AuthorizeStep, AuthenticationService } from './services/auth';

@inject(AdnAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Dark.Social';
    config.options.pushState = true;
    config.addPipelineStep('authorize', HashRedirectStep);
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose' },
      { route: ['newpost'], moduleId: './new-post', nav: true, title: 'New Post' },
      { route: ['profile/'], moduleId: './profile-router', nav: true, title: 'Profile', name: 'profile' },
      { route: ['profile/user/:user_id'], moduleId: './profile-router', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile-router', title: 'Profile', name: 'randomprofile' },
      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending' },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations' },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos' },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins' },
      { route: 'handle_oauth', moduleId: './login/handle_oauth' },
      { route: 'login', moduleId: './login/login', name: 'login' },
      { route: 'logout', moduleId: './login/logout', name: 'logout' }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationService)
class HashRedirectStep {

  constructor(auth) {
    this.auth = auth;
    console.log("Pipeline step");
  }

  run(routingContext, next) {
    if (window.location.hash) {
      console.log("Redirecting");
      return next.cancel(new Redirect('handle_oauth?' + window.location.hash.substring(1)));
    }
    
    this.auth.checkLogin();
      
    return next();
  }
}