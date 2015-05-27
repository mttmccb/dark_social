import { bindable, inject } from 'aurelia-framework';

export class ProfileStatsCustomElement {
  @bindable posts = null;

  constructor(api, router) {
    this.numberOfTopMentions = 5;
  }

  moreMentions() {
    this.numberOfTopMentions += 5;
  }
}