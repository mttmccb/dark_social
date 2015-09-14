import { bindable, autoinject } from 'aurelia-framework';
import { PostClicks } from '../../resources/post-clicks';
import { AdnAPI } from '../../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, ApiStatus, StreamMarkerUpdated } from '../../resources/messages';
import { State } from '../../services/state';
import { Router } from 'aurelia-router';

@autoinject
export class PostFrontCustomElement {
  @bindable post: any;
  private postReply: any;
  private streamMarker: any;
  private thisPost: any;

  constructor(private postclicks: PostClicks, private api: AdnAPI, private ea: EventAggregator,
    private state: State, private router: Router, private toggleReply: boolean) {
    this.toggleReply = false;
    this.postReply = ea.subscribe(PostReply, (msg: any) => this.killReplies(msg.post));
    this.streamMarker = ea.subscribe(StreamMarkerUpdated, (msg: any) => this.updateStreamMarker(msg.id));
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

  postChanged(newValue: any) { this.thisPost = newValue; }

  killReplies(triggerPost: any) {
    if (triggerPost.id !== this.thisPost.data.id) { this.toggleReply = false; }
  }

  reply(post: any) {
    this.toggleReply = !this.toggleReply;
    this.ea.publish(new PostReply(post));
  }

  thread(post: any) { this.router.navigateToRoute("thread", { id: post.id }); }

  updateStreamMarker(id: number) { this.thisPost.streamid = id; }

  setStreamMarker(e: Event, post: any) {
    return this.api.setMarker(post.id + 1)
      .then(() => {
        if (post.id) { this.ea.publish(new StreamMarkerUpdated(post.id + 1)); }
      });
  }
}