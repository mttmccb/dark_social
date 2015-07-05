import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from './resources/messages';
import { ExploreModel } from './models/explore-model';

@inject(AdnAPI, EventAggregator)
export class Explore {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPosts(this.view, false));	    
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadPosts(this.view, false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadPosts(this.view, true));    	
  }

  activate(params, query, route) {
    this.view =route.config.settings.view;
    this.exploreModel = new ExploreModel(this.view);
    return this.loadPosts(this.view, false);
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
  }  

  refresh() {
    return this.loadPosts(false);
  }
  
  loadPosts(view, more) {
    return this.api.load(view, { more: more }).then(posts => {
			if (this.posts.length>0 && this.posts[0].id === posts[0].id) {
				this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
			} else {
				this.posts = more? this.posts.concat(posts) : posts;
			}
    		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
    
  }
}