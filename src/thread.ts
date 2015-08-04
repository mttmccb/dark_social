import { autoinject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from './resources/messages';
import { PostsModel } from './models/posts-model';

@autoinject
export class Thread {
	//TODO: Combine into post-stream
	private posts: PostsModel;
	private postPosted: any;
	private refreshView: any;
	
	constructor(private api: AdnAPI, private ea: EventAggregator, private id: number) {
		this.posts = new PostsModel(ea);
		this.postPosted = ea.subscribe(PostPosted, (msg: any) => this.loadStream(this.id));
		this.refreshView = ea.subscribe(RefreshView, (msg: any) => this.loadStream(this.id));
	}

	activate = (params: any, query: any, route: any) => { this.loadStream(params.id) };	

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream(id: number) {
		this.id = id;
		return this.api.load('thread', { count: 200, more: false, id: id }).then((posts: any) => {
			this.posts.more = false;
			this.posts.addPosts(posts);
			this.posts.threadPosts();
		});
	}
}