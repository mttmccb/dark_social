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
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose', name: 'Home' },
      { route: ['stream'], moduleId: './unified-stream', nav: true, auth: true, title: 'Stream', settings: { icon: 'user', iconBack: 'globe' }  },
      { route: ['mentions'], moduleId: './mentions', nav: true, auth: true, title: 'Mentions', settings: { icon: 'comments', iconBack: 'heart' }  },
      { route: ['interactions'], moduleId: './interactions', nav: true, auth: true, title: 'Interactions', settings: { icon: 'bell', iconBack: 'heart' }  },
      { route: ['recent'], moduleId: './recent-posts', nav: true, auth: true, title: 'Recent', settings: { icon: 'clock-o', iconBack: 'bullseye' }  },
      { route: ['profile/'], moduleId: './profile-router', nav: true, title: 'Profile', name: 'profile', settings: { icon: 'question', iconBack: 'user' } },
      { route: ['profile/user/:user_id'], moduleId: './profile-router', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile-router', title: 'Profile', name: 'randomprofile' },
      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending', settings: { icon: 'line-chart', iconBack: 'globe' } },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations', settings: { icon: 'comments', iconBack: 'globe' } },
      { route: ['thread/:id'], moduleId: './thread', title: 'Thread', name: 'thread' },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos', settings: { icon: 'camera-retro', iconBack: 'globe' } },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins', settings: { icon: 'map-marker', iconBack: 'globe' } },
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

    return next();
  }
}