import { bindable, inject } from 'aurelia-framework';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshView } from 'resources/messages';

@inject(EventAggregator)
export class PostListCustomElement {
  @bindable posts = { data: null, avatar: false, streamid: null };
  
  constructor(ea) {
    this.ea = ea;
    this.refreshView = ea.subscribe(RefreshView, msg => this.createMasonry());	
  }
  
  isAttached = false;

  attached() {
    this.isAttached = true;
    this.createMasonry();
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