import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';

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
}