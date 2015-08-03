import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { NewPost } from '../../resources/messages';

@autoinject
export class PostModalCustomElement {
  private showing : boolean = false;
  
  constructor(private ea: EventAggregator) {
    ea.subscribe(NewPost, (msg: any) => this.showModal());
  }

  showModal() {
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
  }	
}