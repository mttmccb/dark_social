import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Checkins {

  constructor(api) {
    this.api = api;
    this.posts = [];
  }

  activate() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
    });
  }
  
  refresh() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
    });    
  }
}