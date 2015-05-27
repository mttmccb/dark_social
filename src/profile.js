import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { Router } from 'aurelia-router'; 
import { activationStrategy } from 'aurelia-router';

@inject(AdnAPI, Router)
export class Profile {
  
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api, router) {
    this.api = api;
    this.theRouter = router;
    this.numberOfTopMentions = 5;
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

  moreMentions() {
    this.numberOfTopMentions += 5;
  }

  toggleVisible(e) {
    this.showBanner = this.showBanner ? false : true;
  }
}