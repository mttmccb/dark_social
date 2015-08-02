import { bindable, autoinject } from 'aurelia-framework';
import { PostClicks } from '../../../resources/post-clicks';
import { AdnAPI } from '../../../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, ApiStatus, StreamMarkerUpdated } from '../../../resources/messages';
import { State } from '../../../services/state';
import { Router } from 'aurelia-router';

@autoinject
export class PostFrontCustomElement {
  @bindable post: any = null;
  theRouter: Router;
  api: AdnAPI;
  private ea: EventAggregator;
  state: State;
  postclicks: PostClicks;
  toggleReply: boolean;
  postReply: any;
  streamMarker: any;
  thisPost: any;
  constructor(postclicks : PostClicks, api: AdnAPI, ea: EventAggregator, state: State, router: Router) {
    this.postclicks = postclicks;
    this.api = api;
    this.ea = ea;
    this.state = state;
    this.theRouter = router;
    this.toggleReply = false;
    this.postReply = ea.subscribe(PostReply, msg => this.killReplies(msg.post));
    this.streamMarker = ea.subscribe(StreamMarkerUpdated, msg => this.updateStreamMarker(msg.id));
  }

  toggleStar(post: any) {
    post.you_starred = !post.you_starred;
    this.api.toggleStar(post.id, post.you_starred);
  }

  toggleRepost(post: any) {
    post.you_reposted = !post.you_reposted;
    this.api.toggleRepost(post.id, post.you_reposted);
  }

  detached() {
    this.postReply();
    this.streamMarker();
  }

  postChanged(newValue: any) {
    this.thisPost = newValue;
  }

  killReplies(triggerPost: any) {
    if (triggerPost.id !== this.thisPost.data.id) {
      this.toggleReply = false;
    }
  }

  reply(post: any) {
    this.toggleReply = !this.toggleReply;
    this.ea.publish(new PostReply(post));
  }

  thread(post: any) {
    this.theRouter.navigateToRoute("thread", { id: post.id });
  }

  updateStreamMarker(id: number) {
    console.log(id);
    this.thisPost.streamid = id;
  }

  setStreamMarker(e: Event, post: any) {
    return this.api.setMarker(post.id + 1).then(() => {
      if (post.id) { this.ea.publish(new StreamMarkerUpdated(post.id + 1)); }
    });
  }
}