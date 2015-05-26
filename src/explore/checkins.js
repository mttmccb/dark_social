import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';

@inject(AdnAPI)
export class Checkins {
  
  constructor(api, postclicks, router) {
    this.api = api;
    this.posts = [];
  }
  
  activate() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
    });
  }
}