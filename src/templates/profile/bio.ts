import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from '../../resources/post-clicks';

@inject(PostClicks)
export class BioCustomElement {
  @bindable user: any = null;
  postclicks: PostClicks
  constructor(postclicks: PostClicks) {
    this.postclicks = postclicks;
  }  
}