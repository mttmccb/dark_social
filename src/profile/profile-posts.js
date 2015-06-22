import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, State, EventAggregator)
export class ProfilePosts {

  constructor(api, state, ea) {
    this.api = api;
    this.data = [];
    this.state = state;
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPosts(this.user_id));
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

	deactivate() {
		this.postPosted();
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