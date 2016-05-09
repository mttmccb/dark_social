import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';

@autoinject
export class ModalImageCustomElement {
  adnimage: ADNImage;
  private imageViewed: any;
  
  constructor(private ea: EventAggregator, private showing : boolean) {
    this.showing = false;
    this.adnimage = new ADNImage();
    this.imageViewed = ea.subscribe(ImageViewed, (msg: any) => this.showModal(msg.image));
  }

  detached() {
    this.imageViewed.dispose();
  }
  
  showModal(image: ADNImage) {
    this.showing = true;
    this.adnimage = image;
  }

  hideModal() {
    this.showing = false;
    this.adnimage = new ADNImage();
  }
}