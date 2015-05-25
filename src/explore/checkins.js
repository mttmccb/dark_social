import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import { PostClicks } from '../resources/post-clicks';

@inject(AdnAPI, PostClicks)
export class Checkins {
  constructor(api, postclicks) {
    this.api = api;
    this.postclicks = postclicks;
    this.posts = [];
  }

  activate() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
    });
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}