import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

@inject(AdnAPI)
export class Checkins {
  
  constructor(api) {
    this.api = api;
    this.posts = [];
    this.showing = true;
  }

  showModal() {
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
  }

  activate() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
    });
  }

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