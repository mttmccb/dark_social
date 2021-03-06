import { autoinject, noView} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApiStatus } from '../resources/messages';
//import 'humane-js/themes/libnotify.css!';
//import * as Humane from 'humane-js';

@noView
@autoinject
export class StatusIndicator {
  //private notify: any;
  private status: any;
  //private humane: Humane;
    
  constructor(humane, private ea: EventAggregator) {
    ea.subscribe(ApiStatus, (msg: any) => this.showNotification(msg));
    //this.humane = humane.create();
    this.status = {
      info: { addnCls: 'humane-libnotify-info' },
      success: { addnCls: 'humane-libnotify-success' },
      error: { addnCls: 'humane-libnotify-error' }
    }
  }

  attached() { 
    //this.notify = humane.create({ baseCls: 'humane-libnotify', timeout: 1250 }); 
  }

  showNotification(notification: any) {
    //var opt = notification.options.status !== '' ? this.status[notification.options.status] : {};
    //this.notify.log(notification.message, opt);
  }
}