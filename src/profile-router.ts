import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { activationStrategy, Router } from 'aurelia-router';
import { State } from './services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, GetRandomUser } from './resources/messages';

@inject(AdnAPI, State, EventAggregator, Router)
export class ProfileRouter {
  api: AdnAPI;
  ea: EventAggregator;
  state: State;
  user: any;
  postPosted: any;
  router: Router;
  user_id: number;
  showBanner: boolean;
  configureRouter(config: any, router:Router) {
    config.map([
      //{ route: ['', 'profile'], name: 'profile', moduleId: './profile', nav: true, title: 'Profile' },
      { route: 'following', name: 'following/:user_id', moduleId: './profile/following', title: 'Following', nav: true },
      { route: 'followers', name: 'followers/:user_id', moduleId: './profile/followers', title: 'Followers', nav: true },
      { route: ['', 'posts'], name: 'posts/:user_id', moduleId: './profile/profile-posts', title: 'Posts', nav: true },
      { route: 'stars', name: 'stars/:user_id', moduleId: './profile/stars', title: 'Stars', nav: true }
    ]);

    this.router = router;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api: AdnAPI, state: State, ea: EventAggregator) {
    this.api = api;
    this.user = [];
    this.state = state;
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadUser(this.user_id));
  }

  activate(params: any, query: any, route: any) {
    if (this.state.user_id===null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadUser(this.state.user_id);
  }

  refresh() {
    return this.loadUser(this.user_id);
  }

  deactivate() {
    this.postPosted();
  }

  loadUser(id: number) {
    return this.api.loadProfile(id, false).then(data => {
      this.user = data;
      this.state.user_id = this.user.id;
      this.user_id = this.user.id;
    });
  }

  toggleVisible() {
    this.showBanner = !this.showBanner;
  }

  //TODO: Move into API? not really specific to profiles
  toggleFollow(user: any, e: Event) {
    e.preventDefault();
    user.you_follow = !user.you_follow;
    this.api.toggleFollow(user, user.you_follow);
  }

  toggleMute(user: any, e: Event) {
    e.preventDefault();
    user.you_muted = !user.you_muted;
    this.api.toggleMute(user, user.you_muted);
  }

  toggleBlock(user: any, e: Event) {
    e.preventDefault();
    user.you_blocked = !user.you_blocked;
    this.api.toggleBlock(user, user.you_blocked);
  }
}