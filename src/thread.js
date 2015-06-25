import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Thread {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream());
	}

	activate(params, query, route) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
	}

	loadStream(id) {
		return this.api.load('thread', { more: false, id: id }).then(posts => {
			this.posts = posts.reverse();
		});
	}
}