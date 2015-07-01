import { bindable, inject } from 'aurelia-framework';
import Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView } from 'resources/messages';
import { Router } from 'aurelia-router';

@inject(EventAggregator, Router)
export class InteractionListCustomElement {
  @bindable interactions = null;

  constructor(ea, router) {
    this.ea = ea;
    this.theRouter = router;
    this.viewRefreshed = ea.subscribe(RefreshedView, msg => this.createMasonry());
  }

  isAttached = false;

  attached() {
    this.isAttached = true;
    this.createMasonry();
  }

  detached() {
    this.viewRefreshed();
    this.msnry.destroy();
  }

  loadUserRoute(user) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
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