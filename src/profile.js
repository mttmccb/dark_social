import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';

@inject(AdnAPI)
export class Profile {

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api) {
    this.api = api;
    this.data = [];
  }

  activate(params, query, route) {
    if (route.fragment === "profile/random") {
      this.user_id = " ";
    }
    return this.loadPosts(params.user_id || this.user_id);
  }

  refresh() {
    return this.loadPosts(this.user_id);
  }

  loadPosts(user) {
     return this.api.loadPosts(user, false).then(data => {
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
    return this.api.load('post', { id: id }).then(post => {
      this.post = post;
    });
  }

  toggleVisible() {
    this.showBanner = !this.showBanner;
  }
}