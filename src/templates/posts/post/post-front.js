import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from 'resources/post-clicks';
import { AdnAPI } from 'services/adn-api';

@inject(PostClicks, AdnAPI)
export class PostFrontCustomElement {
  @bindable post = null;
  
  constructor(postclicks, api) {
    this.postclicks = postclicks;
    this.api = api;
    this.user_id = localStorage.getItem("user_id");
  }  
  
  toggleStar(post) {
    post.you_starred = !post.you_starred;
    this.api.toggleStar(post.id, post.you_starred);
  }
  
  toggleRepost(post) {
    post.you_reposted = !post.you_reposted;
    this.api.toggleRepost(post.id, post.you_reposted);
  }  
}