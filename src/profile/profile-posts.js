import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';

@inject(AdnAPI, State)
export class ProfilePosts {
	
  constructor(api, state) {
    this.api = api;
    this.data = [];
    this.state = state;
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadPosts(params.user_id || this.user_id);
  }

  refresh() {
    return this.loadPosts(this.user_id);
  }

  loadPosts(user) {
    return this.api.loadPosts(user, false).then(data => {
      this.data = data;
    });
  }

  loadMorePosts() {
    return this.api.loadPosts(this.user_id, true).then(data => {
      this.data = this.data.concat(data);
    });
  }

  getPost(id) {
    return this.api.load('post', { id: id }).then(post => {
      this.post = post;
    });
  }
}