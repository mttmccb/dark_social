import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';

@inject(AdnAPI)
export class Conversations {
  
  constructor(api) {
    this.api = api;
    this.posts = [];
  }
  
  activate() {
    return this.api.loadConversations().then(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }
}