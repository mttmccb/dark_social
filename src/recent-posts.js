import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class RecentPosts {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
	    this.postPosted = ea.subscribe(PostPosted, msg => this.loadLastPost());	
	}

	activate() {
		return this.loadLastPost();
	}
	
	deactivate() {
		this.postPosted();
	}

	loadLastPost() {
		return this.api.loadLastPost().then(data => {
			this.posts = data;
		});
	}
}