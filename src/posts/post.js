import { bindable, inject } from 'aurelia-framework';

export class PostCustomElement {
  @bindable post = null;
  @bindable includeAvatar = false;

  constructor(postclicks) {
    this.postclicks = postclicks;
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}
