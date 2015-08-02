import { autoinject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore } from './resources/messages';
import { PostsModel } from './models/posts-model';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class PostsStream {
	posts: PostsModel;
	postPosted: any;
	refreshView: any;
	loadMore: any;
	streammarker: number;
	hashtag: string;
	id: number;
	streamParams: any;
	stream: string;
	constructor(private api: AdnAPI, private ea: EventAggregator) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel(ea);
		this.setStreamParams(this.streammarker, this.hashtag, this.id);
		this.postPosted = ea.subscribe(PostPosted, (msg: any) => this.loadStream(false, this.streamParams));
		this.refreshView = ea.subscribe(RefreshView, (msg: any) => this.loadStream(false, this.streamParams));
		this.loadMore = ea.subscribe(LoadMore, (msg: any) => this.loadStream(true, this.streamParams));
	}

	activate(params: any, query: any, route: any) {
		this.stream = route.config.settings.stream;
		this.setStreamParams(route.config.settings.streammarker, params.hashtag, params.id);
		return this.loadStream(false, this.streamParams);
	}

	determineActivationStrategy() {
		return activationStrategy.replace;
	}
	
	setStreamParams(streammarker: number, hashtag: string, id: number) {
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

	loadStream(more: boolean, options: any) {
		return this.api.load(this.stream, { more: more, hashtag: options.hashtag, id: options.id }).then((posts: any) => {
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