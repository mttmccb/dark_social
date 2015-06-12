import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from 'services/state';

@inject(AdnAPI, State)
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

  constructor(api, state) {
    this.api = api;
    this.user = [];
    this.state = state;
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
      this.user = data;
      this.state.user_id =this.user.username;
      this.user_id = this.user.username;
    });
  }

  toggleVisible() {
    this.showBanner = !this.showBanner;
  }
}