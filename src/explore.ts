import { autoinject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from './resources/messages';
import { ExploreModel } from './models/explore-model';
import { PostsModel } from './models/posts-model';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class Explore {
  private posts: PostsModel;
  private postPosted: any;
  private refreshView: any;
  private loadMore: any;
  private view: string;
  private exploreModel: ExploreModel;
  
  constructor(private api: AdnAPI, private ea: EventAggregator) {
    this.api = api;
    this.ea = ea;
		this.posts = new PostsModel(ea);
    this.postPosted = ea.subscribe(PostPosted, (msg: any) => this.loadPosts(false));	    
    this.refreshView = ea.subscribe(RefreshView, (msg: any) => this.loadPosts(false));
		this.loadMore = ea.subscribe(LoadMore, (msg: any) => this.loadPosts(true));    	
  }

  activate(params: any, query: any, route: any) {
    this.view = route.config.settings.view;
    this.exploreModel = new ExploreModel(this.view);
    return this.loadPosts(false);
  }
  
	determineActivationStrategy() {
		return activationStrategy.replace;
	}

  deactivate() {
    this.postPosted();
    this.refreshView();
    this.loadMore();
  }  

  refresh() {
    return this.loadPosts(false);
  }
  
  loadPosts(more: boolean) {
    return this.api.load(this.view, { more: more }).then((posts: any) => {

    		this.posts.more = more;
    		this.posts.addPosts(posts);
    	}).then(() => {
    		this.ea.publish(new RefreshedView());
    	});
  }
}