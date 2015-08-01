import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView } from './resources/messages';
import { findIndexByKeyValue, treeify } from './resources/utility';
import { PostsModel } from './models/posts-model';

@inject(AdnAPI, EventAggregator)
export class Hashtag {
	//TODO: Combine hashtag into post-stream
	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel();
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadHashtag(this.hashtag));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadHashtag(this.hashtag));
	}

	activate(params, query, route) {
		return this.loadHashtag(params.hashtag);
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadHashtag(hashtag) {
		this.hashtag = hashtag;
		return this.api.load('hashtag', { more: false, hashtag: hashtag }).then(posts => {
			this.posts.addPosts(posts);
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
	}
}