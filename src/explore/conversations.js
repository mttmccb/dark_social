import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Conversations {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadConversations());	
  }

  activate() {
    return this.loadConversations();
  }
  
  deactivate() {
    this.postPosted();
  }  

  refresh() {
    return this.loadConversations();
  }
  
  loadConversations() {
    return this.api.load('conversations', { more: false }).then(posts => {
      this.posts = posts;
    });    
  }  
}