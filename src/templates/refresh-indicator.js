import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshView, ApiStatus, StopAutoRefresh } from 'resources/messages';

@inject(EventAggregator)
export class RefreshIndicator {

	constructor(ea) {
		this.ea = ea;
		this._autorefresh = false;
	    ea.subscribe(StopAutoRefresh, msg => this._autorefresh = false );	
	}

	refresh() {
		this.ea.publish(new RefreshView());
		this.ea.publish(new ApiStatus(`Refreshing`, { status: 'info' }));
	}
	
	get autorefresh() {
		return this._autorefresh;
	}
	set autorefresh(newValue) {
		this._autorefresh = newValue;
		if (newValue) {
			this.autorefreshon = this.timedRefresh(30000);
		} else {
			clearInterval(this.autorefreshon);
		}
	}
	
	timedRefresh(t) {
		return setInterval(() => {
			this.refresh();
		}, t);
	}
}