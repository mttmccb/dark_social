import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Conversations {

  constructor(api) {
    this.api = api;
    this.posts = [];
  }

  activate() {
    return this.loadConversations();
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