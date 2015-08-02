import * as humane from 'humane-js';
import 'humane-js/themes/libnotify.css!';
import {inject, noView} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApiStatus } from '../resources/messages';

@noView
@inject(EventAggregator)
export class StatusIndicator {
  ea: EventAggregator;
  notify: any;
  humane: humane;
  constructor(ea: EventAggregator) {
    this.ea = ea;
    ea.subscribe(ApiStatus, msg => this.showNotification(msg));
  }
  
  attached() {
    this.notify = humane.create({baseCls: 'humane-libnotify', timeout: 1250 });
  }
  
  showNotification(notification: any) {
    var status: any= {
      info: {addnCls: 'humane-libnotify-info'},
      success: {addnCls: 'humane-libnotify-success'},
      error: {addnCls: 'humane-libnotify-error'}
    }
    var opt = notification.options.status!==''? status[notification.options.status] : {};
    console.log(notification.message);
    this.notify.log(notification.message, opt);
  }
}