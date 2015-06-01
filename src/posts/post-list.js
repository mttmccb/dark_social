import { bindable, inject } from 'aurelia-framework';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

export class PostListCustomElement {
  @bindable posts = { data: null, avatar: false };
  
  attached() {
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
}