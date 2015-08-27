import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AdnAPI } from './services/adn-api';
import { PostPosted, RefreshView } from './resources/messages';
import { PostsModel } from './models/posts-model';

@autoinject
export class Thread {
	//TODO: Combine into post-stream
	// Main problem is that loading a thread required posts to loaded in a different order, currently they aren't
	// instead 200 posts are loaded, for most conversations this is fine but it will break for larger ones.
	// The better option would be to load the first 20 in the conversation so the load/more and potentially load 
	// to a particular post, e.g. the latest would be possible.
	private posts: PostsModel;
	private postPosted: any;
	private refreshView: any;
	
	constructor(private api: AdnAPI, private ea: EventAggregator, private id: number) {
		this.posts = new PostsModel(ea);
		this.postPosted = ea.subscribe(PostPosted, () => this.loadStream(this.id));
		this.refreshView = ea.subscribe(RefreshView, () => this.loadStream(this.id));
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