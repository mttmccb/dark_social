import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AdnAPI } from './services/adn-api';
import { PostPosted, RefreshView, RefreshedView, LoadMore, LoadUntilStreamMarker } from './resources/messages';
import { PostsModel } from './models/posts-model';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class PostsStream {
	// This smells a bit, especially the way the settings are done
	private posts: PostsModel;
	private postPosted: any;
	private refreshView: any;
	private loadMore: any;
	private loadUntilStreamMarker: any;
	private streammarker: boolean;
	private hashtag: string;
	private id: number;
	private streamParams: any;
	private stream: string;

	constructor(private api: AdnAPI, private ea: EventAggregator) {
		this.posts = new PostsModel(ea);
		let streamParams = { streammarker: this.streammarker, hashtag: this.hashtag, id: this.id, loadToStreamMarker: false };
		this.postPosted = ea.subscribe(PostPosted, (msg: any) => this.loadStream(false, streamParams));
		this.refreshView = ea.subscribe(RefreshView, (msg: any) => this.loadStream(false, streamParams));
		this.loadMore = ea.subscribe(LoadMore, (msg: any) => this.loadStream(true, streamParams));
		this.loadUntilStreamMarker = ea.subscribe(LoadUntilStreamMarker, (msg: any) => this.loadStream(true, { streammarker: this.streammarker, hashtag: this.hashtag, id: this.id, loadToStreamMarker: true }));
	}

	activate(params: any, query: any, route: any) {
		this.stream = route.config.settings.stream;
		return this.loadStream(false, { streammarker: route.config.settings.streammarker, hashtag: params.hashtag, id: params.id, loadToStreamMarker: false });
	}

	determineActivationStrategy() { return activationStrategy.replace; }

	deactivate() {
		this.postPosted();
		this.refreshView();
		this.loadMore();
		this.loadUntilStreamMarker();
	}

	loadStream(more: boolean, options: { streammarker: boolean, hashtag: string, id: number, loadToStreamMarker: boolean }) {
		return this.api.load(this.stream, { more: more, hashtag: options.hashtag, id: options.id }).then((posts: any) => {
			if (options.streammarker === true) { this.posts.streamid = this.api.meta.marker.last_read_id; }
			this.posts.more = more;
			this.posts.addPosts(posts);
			if (this.stream === 'thread') { this.posts.threadPosts(); }
			this.streammarker = options.streammarker;
			this.hashtag = options.hashtag;
			this.id = options.id;
			
		}).then(() => {
			(options.loadToStreamMarker && this.api.meta.min_id>this.api.meta.marker.last_read_id) ?
				this.loadStream(true, { streammarker: this.streammarker, hashtag: this.hashtag, id: this.id, loadToStreamMarker: true }) :
				this.ea.publish(new RefreshedView());				
		});
	}
}