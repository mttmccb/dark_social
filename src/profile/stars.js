import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';

@inject(AdnAPI, State)
export class Stars {
	
  constructor(api, state) {
    this.api = api;
    this.data = [];
    this.state = state;
  }
  
  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadStars();
  }

  refresh() {
    return this.loadStars();
  }

  loadStars() {
    return this.api.load('stars', { id: this.user_id, more: false }).then(data => {
      this.data = data;
    });
  }

  getPost(id) {
    return this.api.load('post', { id: id }).then(post => {
      this.post = post;
    });
  }
}