import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GetRandomUser, PostPosted } from '../../resources/messages';

@inject(EventAggregator)
export class ProfileNavigationCustomElement {
  @bindable user: any = null;
  ea: EventAggregator;
  constructor(ea: EventAggregator) {
    this.ea = ea;
  }
}