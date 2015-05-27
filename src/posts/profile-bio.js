import { bindable, inject } from 'aurelia-framework';
import { PostClicks } from '../resources/post-clicks';

@inject(PostClicks)
export class ProfileBioCustomElement {
  @bindable user = null;
  
  constructor(postclicks) {
    this.postclicks = postclicks;
  }  
}