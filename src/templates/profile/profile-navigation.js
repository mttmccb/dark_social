import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GetRandomUser, PostPosted } from 'resources/messages';

@inject(EventAggregator)
export class ProfileNavigationCustomElement {
  @bindable user = null;

  constructor(ea) {
    this.ea = ea;
  }
  
  loadRandomUserRoute() {        
    this.ea.publish(new GetRandomUser());
    this.ea.publish(new PostPosted());
  }
}