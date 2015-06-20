import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from 'resources/post-clicks';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, ApiStatus } from 'resources/messages';

@inject(PostClicks, AdnAPI, EventAggregator)
export class PostFrontCustomElement {
  @bindable post = null;
  
  constructor(postclicks, api, ea) {
    this.postclicks = postclicks;
    this.api = api;
    this.ea = ea;
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
  
  reply(post) {
    this.ea.publish(new ApiStatus('Setting Up Reply', { status: 'info'}));
    this.ea.publish(new PostReply(post));    
  }  
}