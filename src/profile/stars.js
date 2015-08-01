import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { PostsModel } from '../models/posts-model';

@inject(AdnAPI, State)
export class Stars {
	
  constructor(api, state) {
    this.api = api;
    this.data = [];
    this.state = state;
		this.posts = new PostsModel();
  }
  
  activate(params, query, route) {
    if (this.state.user_id===null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadStars(this.state.user_id);
  }

  refresh() {
    return this.loadStars();
  }

  loadStars(user_id) {
    return this.api.load('stars', { id: user_id, more: false }).then(data => {
			this.posts.addPosts(data);
    });
  }
}