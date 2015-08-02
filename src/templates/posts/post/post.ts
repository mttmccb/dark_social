import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply } from '../../../resources/messages';

@inject(EventAggregator)
export class PostCustomElement {
  @bindable post : any = null;
  ea: EventAggregator;
  replyTo: boolean;
  postReply: any;
  thisPost: any;
  constructor(ea: EventAggregator) {
    this.ea = ea;
    this.replyTo = false;
    this.postReply = ea.subscribe(PostReply, msg => this.setupReply(msg.post));
  }

  postChanged(newValue: any) {
    this.thisPost = newValue;
  }
  
  detached() {
    this.postReply();
  }

  setupReply(triggerPost: any) {
    this.replyTo = this.replyTo ? false : triggerPost.id === this.thisPost.data.id;
  }

  toggleDetails(e: Event, post: any) {
    post.hidePost = post.hidePost ? false : true;
  }
}