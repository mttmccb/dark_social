import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Checkins {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadCheckins());	
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadCheckins());	
  }

  activate() {
    return this.loadCheckins();
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
  }  

  refresh() {
    return this.loadCheckins();
  }
  
  loadCheckins() {
    return this.api.load('checkins', { more: false }).then(posts => {
      this.posts = posts;
    });    
  }    
}