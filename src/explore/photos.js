import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, LoadMore } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Photos {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPhotos(false));
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadPhotos(false));	        
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadPhotos(true));
  }

  activate() {
    return this.loadPhotos(false);
  }

  deactivate() {
    this.postPosted();
    this.refreshView();
  }
    
  refresh() {
    return this.loadPhotos(false);
  }
  
  loadPhotos(more) {
    return this.api.load('photos', { more: more }).then(posts => {
			this.posts = more? this.posts.concat(posts) : posts;			
    });    
  }
}