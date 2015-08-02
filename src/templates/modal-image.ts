import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';

@inject(EventAggregator)
export class ModalImageCustomElement {
  ea: EventAggregator;
  showing: boolean;
  adnimage: ADNImage;
  constructor(ea: EventAggregator) {
    this.showing = false;
    this.adnimage = new ADNImage();
    this.ea = ea;
    ea.subscribe(ImageViewed, msg => this.showModal(msg.image));
  }

  showModal(image: any) {
    this.adnimage = image;
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
    this.adnimage = new ADNImage();
  }
}