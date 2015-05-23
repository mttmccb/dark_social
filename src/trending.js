import { computedFrom, inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { Router } from 'aurelia-router';

export class Trending {
	static inject() { return [AdnAPI, Router]; }

  constructor(api, router) {
    this.api = api;
    this.theRouter = router;
    this.posts = [];
  }

  activate() {
    return this.api.loadTrendingPosts().then(posts => {
      this.posts = posts;
    });
  }
  
  openProfile(name) {
      localStorage.setItem('user_id',name);
			this.theRouter.navigate("profile");    
  }

  postClicks(e) {
    let node = e.target;
    let nodeType = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName = node.getAttribute('data-mention-name');      
      this.openProfile(mentionName);

    } else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
      window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
    }
    return true;
  }
  
  toggleDetails(e, post) {
    if (post.hidePost) {
      post.hidePost = false;
    } else {
      post.hidePost = true;      
    }
  }
}