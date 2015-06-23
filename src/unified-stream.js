import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class UnifiedStream {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream());
	}

	activate() {
		return this.loadStream();
	}

	deactivate() {
		this.postPosted();
	}

	loadStream() {
		return this.api.load('unified', { more: false }).then(posts => {
			this.posts = posts;
		});
	}
}