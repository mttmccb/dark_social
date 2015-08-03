import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GetRandomUser, PostPosted } from '../../resources/messages';

@autoinject
export class ProfileNavigationCustomElement {
  @bindable user: any = null;
  
  constructor(private ea: EventAggregator) {
  }
}