import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from './resources/messages';

@inject(AdnAPI, EventAggregator)
export class NiceGlobal {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = [];
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(false));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadStream(true));
	}

	activate() {
		return this.loadStream();
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream(more) {
		return this.api.load('global', { more: more }).then(posts => {
			if (this.posts.length > 0 && this.posts[0].id === posts[0].id) {
				this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
			} else {
				this.posts = more ? this.posts.concat(posts) : posts;
			}
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});

	}
}