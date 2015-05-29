import { bindable, inject } from 'aurelia-framework';

export class PostCustomElement {
  @bindable post = null;

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}
