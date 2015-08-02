import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed, ApiStatus } from '../../../resources/messages';

@inject(EventAggregator)
export class AnnotationImagesCustomElement {
  @bindable annotations : any = null;
  ea: EventAggregator;
  constructor(ea: EventAggregator) {
    this.ea = ea;
  }

  openImage(image: any) {
    this.ea.publish(new ApiStatus('Loading Image', { status: 'info'}));
    this.ea.publish(new ImageViewed(image));
  }
}