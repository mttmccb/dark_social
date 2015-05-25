import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { PostClicks } from './resources/post-clicks';
import { Router } from 'aurelia-router'; 
import { activationStrategy } from 'aurelia-router';

@inject(AdnAPI, PostClicks, Router)
export class Profile {
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api, postclicks, router) {
    this.api = api;
    this.postclicks = postclicks;
    this.theRouter = router;
  }

  activate(params, query, route) {
    if (route.fragment === "profile/random") {
      this.user_id = " ";
    }
    return this.api.loadPosts(params.user_id || this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
      localStorage.setItem('user_id', this.user_id);
    });
  }

  loadMorePosts() {
    return this.api.loadPosts(this.user_id, true).then(data => {
      this.data = this.data.concat(data);
    });
  }

  getPost(id) {
    return this.api.loadPost(id).then(post => {
      this.post = post;
    });
  }

  loadRandomUserRoute() {
    this.theRouter.navigateToRoute("randomprofile");
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user || this.user_id });
  }

  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }

  toggleVisible(e) {
    this.showBanner = this.showBanner ? false : true;
  }
}