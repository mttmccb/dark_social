import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { Redirect, Router } from 'aurelia-router';
import { AuthenticationService } from './services/auth';

@inject(Router)
export class App {
  
  api: AdnAPI;
  router: Router;
  
  configureRouter(config: any, router: Router) {
    config.title = 'Dark Social';
    config.options.pushState = true;
    config.addPipelineStep('authorize', HashRedirectStep);
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose', name: 'Home' },
      { route: ['stream'], moduleId: './posts-stream', nav: true, auth: true, title: 'Stream', settings: { icon: 'comments', stream: 'unified', streammarker: true } },
      { route: ['mentions'], moduleId: './posts-stream', nav: true, auth: true, title: 'Mentions', settings: { text: '@', stream: 'mentions' } },
      { route: ['interactions/reposts'], moduleId: './interactions', nav: true, auth: true, title: 'Reposts', settings: { icon: 'retweet', action: 'repost' } },
      { route: ['interactions/stars'], moduleId: './interactions', nav: true, auth: true, title: 'Stars', settings: { icon: 'star', action: 'star' } },
      { route: ['interactions/followers'], moduleId: './interactions', nav: true, auth: true, title: 'Followers', settings: { icon: 'users', action: 'follow' } },

      { route: ['niceglobal'], moduleId: './posts-stream', nav: true, title: 'Global', settings: { icon: 'thumbs-down', iconBack: 'globe', group: 'explore', groupStart: true, stream: 'global' } },

      { route: ['profile/'], moduleId: './profile-router', title: 'Profile', name: 'profile' },
      { route: ['profile/user/:user_id'], moduleId: './profile-router', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile-router', title: 'Profile', name: 'randomprofile' },

      { route: ['trending'], moduleId: './explore', nav: true, title: 'Trending', settings: { icon: 'line-chart', iconBack: 'globe', group: 'explore', view: 'trending' } },
      { route: ['conversations'], moduleId: './explore', nav: true, title: 'Conversations', settings: { icon: 'comments', iconBack: 'globe', group: 'explore', view: 'conversations' } },
      { route: ['photos'], moduleId: './explore', nav: true, title: 'Photos', settings: { icon: 'camera-retro', iconBack: 'globe', group: 'explore', view: 'photos' } },
      { route: ['checkins'], moduleId: './explore', nav: true, title: 'Checkins', settings: { icon: 'map-marker', iconBack: 'globe', group: 'explore', view: 'checkins' } },

      { route: ['thread/:id'], moduleId: './thread', title: 'Thread', name: 'thread' },
      { route: ['hashtag/:hashtag'], moduleId: './posts-stream', title: 'Mentions', settings: { stream: 'hashtag' }, name: "hashtag" },

      { route: ['handle_oauth'], moduleId: './login/handle_oauth' },
      { route: ['login'], moduleId: './login/login', name: 'login' },
      { route: ['logout'], moduleId: './login/logout', name: 'logout' }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationService)
class HashRedirectStep {
  auth: AuthenticationService;
  constructor(auth: AuthenticationService) {
    this.auth = auth;
    console.log("Pipeline step");
  }

  run(routingContext: any, next: any) {
    if (window.location.hash) {
      console.log("Redirecting");
      return next.cancel(new Redirect('handle_oauth?' + window.location.hash.substring(1)));
    }

    return next();
  }
}