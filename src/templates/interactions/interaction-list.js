import { bindable, inject } from 'aurelia-framework';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshView } from 'resources/messages';

export class InteractionListCustomElement {
  @bindable interactions = null;
  
  isAttached = false;

  attached() {
    this.isAttached = true;
    this.createMasonry();
    this.refreshView = ea.subscribe(RefreshView, msg => this.createMasonry());
  }

  createMasonry() {
    var container = document.querySelector('#posts');

    imagesLoaded(container, function () {
      var msnry = new Masonry(container, {
        columnWidth: ".post",
        itemSelector: '.post',
        percentPosition: true,
        gutter: 10
      });
    });
  }
  
  postsChanged() {
    if (this.isAttached) {
      this.createMasonry();       
    }
  }
}