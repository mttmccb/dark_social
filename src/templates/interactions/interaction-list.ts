import { bindable, autoinject } from 'aurelia-framework';
import * as Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView } from '../../resources/messages';
import { Router } from 'aurelia-router';

@autoinject
export class InteractionListCustomElement {
  @bindable interactions: any = null;
  public viewRefreshed: any;
  public isAttached: boolean;
  public msnry: any;
  
  constructor(private ea: EventAggregator, private router: Router) {
    this.viewRefreshed = ea.subscribe(RefreshedView, (msg: any) => this.createMasonry());
    this.isAttached = false;
  }

  attached() {
    this.isAttached = true;
    this.createMasonry();
  }

  detached() {
    this.viewRefreshed();
    this.msnry.destroy();
  }

  loadUserRoute(user: number) {
    this.router.navigateToRoute("userprofile", { user_id: user });
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

  postsChanged() {
    if (this.isAttached) {
      this.createMasonry();
    }
  }
}