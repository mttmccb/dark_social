import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { NewPost } from 'resources/messages';

@inject(EventAggregator)
export class PostModalCustomElement {
  constructor(ea) {
    this.showing = false;
    this.ea = ea;
    ea.subscribe(NewPost, msg => this.showModal());
  }

  showModal(image) {
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
  }	
}