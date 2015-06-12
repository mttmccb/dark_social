import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';

@inject(AdnAPI, State)
export class Followers {
	
  constructor(api, state) {
    this.api = api;
    this.data = [];
    this.state = state;
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadFollowers(params.user_id || this.user_id);
  }

  refresh() {
    return this.loadFollowers(this.user_id);
  }

  loadFollowers(user) {
    return this.api.load('followers', { id: this.user_id, more: false }).then(data => {
      this.data = data;
    });
  }
}