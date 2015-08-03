import { bindable, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply } from '../../../resources/messages';

@autoinject
export class PostCustomElement {
  @bindable post : any = null;
  private replyTo: boolean;
  private postReply: any;
  private thisPost: any;
  
  constructor(private ea: EventAggregator) {
    this.replyTo = false;
    this.postReply = ea.subscribe(PostReply, (msg: any) => this.setupReply(msg.post));
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