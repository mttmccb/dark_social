import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AdnAPI } from './services/adn-api';
import { PostPosted, RefreshView, RefreshedView, LoadMore, LoadUntilStreamMarker } from './resources/messages';
import { PostsModel } from './models/posts-model';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class PostsStream {
	private posts: PostsModel;
	private postPosted: any;
	private refreshView: any;
	private loadMore: any;
	private loadUntilStreamMarker: any;
	private streamOptions: StreamOptions;
	private stream: string;

	constructor(private api: AdnAPI, private ea: EventAggregator) {
		this.posts = new PostsModel(ea);
		this.streamOptions = new StreamOptions(false, '', 0, false);
		this.postPosted = ea.subscribe(PostPosted, () => this.loadStream(this.streamOptions, false));
		this.refreshView = ea.subscribe(RefreshView, () => this.loadStream(this.streamOptions, false));
		this.loadMore = ea.subscribe(LoadMore, () => this.loadStream(this.streamOptions, true));
		this.streamOptions.loadToStreamMarker = false;
		this.loadUntilStreamMarker = ea.subscribe(LoadUntilStreamMarker, () => this.loadStream(this.streamOptions, true));
	}

	activate(params: any, query: any, route: any) {
		this.stream = route.config.settings.stream;
		this.streamOptions.streammarker = route.config.settings.streammarker;
		this.streamOptions.hashtag = params.hashtag;
		this.streamOptions.id = params.id;
		this.streamOptions.loadToStreamMarker = false;
		return this.loadStream(this.streamOptions, false);
	}

	determineActivationStrategy() { return activationStrategy.replace; }

	deactivate() {
		this.postPosted();
		this.refreshView();
		this.loadMore();
		this.loadUntilStreamMarker();
	}

	loadStream(so: StreamOptions, more: boolean) {
		let apiOptions = {
			more: more,
			hashtag: so.hashtag,
			id: so.id
		};
		return this.api.load(this.stream, apiOptions)
			.then((posts: any) => {
				if (so.streammarker === true) { this.posts.streamid = this.api.meta.marker.last_read_id; }
				this.posts.more = more;
				this.posts.addPosts(posts);
				if (this.stream === 'thread') { this.posts.threadPosts(); }

			}).then(() => {
				if (so.loadToStreamMarker && this.api.meta.min_id > this.api.meta.marker.last_read_id) {
					this.loadStream(this.streamOptions, true);
				} else {
					this.ea.publish(new RefreshedView());
				}
			});
	}
}

export interface IStreamOptions {
	streammarker: boolean;
	hashtag: string;
	id: number;
	loadToStreamMarker: boolean;
}

export class StreamOptions implements IStreamOptions {
	public streammarker: boolean;
	public hashtag: string;
	public id: number;
	public loadToStreamMarker: boolean;

	constructor(streammarker: boolean, hashtag: string, id: number, loadToStreamMarker: boolean) {
		this.streammarker = streammarker;
		this.hashtag = hashtag;
		this.id = id;
		this.loadToStreamMarker = loadToStreamMarker;
	}
}