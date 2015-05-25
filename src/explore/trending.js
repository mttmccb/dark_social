import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import { PostClicks } from '../resources/post-clicks';
import { Router } from 'aurelia-router';

@inject(AdnAPI, PostClicks, Router)
export class Trending {

  constructor(api, postclicks, router) {
    this.api = api;
    this.postclicks = postclicks;
    this.posts = [];
    this.theRouter = router;
  }

  activate() {
    return this.api.loadTrendingPosts().then(posts => {
      this.posts = posts;
    });
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}