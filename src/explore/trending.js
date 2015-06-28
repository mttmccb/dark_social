import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, LoadMore } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Trending {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadTrending(false));	    
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadTrending(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadTrending(true));    	
  }

  activate() {
    return this.loadTrending(false);
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
  }  

  refresh() {
    return this.loadTrending(false);
  }
  
  loadTrending(more) {
    return this.api.load('trending', { more: more }).then(posts => {
			this.posts = more? this.posts.concat(posts) : posts;			
    });    
  }
}