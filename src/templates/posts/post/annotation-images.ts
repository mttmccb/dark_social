import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed, ApiStatus } from '../../../resources/messages';

@autoinject
export class AnnotationImagesCustomElement {
  @bindable annotations : any = null;
  constructor(private ea: EventAggregator) {
    this.ea = ea;
  }

  openImage(image: any) {
    this.ea.publish(new ApiStatus('Loading Image', { status: 'info'}));
    this.ea.publish(new ImageViewed(image));
  }
}