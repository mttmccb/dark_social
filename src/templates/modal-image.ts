import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';

@autoinject
export class ModalImageCustomElement {
  showing: boolean;
  adnimage: ADNImage;
  constructor(private ea: EventAggregator) {
    this.showing = false;
    this.adnimage = new ADNImage();
    this.ea = ea;
    ea.subscribe(ImageViewed, (msg: any) => this.showModal(msg.image));
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