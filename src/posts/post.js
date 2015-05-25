import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from '../resources/post-clicks';

@inject(PostClicks)
export class Post {
  @bindable post = null;
  @bindable includeAvatar = false;

  constructor(postclicks) {
    this.postclicks = postclicks;
  }

  toggleDetails(e, post) {
    post.hidePost = post.hidePost ? false : true;
  }
}
