import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { activationStrategy } from 'aurelia-router';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

@inject(AdnAPI)
export class Profile {

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(api) {
    this.api = api;

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

  attached() {
    console.log('view is attached');
    this.createMasonry();
  }

  createMasonry() {
    var container = document.querySelector('#posts');
    
    imagesLoaded( container, function() {
      var msnry = new Masonry(container, {
        columnWidth: ".post",
        itemSelector: '.post',
        percentPosition: true,
        gutter: 10
      });
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

  toggleVisible(e) {
    this.showBanner = this.showBanner ? false : true;
  }
}