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
  
  refresh() {
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
      localStorage.setItem('user_id', this.user_id);
    });    
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

  toggleVisible() {
    this.showBanner = !this.showBanner;
  }
}