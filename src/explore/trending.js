import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Trending {

  constructor(api) {
    this.api = api;
    this.posts = [];
  }

  activate() {
    return this.api.load('trending', { more: false }).then(posts => {
      this.posts = posts;
    });
  }

  refresh() {
    return this.api.load('trending', { more: false }).then(posts => {
      this.posts = posts;
    });
  }
}