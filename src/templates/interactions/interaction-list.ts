import { ProfileRoute } from '../../resources/profile-route';
import { bindable, autoinject } from 'aurelia-framework';
import * as Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView } from '../../resources/messages';

@autoinject
export class InteractionListCustomElement {
  @bindable interactions: any = null;
  public viewRefreshed: any;
  public msnry: any;
  
	constructor(private profileRoute: ProfileRoute, private ea: EventAggregator, private isAttached: boolean) {
    this.isAttached = false;
    this.viewRefreshed = ea.subscribe(RefreshedView, () => this.createMasonry());
  }

  attached() {
    this.isAttached = true;
    this.createMasonry();
  }

  detached() {
    this.viewRefreshed();
    this.msnry.destroy();
  }

  createMasonry() {
    var container = document.querySelector('#posts');

    this.msnry = new Masonry(container, {
      columnWidth: ".post",
      itemSelector: '.post',
      percentPosition: true,
      gutter: 10
    });
  }

  postsChanged() { if (this.isAttached) { this.createMasonry(); } }
}