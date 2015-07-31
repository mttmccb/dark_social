import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from '../../../resources/post-clicks';
import { AdnAPI } from '../../../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, ApiStatus, StreamMarkerUpdated } from '../../../resources/messages';
import { State } from '../../../services/state';
import { Router } from 'aurelia-router';

@inject(PostClicks, AdnAPI, EventAggregator, State, Router)
export class PostFrontCustomElement {
  @bindable post = null;

  constructor(postclicks, api, ea, state, router) {
    this.postclicks = postclicks;
    this.api = api;
    this.ea = ea;
    this.state = state;
    this.theRouter = router;
    this.toggleReply = false;
    this.postReply = ea.subscribe(PostReply, msg => this.killReplies(msg.post));
    this.streamMarker = ea.subscribe(StreamMarkerUpdated, msg => this.updateStreamMarker(msg.id));
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
    this.streamMarker();
  }

  postChanged(newValue) {
    this.thisPost = newValue;
  }

  killReplies(triggerPost) {
    if (triggerPost.id !== this.thisPost.data.id) {
      this.toggleReply = false;
    }
  }

  reply(post) {
    this.toggleReply = !this.toggleReply;
    this.ea.publish(new PostReply(post));
  }

  thread(post) {
    this.theRouter.navigateToRoute("thread", { id: post.id });
  }

  updateStreamMarker(id) {
    console.log(id);
    this.thisPost.streamid = id;
  }

  setStreamMarker(e, post) {
    return this.api.setMarker(post.id + 1).then(() => {
      if (post.id) { this.ea.publish(new StreamMarkerUpdated(post.id + 1)); }
    });
  }
}