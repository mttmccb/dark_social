import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';

@inject(AdnAPI, EventAggregator)
export class Checkins {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.showing = false;
    this.adnimage = new ADNImage();
    this.ea = ea;
    ea.subscribe(ImageViewed, msg => this.showModal(msg.image));
  }

  showModal(image) {
    this.adnimage = image;
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
    this.adnimage = new ADNImage();
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