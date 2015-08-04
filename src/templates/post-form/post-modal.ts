import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { NewPost } from '../../resources/messages';

@autoinject
export class PostModalCustomElement {
  showing : boolean;
  
  constructor(private ea: EventAggregator) {
    this.showing = false;
    ea.subscribe(NewPost, (msg: any) => this.toggleModal());
  }

  toggleModal() { this.showing = !this.showing; }
}