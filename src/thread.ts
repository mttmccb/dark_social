import { autoinject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from './resources/messages';
import { PostsModel } from './models/posts-model';

@autoinject
export class Thread {
	//TODO: Combine into post-stream
	api: AdnAPI;
	ea: EventAggregator;
	posts: PostsModel;
	postPosted: any;
	refreshView: any;
	id: number;
	
	constructor(api: AdnAPI, ea: EventAggregator) {
		this.api = api;
		this.ea = ea;
		this.posts = new PostsModel(ea);
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(this.id));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(this.id));
	}

	activate(params: any, query: any, route: any) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream(id: number) {
		this.id = id;
		return this.api.load('thread', { count: 200, more: false, id: id }).then(posts => {
			this.posts.more = false;
			this.posts.addPosts(posts);
			this.posts.threadPosts();
		});
	}
}