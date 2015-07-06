import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore } from './resources/messages';
import { PostsModel } from './models/posts-model';

@inject(AdnAPI, EventAggregator)
export class PostsStream {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel();
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(false));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadStream(true));
	}

	activate(params, query, route) {
		this.stream = route.config.settings.stream;
		return this.loadStream(false);
	}
	
	deactivate() {
		this.postPosted();
		this.refreshView();
		this.loadMore();
	}

	loadStream(more) {
		return this.api.load(this.stream, { more: more }).then(posts => {
			this.posts.more = more;
			this.posts.addPosts(posts);
		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
	}
}