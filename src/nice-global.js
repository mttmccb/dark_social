import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class NiceGlobal {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream());
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream());
	}

	activate() {
		return this.loadStream();
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream() {
		return this.api.load('global', { more: false }).then(posts => {
			this.posts = posts;
		});
	}
}