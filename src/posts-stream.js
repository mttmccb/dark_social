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
		this.setStreamParams(this.streammarker, this.hashtag, this.id);
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(false, this.streamParams));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(false, this.streamParams));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadStream(true, this.streamParams));
	}

	activate(params, query, route) {
		this.stream = route.config.settings.stream;
		this.setStreamParams(route.config.settings.streammarker, params.hashtag, params.id);
		return this.loadStream(false, this.streamParams);
	}

	setStreamParams(streammarker, hashtag, id) {
		this.streamParams = {
			streammarker: streammarker,
			hashtag: hashtag,
			id: id
		}
		this.streammarker = streammarker;
		this.hashtag = hashtag;
		this.id = id;
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
		this.loadMore();
	}

	loadStream(more, options) {
		return this.api.load(this.stream, { more: more, hashtag: options.hashtag, id: options.id }).then(posts => {
			if (options.streammarker === true) { this.posts.streamid = this.api.meta.marker.last_read_id; }
			this.posts.more = more;
			this.posts.addPosts(posts);
			if (this.stream === 'thread') { this.posts.threadPosts(); }
			//TODO: Load until id

		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
	}
}