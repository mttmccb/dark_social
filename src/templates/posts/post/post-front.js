import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from 'resources/post-clicks';

@inject(PostClicks)
export class PostFrontCustomElement {
  @bindable post = null;
  
  constructor(postclicks) {
    this.postclicks = postclicks;
  }  
}