import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from '../resources/messages';
import { PostsModel } from '../models/posts-model';

@inject(AdnAPI, State, EventAggregator)
export class ProfilePosts {

  constructor(api, state, ea) {
    this.api = api;
    this.data = [];
    this.state = state;
    this.ea = ea;
		this.posts = new PostsModel();
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPosts({ user: this.user_id, more: false }));
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadPosts({ user: this.user_id, more: false }));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadPosts({ user: this.user_id, more: true }));
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadPosts({ user: this.state.user_id });
  }

  refresh() {
    return this.loadPosts({ user: this.user_id });
  }

  loadPosts(params) {
    return this.api.loadPosts(params.user, false).then(data => {
			this.posts.avatar = false;
			this.posts.addPosts(data);
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
  }

	deactivate() {
		this.postPosted();
		this.refreshView();
    this.loadMore();
	}
}