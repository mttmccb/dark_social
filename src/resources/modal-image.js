import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';

@inject(EventAggregator)
export class ModalImageCustomElement {

  constructor(ea) {
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
}