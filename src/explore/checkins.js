import { AdnAPI } from '../adn-api';
import { PostClicks } from '../resources/post-clicks';

export class Checkins {
  static inject() { return [AdnAPI, PostClicks]; }

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
    if (post.hidePost) {
      post.hidePost = false;
    } else {
      post.hidePost = true;
    }
  }
}