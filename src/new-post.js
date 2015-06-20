import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class NewPosts {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
	    ea.subscribe(PostPosted, msg => this.loadLastPost());	
	}

	activate() {
		return this.loadLastPost();
	}

	loadLastPost() {
		return this.api.loadLastPost().then(data => {
			this.posts = data;
			this.lastPost = data[0];
			this.api.getAllUsers().then(data => {
				this.allUsers = data;
			});
		});
	}
}