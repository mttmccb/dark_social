import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshView, ApiStatus, StopAutoRefresh } from '../resources/messages';

@inject(EventAggregator)
export class RefreshIndicator {

	constructor(ea) {
		this.ea = ea;
		this._autorefresh = false;
		ea.subscribe(StopAutoRefresh, msg => this._autorefresh = false);
	}

	refresh() {
		this.ea.publish(new RefreshView());
		this.ea.publish(new ApiStatus(`Refreshing`, { status: 'info' }));
	}

	detached() {
		clearInterval(this.autorefreshon);
	}

	get autorefresh() {
		return this._autorefresh;
	}
	set autorefresh(newValue) {
		this._autorefresh = newValue;

		newValue === true?
			this.autorefreshon = this.timedRefresh(30000) :
			clearInterval(this.autorefreshon);
	}

	timedRefresh(t) {
		return setInterval(() => {
			this.refresh();
		}, t);
	}
}