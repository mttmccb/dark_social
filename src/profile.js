import { computedFrom, inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue, sumKey } from './resources/utility';
import { PostClicks } from './resources/post-clicks';

@inject(AdnAPI, PostClicks)
export class Profile {
  constructor(api, postclicks) {
    this.api = api;
    this.postclicks = postclicks;
  }

  loadUser(user) {
    return this.api.loadPosts(user || this.user_id).then(data => {
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

  activate(params) {
    return this.loadUser(params.user_id || this.user_id);
  }

  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }

  toggleDetails(e, post) {
    post.hidePost ? false : true;
  }

  toggleVisible(e) {
    this.showBanner ? false : true;
  }
}