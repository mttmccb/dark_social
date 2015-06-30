import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, LoadMore, ApiStatus } from 'resources/messages';

@inject(AdnAPI, State, EventAggregator)
export class ProfilePosts {

  constructor(api, state, ea) {
    this.api = api;
    this.data = [];
    this.state = state;
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPosts({ user: this.user_id, more: false }));
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadPosts({ user: this.user_id, more: false }));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadPosts({ user: this.user_id, more: true }));
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadPosts(params.user_id || this.user_id);
  }

  refresh() {
    return this.loadPosts(this.user_id);
  }

  loadPosts(params) {
    return this.api.loadPosts(params.user, false).then(data => {

			if (this.data.length > 0 && this.data[0].id === data[0].id) {
				this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
			} else {
				this.data = params.more ? this.data.concat(data) : data;
			}
    		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
  }

	deactivate() {
		this.postPosted();
		this.refreshView();
    this.loadMore();
	}

  getPost(id) {
    return this.api.load('post', { id: id }).then(post => {
      this.post = post;
    });
  }
}