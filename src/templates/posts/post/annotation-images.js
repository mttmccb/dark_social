import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {ImageViewed} from 'resources/messages';

@inject(EventAggregator)
export class AnnotationImagesCustomElement {
  @bindable annotations = null;

  constructor(ea) {
    this.ea = ea;
  }

  openImage(image) {
    this.ea.publish(new ImageViewed(image));
  }
}