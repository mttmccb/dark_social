import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from 'resources/post-clicks';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, ApiStatus } from 'resources/messages';
import { State } from 'services/state';

@inject(PostClicks, AdnAPI, EventAggregator, State)
export class PostFrontCustomElement {
  @bindable post = null;

  constructor(postclicks, api, ea, state) {
    this.postclicks = postclicks;
    this.api = api;
    this.ea = ea;
    this.state = state;
    this.toggleReply = false;
    this.postReply = ea.subscribe(PostReply, msg => this.killReplies(msg.post));
  }

  toggleStar(post) {
    post.you_starred = !post.you_starred;
    this.api.toggleStar(post.id, post.you_starred);
  }

  toggleRepost(post) {
    post.you_reposted = !post.you_reposted;
    this.api.toggleRepost(post.id, post.you_reposted);
  }
  
	detached() {
		this.postReply();
	}

  postChanged(newValue) {
    this.thisPost = newValue;
  }

  killReplies(triggerPost) {
    if (triggerPost.id !== this.thisPost.id) {
      this.toggleReply = false;
    }
  }

  reply(post) {
    this.toggleReply = !this.toggleReply;
    this.ea.publish(new PostReply(post));
  }
}