import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply } from '../../../resources/messages';

@inject(EventAggregator)
export class PostCustomElement {
  @bindable post = null;

  constructor(ea) {
    this.ea = ea;
    this.replyTo = false;
    this.postReply = ea.subscribe(PostReply, msg => this.setupReply(msg.post));
  }

  postChanged(newValue) {
    this.thisPost = newValue;
  }
  
  detached() {
    this.postReply();
  }

  setupReply(triggerPost) {
    if (this.replyTo) {
      this.replyTo = false;
    } else {
      this.replyTo = triggerPost.id === this.thisPost.data.id;
    }
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}
