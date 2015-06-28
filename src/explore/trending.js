import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Trending {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadTrending());	    
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadTrending());	
  }

  activate() {
    return this.loadTrending();
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
  }  

  refresh() {
    return this.loadTrending();
  }
  
  loadTrending() {
    return this.api.load('trending', { more: false }).then(posts => {
      this.posts = posts;
    });    
  }
}