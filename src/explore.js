import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from './resources/messages';
import { ExploreModel } from './models/explore-model';
import { PostsModel } from './models/posts-model';

@inject(AdnAPI, EventAggregator)
export class Explore {

  constructor(api, ea) {
    this.api = api;
    this.ea = ea;
		this.posts = new PostsModel();
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPosts(false));	    
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadPosts(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadPosts(true));    	
  }

  activate(params, query, route) {
    this.view = route.config.settings.view;
    this.exploreModel = new ExploreModel(this.view);
    return this.loadPosts(false);
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
    this.loadMore();
  }  

  refresh() {
    return this.loadPosts(false);
  }
  
  loadPosts(more) {
    return this.api.load(this.view, { more: more }).then(posts => {

    		this.posts.more = more;
    		this.posts.addPosts(posts);
    	}).then(() => {
    		this.ea.publish(new RefreshedView());
    	});
  }
}