import { bindable, autoinject } from 'aurelia-framework';
import * as Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView } from '../../resources/messages';

@autoinject
export class PostListCustomElement {
  @bindable posts = {};
  viewRefreshed: any;
  isAttached: boolean;
  msnry: any;
  constructor(private ea: EventAggregator) {
    this.ea = ea;
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
    if (this.isAttached) { this.createMasonry(); }
  }
}