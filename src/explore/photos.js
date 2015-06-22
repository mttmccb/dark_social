import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Photos {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadPhotos());	    
  }

  activate() {
    return this.loadPhotos();
  }

  deactivate() {
    this.postPosted();
  }
    
  refresh() {
    return this.loadPhotos();
  }
  
  loadPhotos() {
    return this.api.load('photos', { more: false }).then(posts => {
      this.posts = posts;
    });    
  }
}