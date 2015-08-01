import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from './resources/messages';
import { PostsModel } from './models/posts-model';

@inject(AdnAPI, EventAggregator)
export class Thread {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel();
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(this.id));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(this.id));
	}

	activate(params, query, route) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream(id) {
		this.id = id;
		return this.api.load('thread', { count: 200, more: false, id: id }).then(posts => {
			this.posts.more = false;
			this.posts.addPosts(posts);
			this.posts.threadPosts();
		});
	}
}