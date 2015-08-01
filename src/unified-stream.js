import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, LoadMore, RefreshedView } from './resources/messages';
import { PostsModel } from './models/posts-model';

@inject(AdnAPI, EventAggregator)
export class UnifiedStream {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel();
		//postPosted and refreshView produce the same result by mean different things
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
			this.posts.streamid = this.api.meta.marker.last_read_id;
			this.posts.more = more;
			this.posts.addPosts(posts);
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
	}
}