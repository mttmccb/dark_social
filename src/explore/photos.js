import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';

@inject(AdnAPI)
export class Trending {
  
  constructor(api) {
    this.api = api;
    this.posts = [];
  }
  
  activate() {
    return this.api.loadPhotos().then(posts => {
      this.posts = posts;
    });
  }
}