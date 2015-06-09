import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Checkins {

  constructor(api) {
    this.api = api;
    this.posts = [];
  }

  activate() {
    return this.loadCheckins();
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