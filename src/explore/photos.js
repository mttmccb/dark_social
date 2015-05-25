import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import { PostClicks } from '../resources/post-clicks';

@inject(AdnAPI, PostClicks)
export class Trending {
  constructor(api, postclicks) {
    this.api = api;
    this.postclicks = postclicks;
    this.posts = [];
  }

  activate() {
    return this.api.loadPhotos().then(posts => {
      this.posts = posts;
    });
  }

  toggleDetails(e, post) {
    if (post.hidePost) {
      post.hidePost = false;
    } else {
      post.hidePost = true;
    }
  }
}