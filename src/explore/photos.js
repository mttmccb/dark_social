import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Photos {

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