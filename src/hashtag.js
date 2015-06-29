import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from 'resources/messages';
import { findIndexByKeyValue, treeify } from 'resources/utility';

@inject(AdnAPI, EventAggregator)
export class Hashtag {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
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
			this.posts = posts;
		});
	}
}