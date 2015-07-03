import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { Redirect } from 'aurelia-router';
import { AuthorizeStep, AuthenticationService } from './services/auth';

@inject(AdnAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Dark Social';
    config.options.pushState = true;
    config.addPipelineStep('authorize', HashRedirectStep);
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose', name: 'Home' },
      { route: ['stream'], moduleId: './unified-stream', nav: true, auth: true, title: 'Stream', settings: { icon: 'comments' } },
      { route: ['mentions'], moduleId: './mentions', nav: true, auth: true, title: 'Mentions', settings: { text: '@' } },
      { route: ['interactions/reposts'], moduleId: './interactions', nav: true, auth: true, title: 'Reposts', settings: { icon: 'retweet', action: 'repost' } },
      { route: ['interactions/stars'], moduleId: './interactions', nav: true, auth: true, title: 'Stars', settings: { icon: 'star', action: 'star' } },
      { route: ['interactions/followers'], moduleId: './interactions', nav: true, auth: true, title: 'Followers', settings: { icon: 'users', action: 'follow' } },

      { route: ['niceglobal'], moduleId: './nice-global', nav: true, title: 'Nice Global', settings: { icon: 'thumbs-up', iconBack: 'globe', group: 'explore', groupStart: true } },

      { route: ['profile/'], moduleId: './profile-router', nav: true, title: 'Profile', name: 'profile', settings: { icon: 'question', iconBack: 'user', group: 'explore' } },
      { route: ['profile/user/:user_id'], moduleId: './profile-router', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile-router', title: 'Profile', name: 'randomprofile' },

      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending', settings: { icon: 'line-chart', iconBack: 'globe', group: 'explore' } },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations', settings: { icon: 'comments', iconBack: 'globe', group: 'explore' } },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos', settings: { icon: 'camera-retro', iconBack: 'globe', group: 'explore' } },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins', settings: { icon: 'map-marker', iconBack: 'globe', group: 'explore' } },

      { route: ['thread/:id'], moduleId: './thread', title: 'Thread', name: 'thread' },
      { route: ['hashtag/:hashtag'], moduleId: './hashtag', title: 'Hashtag', name: 'hashtag' },

      { route: ['handle_oauth'], moduleId: './login/handle_oauth' },
      { route: ['login'], moduleId: './login/login', name: 'login' },
      { route: ['logout'], moduleId: './login/logout', name: 'logout' }
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