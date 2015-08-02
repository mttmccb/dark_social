import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { NewPost } from '../../resources/messages';

@inject(EventAggregator)
export class PostModalCustomElement {
  showing : boolean;
  ea: EventAggregator;
  constructor(ea: EventAggregator) {
    this.showing = false;
    this.ea = ea;
    ea.subscribe(NewPost, msg => this.showModal());
  }

  showModal() {
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
  }	
}