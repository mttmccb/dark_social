import { bindable } from 'aurelia-framework';

export class ProfileStatsCustomElement {
  @bindable posts: any;
  numberOfTopMentions: number;
  
  constructor() { 
    this.numberOfTopMentions = 5;   
  }
}