import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Photos {

  constructor(api) {
    this.api = api;
    this.posts = [];
  }

  activate() {
    return this.loadPhotos();
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