import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { PostsModel } from '../models/posts-model';

@inject(AdnAPI, State)
export class Stars {
  api: AdnAPI;
  state: State;
  posts: PostsModel;
  loadMore: any;
  
  constructor(api: AdnAPI, state: State) {	
    this.api = api;
    this.state = state;
		this.posts = new PostsModel();
  }
  
  activate(params: any, query: any, route: any) {
    if (this.state.user_id===null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadStars(this.state.user_id);
  }

  refresh() {
    return this.loadStars(this.state.user_id);
  }

  loadStars(user_id: number) {
    return this.api.load('stars', { id: user_id, more: false }).then(data => {
			this.posts.addPosts(data);
    });
  }
}