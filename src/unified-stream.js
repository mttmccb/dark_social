import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, LoadMore, RefreshedView, ApiStatus } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class UnifiedStream {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = [];
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(false));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadStream(true));
	}

	activate() {
		return this.loadStream(false);
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
		this.loadMore();
	}

	loadStream(more) {
		return this.api.load('unified', { more: more }).then(posts => {
			this.streamid = this.api.meta.marker.last_read_id;	
			if (this.posts.length>0 && this.posts[0].id === posts[0].id) {
				this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
			} else {
				this.posts = more? this.posts.concat(posts) : posts;				
			}
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
	}

}