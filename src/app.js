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
    config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
    config.addPipelineStep('authorize', UsercheckStep);
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose' },
      { route: ['profile/'], moduleId: './profile', nav: true, title: 'Profile', name: 'profile' },
      { route: ['profile/user/:user_id'], moduleId: './profile', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile', title: 'Profile', name: 'randomprofile' },
      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending' },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations' },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos' },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins' },
      { route: 'handle_oauth', moduleId: './login/handle_oauth' },
      { route: 'login', moduleId: './login/login', nav: true, redirectLoggedInUser: "/login/logout" },
      { route: 'login/logout', moduleId: './login/logout' }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationService)
class UsercheckStep {

  constructor(authenticationService) {
    this.auth = authenticationService;
    console.log("Pipeline step");
  }

  run(routingContext, next) {
   if (window.location.hash) {
      return next.cancel(new Redirect('handle_oauth?' + window.location.hash.substring(1)));
    }
    console.log(this.auth.user)
    if (this.auth.user) {
      const redirectTo = routingContext.nextInstructions.filter(a => a.config.redirectLoggedInUser);
      if (redirectTo.length === 0) return next();

      return next.cancel(new Redirect(redirectTo[0].config.redirectLoggedInUser));
    } else {
      return next();
    }
  }
}