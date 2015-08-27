import { autoinject, bindable } from 'aurelia-framework';
import { PostClicks } from '../../resources/post-clicks';

@autoinject
export class BioCustomElement {
  @bindable user: any = null;

  constructor(private postclicks: PostClicks) { }  
}