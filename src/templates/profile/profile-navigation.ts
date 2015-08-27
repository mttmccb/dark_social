import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class ProfileNavigationCustomElement {
  @bindable user: any = null;
  
  constructor(private ea: EventAggregator) { }
}