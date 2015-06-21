import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from 'services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, State, EventAggregator)
export class ProfileRouter {

	configureRouter(config, router) {
		config.map([
			//{ route: ['', 'profile'], name: 'profile', moduleId: './profile', nav: true, title: 'Profile' },
			{ route: 'following', name: 'following', moduleId: './profile/following', title:'Following', nav: true },
			{ route: 'followers', name: 'followers', moduleId: './profile/followers', title:'Followers', nav: true },
			{ route: ['','posts'], name: 'posts', moduleId: './profile/profile-posts', title:'Posts', nav: true },
			{ route: 'stars', name: 'stars', moduleId: './profile/stars', title:'Stars', nav: true }
		]);

		this.router = router;
	}

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api, state, ea) {
    this.api = api;
    this.user = [];
    this.state = state;
    this.ea = ea;
    ea.subscribe(PostPosted, msg => this.loadUser(this.user_id));	
  }

  activate(params, query, route) {
    if (route.fragment === "profile/random") {
      this.user_id = " ";
      this.state.user_id = " ";
    }
    if (params.user_id) {
      this.state.user_id = params.user_id;
    }
    return this.loadUser(params.user_id || this.state.user_id);
  }

  refresh() {
    return this.loadUser(this.user_id);
  }
  
  loadUser(user) {
    return this.api.loadProfile(user).then(data => {
      console.log(data);
      this.user = data;
      this.state.user_id =this.user.id;
      this.user_id = this.user.id;
    });
  }

  toggleVisible() {
    this.showBanner = !this.showBanner;
  }
  
  toggleFollow(user, e) {
    e.preventDefault();
    user.you_follow = !user.you_follow;
    this.api.toggleFollow(user.id, user.you_follow);
  }

  toggleMute(user, e) {
    e.preventDefault();
    user.you_muted = !user.you_muted;
    this.api.toggleMute(user.id, user.you_muted);
  }

  toggleBlock(user, e) {
    e.preventDefault();
    user.you_blocked = !user.you_blocked;
    this.api.toggleBlock(user.id, user.you_blocked);
  }
}